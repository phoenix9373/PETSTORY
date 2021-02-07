package com.ssafy.petstory.service;

import com.ssafy.petstory.controller.MemberForm;
import com.ssafy.petstory.controller.ProfileForm;
import com.ssafy.petstory.domain.*;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.LikeDto;
import com.ssafy.petstory.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;

    public void createprofile(ProfileForm proform) {

        Member member = memberRepository.findOne(proform.getMember_id()); //memberId를 통해 member 엔티티를 찾아온다.(프로필에 넣어줄거임)

//        Relation relation = new Relation();
//        profileRepository.saveR(relation);
        System.out.println("================================");
//        System.out.println("릴레이션 엔티티 생성확인: "+relation.getId());
        System.out.println("맴버 찾아온거 아이디 확인: "+member.getId());
        //프로필 별 relation 테이블 최초생성, 초기값 전부 null로 생성 엔티티로 db 접근

        //받아온 맴버로 프로필 생성
//        Profile profile = Profile.createProfile(member,proform,relation);
        Profile profile = Profile.createProfile(member,proform);
        profileRepository.saveP(profile);
    }

    @Transactional
    public void update(Long id, ProfileForm form) {
        Profile profile = profileRepository.findOne(id);  //id로 해당하는거 찾아와서 수정하자
        //이 부분 수정
        profile.setNickname(form.getNickname());
        profile.setState(form.getProfile_state());
        //릴레이션 업데이트 시
        profile.setFollowee_num(form.getFollowee_num());
        profile.setFollower_num(form.getFollower_num());
    }

    @Transactional
    public List<Profile> showprofile(Long member_id) {

        System.out.println("가져온 아이디로 검색 시작");
        List<Profile> findProfile = profileRepository.findByMember_id(member_id); // 이름으로 조회가 되면 무언가 값이 들어온 것 -> 중복된 이름 검출

        return findProfile;
    }
    /**
     * 회원 정보 확인
     */

    @Transactional
    public Profile detail(Long profile_id){  //memberRepo에서 처리하고

        Profile profiledetail = profileRepository.findOne(profile_id);
        return profiledetail;
    }

    public void delete(Long profile_id) {
        Profile profile = profileRepository.findOne(profile_id);  //id로 해당하는거 찾아와서 삭제하자
        profileRepository.delete(profile);  //id로 해당하는거 찾아와서 수정하자
    }

    public boolean findlike(Like like) {
        Long p_id = like.getProfile_id();
        Long b_id = like.getBoard_id();
        boolean flag = false;

        if(profileRepository.findlike(p_id,b_id) == 0){ // 라이크 테이블에 없으면
            return true;
        }
        else{ //이미 좋아요 눌렀으면
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
