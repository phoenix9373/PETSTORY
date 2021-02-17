package com.ssafy.petstory.service;

import com.ssafy.petstory.controller.MemberForm;
import com.ssafy.petstory.controller.ProfileForm;
import com.ssafy.petstory.domain.*;
import com.ssafy.petstory.dto.*;
import com.ssafy.petstory.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NoResultException;
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

//        Relation relation = new Relation();
//        profileRepository.saveR(relation);
        System.out.println("================================");
//        System.out.println("릴레이션 엔티티 생성확인: "+relation.getId());
        System.out.println("맴버 찾아온거 아이디 확인: " + member.getId());
        //프로필 별 relation 테이블 최초생성, 초기값 전부 null로 생성 엔티티로 db 접근


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

    public boolean findlike(Like like) {
        Long p_id = like.getProfileId();
        Long b_id = like.getBoard().getId();
        System.out.println("---------보드의 아이디 확인: "+like.getBoard().getId());

        if (profileRepository.findlike(p_id, b_id) == 0) { // 라이크 테이블에 없으면
            return true;
        } else { //이미 좋아요 눌렀으면
            return false;
        }
    }

    public void addlike(Like like) {  // likes table에 넣어준다 + 알람에도 넣어준다
        profileRepository.savelike(like);
        profileRepository.savealarm(like);
    }

    public void deletelike(Like like) { // likes table에서 빼준다 넣어준다
        Like dellike = likeRepository.findOne(like);
        System.out.println("  프로필 아이디  ==="+dellike.getProfileId());
        System.out.println("  보드아이디  ==="+dellike.getBoard().getId());
        System.out.println("  라이크아이디  ==="+dellike.getLikeId());
        profileRepository.dellike(dellike);
        profileRepository.delalarm(dellike);
    }

    public void likeup(Like like) {  //보드 아이디 이용해서 조회 후 like +1
        Long board_id = like.getBoard().getId();
        likeRepository.likeup(board_id);
    }

    public void likedown(Like like) {
        Long board_id = like.getBoard().getId();
        likeRepository.likedown(board_id);
    }

    public void createrelation(Relation relation) {
        profileRepository.save_relation(relation);
    }

    public int likecount(Long profile_id) {
        return profileRepository.likecount(profile_id);
    }

    public List<AlarmClickDto> findalarm(Long profile_id) {
        List<Long> board_id = profileRepository.findAlarmBoard(profile_id); //1단계 ok

        //2단계 board_id를 통해 like테이블에서 LIKE 엔티티 형식의 리스트로 받는다.

        List<Like> likeList = new ArrayList<>();
        List<AlarmClickDto> alarmResult = new ArrayList<>();

        //board_id를 전부 돌면서 좋아요 받은거 Like 테이블에서 전부 가져와
        for(int i =0;i<board_id.size();i++){
            likeList = profileRepository.findAlarmLike(board_id.get(i),likeList);
        }

        //likeList의 프로필 아이디를 통해 좋아요 누른사람 닉네임 가져오자
        for(int j =0;j<likeList.size();j++){
            AlarmClickDto addalarm= new AlarmClickDto();
            System.out.println("좋아요 누른사람 찾아올 프로필 아이디는? : "+ likeList.get(j).getProfileId());
            Profile forNickname = profileRepository.findOne(likeList.get(j).getProfileId());
            addalarm.setBoardTitle(likeList.get(j).getBoard().getTitle());
            addalarm.setProfileNickname(forNickname.getNickname());
            addalarm.setBoardId(likeList.get(j).getBoard().getId());
            alarmResult.add(addalarm);
        }

        System.out.println("삭제될 likeList의 사이즈는? : "+likeList.size());
        //likeList의 likeid 로 알람 제거하자
        for(int k =0;k<likeList.size();k++){
            System.out.println("삭제될 likeList 의 아이디 확인 : "+ likeList.get(k).getLikeId());
            //알람 ID 찾아서 그걸로 검색하고 삭제해볼까
            profileRepository.delalarm2(likeList.get(k));
        }

//        for(int j=0;j<likeList.size();j++){
//            System.out.println("++++++++++++++++++++++++++++++++++++++");
//            System.out.println("게시글 제목 : "+alarmResult.get(j).getBoardTitle() + "좋아요 누른사람 : "+ alarmResult.get(j).getProfileNickname());
//        }

        return alarmResult;
    }

    public Profile findone(Long follower_id) {
        Profile profile = profileRepository.findOne(follower_id);

        return profile;
    }

    public List<Profile> findFollowee(Long profile_id) {
        List<Profile> list = profileRepository.findFollowee(profile_id);

        return list;
    }

    public List<Profile> findFollower(Long profile_id) {
        List<Profile> list = profileRepository.findFollower(profile_id);

        return list;
    }


//    public void deleteAalarm(List<AlarmClickDto> resultDto) {
//
//    }
}
