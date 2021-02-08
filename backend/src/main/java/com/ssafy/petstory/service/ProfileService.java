package com.ssafy.petstory.service;

import com.ssafy.petstory.controller.MemberForm;
import com.ssafy.petstory.controller.ProfileForm;
import com.ssafy.petstory.domain.*;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.FileDto;
import com.ssafy.petstory.dto.LikeDto;
import com.ssafy.petstory.dto.ReadMultiProfileResponse;
import com.ssafy.petstory.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NoResultException;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final AwsS3Service awsS3Service;
    private final FileService fileService;
    private final FileRepository fileRepository;

    /**
     * 프로필 생성
     */
    public void createProfile(ProfileForm proform, MultipartFile file) throws IOException {

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
    }

    /**
     * 프로필 수정
     */
    public void update(Long id, MultipartFile inputImage, ProfileForm form) throws IOException {
        Profile profile = profileRepository.findOne(id);  //id로 해당하는거 찾아와서 수정하자
        //이 부분 수정
        profile.setNickname(form.getNickname());
        profile.setState(form.getProfileState());

        System.out.println("여기기기아ㅣ거이널ㄴ어랴ㅐㅈ더나ㅣㄹㄴ어ㅣ랑");
        System.out.println(form.getImgFullPath());
        if (form.getImgFullPath() == null){
            Image image = fileService.createImage(inputImage);
            profile.setImage(image);
        }
    }

    /**
     * 접속할 프로필 선택
     * --> memberService로 가는 게 맞을 듯
     */
    @Transactional(readOnly = true)
    public List<ReadMultiProfileResponse> showProfile(Long member_id) {
       return profileRepository.findByMemberId(member_id);
    }

    /**
     * 프로필 정보 확인(상세조회)
     */
    @Transactional(readOnly = true)
    public Profile detail(Long profileId) {  //memberRepo에서 처리하고

        Profile profile = profileRepository.findOne(profileId);
        return profile;
    }

    /**
     * 프로필 삭제
     */
    public void delete(Long profileId) {
        Profile profile = profileRepository.findOne(profileId);  //id로 해당하는거 찾아와서 삭제하자
        profileRepository.delete(profile);  //id로 해당하는거 찾아와서 수정하자
    }

    public boolean findlike(Like like) {
        Long p_id = like.getProfile_id();
        Long b_id = like.getBoard_id();
        boolean flag = false;

        if (profileRepository.findlike(p_id, b_id) == 0) { // 라이크 테이블에 없으면
            return true;
        } else { //이미 좋아요 눌렀으면
            return false;
        }
    }

    public void addlike(Like like) {  // likes table에 넣어준다 ->
        profileRepository.savelike(like);
    }

    public void deletelike(Like like) { // likes table에서 빼준다 넣어준다
        Like dellike = likeRepository.findOne(like);
        profileRepository.dellike(dellike);
    }

    public void likeup(Like like) {  //보드 아이디 이용해서 조회 후 like +1
        Long board_id = like.getBoard_id();
        likeRepository.likeup(board_id);
    }

    public void likedown(Like like) {
        Long board_id = like.getBoard_id();
        likeRepository.likedown(board_id);
    }

    public void createrelation(Relation relation) {
        profileRepository.save_relation(relation);
    }
}
