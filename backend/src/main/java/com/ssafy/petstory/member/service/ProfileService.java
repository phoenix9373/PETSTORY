package com.ssafy.petstory.member.service;

import com.ssafy.petstory.board.repository.BoardRepository;
import com.ssafy.petstory.file.service.FileService;
import com.ssafy.petstory.member.domain.Like;
import com.ssafy.petstory.file.domain.Image;
import com.ssafy.petstory.member.domain.Member;
import com.ssafy.petstory.member.domain.Profile;
import com.ssafy.petstory.member.domain.Relation;
import com.ssafy.petstory.member.dto.AlarmClickDto;
import com.ssafy.petstory.member.dto.ProfileForm;
import com.ssafy.petstory.member.dto.ProfileQueryDto;
import com.ssafy.petstory.member.dto.ReadMultiProfileResponse;
import com.ssafy.petstory.member.repository.LikeRepository;
import com.ssafy.petstory.member.repository.MemberRepository;
import com.ssafy.petstory.member.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final BoardRepository boardRepository;
    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final FileService fileService;

    public Long createProfile(ProfileForm proform, MultipartFile file) throws IOException {

        Member member = memberRepository.findOne(proform.getMemberId()); //memberId를 통해 member 엔티티를 찾아온다.(프로필에 넣어줄거임)

        // 받아온 맴버로 프로필 생성
        Profile profile = Profile.createProfile(member, proform);

        // 이미지 정보 생성
        if (!file.isEmpty()) {
            Image image = fileService.createImage(file);
            profile.setImage(image);
        }

        profileRepository.saveP(profile);
        return profile.getId();
    }

    /**
     * 프로필 수정
     */
    public void update(Long id, MultipartFile inputImage, ProfileForm form) throws IOException {
        Profile profile = profileRepository.findOne(id);  //id로 해당하는거 찾아와서 수정하자
        //이 부분 수정
        profile.setNickname(form.getNickname());
        profile.setState(form.getProfileState());
        //릴레이션 업데이트 시
        profile.setFolloweeNum(form.getFolloweeNum());
        profile.setFollowerNum(form.getFollowerNum());
    }

    /**
     * 접속할 프로필 선택
     * --> memberService로 가는 게 맞을 듯
     */
    @Transactional(readOnly = true)
    public List<ReadMultiProfileResponse> showProfile(Long memberId) {
        return profileRepository.findByMemberId(memberId);
    }


    @Transactional(readOnly = true)
    public ProfileQueryDto detail(Long profileId) {  //memberRepo에서 처리하고
        Profile profile = profileRepository.findOne(profileId);
        ProfileQueryDto profileQueryDto = boardRepository.findProfileOne(profileId);
        profileQueryDto.setProfileState(profile.getState());
        profileQueryDto.setNickname(profile.getNickname());
        profileQueryDto.setMemberId(profile.getMember().getId());
        profileQueryDto.setProfileId(profileId);
        profileQueryDto.setRank(profile.getRank());
        profileQueryDto.setFollowerNum(profile.getFollowerNum());
        profileQueryDto.setFolloweeNum(profile.getFolloweeNum());

        return profileQueryDto;
    }

    /**
     * 프로필 삭제
     */
    public void delete(Long profileId) {
        Profile profile = profileRepository.findOne(profileId);  //id로 해당하는거 찾아와서 삭제하자
        profileRepository.delete(profile);  //id로 해당하는거 찾아와서 수정하자
    }

    public boolean findLike(Like like) {
        Long pId = like.getProfileId();
        Long bId = like.getBoard().getId();

        if (profileRepository.findLike(pId, bId) == 0) { // 라이크 테이블에 없으면
            return true;
        } else { //이미 좋아요 눌렀으면
            return false;
        }
    }

    public void addLike(Like like) {  // likes table에 넣어준다 + 알람에도 넣어준다
        profileRepository.saveLike(like);
        profileRepository.saveAlarm(like);
    }

    public void deletelike(Like like) { // likes table에서 빼준다 넣어준다
        Like dellike = likeRepository.findOne(like);
        profileRepository.delLike(dellike);
        profileRepository.delAlarm(dellike);
    }

    public void likeup(Like like) {  //보드 아이디 이용해서 조회 후 like +1
        Long boardId = like.getBoard().getId();
        likeRepository.likeup(boardId);
    }

    public void likedown(Like like) {
        Long boardId = like.getBoard().getId();
        likeRepository.likedown(boardId);
    }

    public void createrelation(Relation relation) {
        profileRepository.saveRelation(relation);
    }

    public int likecount(Long profile_id) {
        return profileRepository.likeCount(profile_id);
    }

    public List<AlarmClickDto> findalarm(Long profileId) {
        List<Long> boardId = profileRepository.findAlarmBoard(profileId); //1단계 ok

        //2단계 board_id를 통해 like테이블에서 LIKE 엔티티 형식의 리스트로 받는다.

        List<AlarmClickDto> alarmResult = new ArrayList<>();
        List<Like> likeL = new ArrayList<>();
        //board_id를 전부 돌면서 좋아요 받은거 Like 테이블에서 전부 가져와   -> 여기서 알람 테이블에 남아있는 녀석들만 가져와야해
        for(int i =0;i<boardId.size();i++){
            likeL = profileRepository.findAlarmLike(boardId.get(i));
        }

        //likeList의 프로필 아이디를 통해 좋아요 누른사람 닉네임 가져오자
        for(int j =0;j<likeL.size();j++){
            AlarmClickDto addalarm= new AlarmClickDto();
            Profile forNickname = profileRepository.findOne(likeL.get(j).getProfileId());
            addalarm.setBoardTitle(likeL.get(j).getBoard().getTitle());
            addalarm.setProfileNickname(forNickname.getNickname());
            addalarm.setBoardId(likeL.get(j).getBoard().getId());
            alarmResult.add(addalarm);
        }

        //likeList의 likeid 로 알람 제거하자
        for(int k =0;k<likeL.size();k++){
            //알람 ID 찾아서 그걸로 검색하고 삭제해볼까
            profileRepository.delAlarm2(likeL.get(k));
        }

        return alarmResult;
    }

    public Profile findone(Long followerId) {
        Profile profile = profileRepository.findOne(followerId);

        return profile;
    }

    public List<Profile> findFollowee(Long profileId) {
        List<Profile> list = profileRepository.findFollowee(profileId);

        return list;
    }

    public List<Profile> findFollower(Long profileId) {
        List<Profile> list = profileRepository.findFollower(profileId);

        return list;
    }


//    public void deleteAalarm(List<AlarmClickDto> resultDto) {
//
//    }
}
