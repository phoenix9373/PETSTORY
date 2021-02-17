package com.ssafy.petstory.controller;


import com.ssafy.petstory.domain.Like;
import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.domain.Profile;
import com.ssafy.petstory.domain.Relation;
import com.ssafy.petstory.dto.AlarmClickDto;
import com.ssafy.petstory.dto.LikeDto;
import com.ssafy.petstory.dto.ProfileQueryDto;
import com.ssafy.petstory.dto.ReadMultiProfileResponse;
import com.ssafy.petstory.service.ProfileService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
//@RequestMapping("/map")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }
    /**
     * 프로필 생성
     * */
    @PostMapping("/profiles/new")  // post - 맴버로 로그인 후 프로필 생성 클릭 시 -> 프론트에서 맴버 id(세션에 저장된), 받아와 Member타입은 null로
    public CreateProfileResponse create(ProfileForm proform, MultipartFile image, BindingResult result) throws IOException {


        if (result.hasErrors()) {
            return new CreateProfileResponse(00000L);
        }

        //service -> 1. 맴버 id를 이용해 member 찾고   -> 2. entity 메서드 profile 엔티티에 연관관계 지어주고 서비스에서 db에 바로 넣어준다
        //이때 relation 테이블도 함께 생성된다.
        Long profileId = profileService.createProfile(proform, image);

        //ResponseEntity로 성공 메세지 전달 가능
        return new CreateProfileResponse(profileId);
    }


    /**
     * 프로필 조회1(세부조회)
     * */


    @GetMapping("/detail/profile/{profileId}")   // 프로필 아이디 받아서 findone 조회 후 폼에 담아서 객체하나 리턴
    public ResponseEntity<ProfileQueryDto> detail(@PathVariable("profileId") Long profileId, @RequestBody ProfileForm form) {

        ProfileQueryDto profile = profileService.detail(profileId);//id 받은걸로 엔티티 검색

        if (profile == null) {//해당아이디로 검색된 정보가 없음
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    /**
     * 프로필 조회2(맴버의 다중프로필 조회 - 로그인 시 사용)
     * */
    @GetMapping("/show/{memberId}")
    public ResponseEntity<ReadMultiProfileResponse> show(@PathVariable("memberId") Long memberId) {

        List<ReadMultiProfileResponse> profiles = profileService.showProfile(memberId);//id 받은걸로 엔티티 검색

        if (profiles.size() == 0) {//해당 맴버아이디로 검색된 프로필이 없음
            return new ResponseEntity<>(null, HttpStatus.OK);
        }

        return new ResponseEntity(profiles, HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인

    /**
     * 프로필 정보 수정
     * */
    @PutMapping("profile/update/{profileId}") // v2 mem id로 받아서 검색 후 수정, 받아오는 형식 memformdto
    public ResponseEntity<String> updateProfile(@PathVariable("profileId") Long profileId, MultipartFile image, ProfileForm form) throws IOException {

        profileService.update(profileId, image, form);

        return new ResponseEntity<>("프로필 정보가 수정되었습니다.", HttpStatus.OK);
    } // 맴버정보보기를 눌러서 확인

    /**
     * 프로필 정보 삭제
     * */
    @DeleteMapping("profile/delete/{profileId}")  //프로필 아이디를 통해 삭제한다.
    public ResponseEntity<String> deleteMember(@PathVariable("profileId") Long profileId ) {

        profileService.delete(profileId);
        return new ResponseEntity<>("프로필 정보가 삭제되었습니다.", HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인


    /**
     * 좋아요 눌렀을 경우 게시물의 좋아요 up + like테이블에 정보 저장
     * */

    @PostMapping("/profile/like")  // 좋아요 누른 사람의 프로필_id + 보드형식에 board_id만 담아서 받는다
    public ResponseEntity<String> like(@RequestBody LikeDto likeform){

        System.out.println("=================================================== 보드확인");
        System.out.println(likeform.getBoard().getId());
        System.out.println(likeform.getProfileId());

        Like like = new Like();

        //엔티티로 변경해주자
        //하트 누르면 좋아요 up 게시글 id랑 누른사람 id 필요
        like.setProfileId(likeform.getProfileId());    //좋아요 누른사람의 프로필 아이디
        like.setBoard(likeform.getBoard());       //좋아요 누른 게시물

        //일단 테이블에서 프로필아이디와 게시글아이디로 같은것이 있는지 찾아보자 참거짓으로 리턴 받자
        boolean is_like_emtpy= profileService.findlike(like);

        if(is_like_emtpy ==true){  //없으니까 생성하자 + 게시물의 like count 올리고-> 프로필 아이디로 게시물 검색해서 라이크 올리고

            profileService.likeup(like);
            profileService.addlike(like);
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else{ // 이미 있으니까 없애자 + 이미 라이크 눌렀으니까 like count 내리고-> 프로필 아이디로 게시물 검색해서 라이크 내리고
            profileService.likedown(like);
            profileService.deletelike(like);
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
    }
    /**
     * 팔로우 신청 follower -> 나를 팔로우 하는 사람  followee -> 내가 팔로우 하는 사람
     *
     * 테이블에서의 의미 follower -> 신청한 사람 followee -> 받은 사람
     * */

    @PostMapping("/profile/follow")  // post - 맴버로 로그인 후 프로필 생성 클릭 시 -> 프론트에서 맴버 id(세션에 저장된), 받아와 Member타입은 null로
    public ResponseEntity<String> create(@RequestBody RelationForm follower_ee){

        System.out.println("확인1");
        //두 개 받고 나서 relation 테이블에 넣어주기 전 엔티티로 변경
        Relation relation = new Relation();
        System.out.println("확인2");
        relation.setFollowee_id(follower_ee.getFollowee_id());
        relation.setFollower_id(follower_ee.getFollower_id());

        // follower _id 로  그 프로필 엔티티 하나 가져 오고 followee_num 증가 후 업데이트
        Profile profile1 = profileService.findone(follower_ee.getFollower_id());
        profile1.setFolloweeNum(profile1.getFolloweeNum()+1);

        // followee _id 로  그 프로필 엔티티 하나 가져 오고 follower_num 증가 후 업데이트
        Profile profile2 = profileService.findone(follower_ee.getFollowee_id());
        profile2.setFollowerNum(profile2.getFollowerNum()+1);

        //System.out.println("1: "+follower_ee.getFollowee_id()+"2: "+follower_ee.getFollower_id()+"3: "+follower_ee.getRelation_id());
        profileService.createrelation(relation);

        return new ResponseEntity<>("success", HttpStatus.OK); //이건 컨트롤러에서 해당 뷰를 보여주는 것이 아니라 redirect 오른쪽 주소로 url 요청 다시하는거(새로고침)
        //ResponseEntity로 성공 메세지 전달 가능
    }

    /**
     * 내가 팔로우 하는 사람 목록
     * */
    @GetMapping("/pollow/followee/{profile_id}")
    public ResponseEntity<List<Profile>> findFollowee(@PathVariable("profile_id") Long profile_id) {

        List<Profile> list = profileService.findFollowee(profile_id);

        return new ResponseEntity<List<Profile>>(list, HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인

    /**
     * 나를 팔로우 하는 사람 목록
     * */
    @GetMapping("/pollow/follower/{profile_id}")
    public ResponseEntity<List<Profile>> findFollower(@PathVariable("profile_id") Long profile_id) {

        List<Profile> list = profileService.findFollower(profile_id);

        return new ResponseEntity<List<Profile>>(list, HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인

    /**
     * 프로필 아이디 받아서 좋아요한 board를 객체로 보내기 board 아이디 찾은 다음에 ->그걸로 file 테이블에서
     * */


    /**
     * 다중 프로필 선택하고 메인화면에 알람 수 표시하기 위해
     * */

    @GetMapping("/main/{profile_id}") // 메인화면에 보여지는 것들 (나중에 내 친구의 프로필도 보여야함)
    public ResponseEntity<Integer> main(@PathVariable("profile_id") Long profile_id) {

        int likecount = profileService.likecount(profile_id);

        return new ResponseEntity<>(likecount, HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인

    /**
     * 알람 확인 버튼 눌렀을 경우
     * */

    /**
     * 1단계 profile_id를 통해 Boards 테이블에서 내가 쓴 게시물 board_id를 리스트로 받는다 ok
     * 2단계 board_id를 통해 like테이블에서 LIKE 엔티티 형식의 리스트로 받는다.
     * 3단게 LIKE 엔티티의 board_id 와 profile_id를 통해 게시물 제목과 프로필 닉네임을 List<AlarmClickDto>로 넣기
     * 4단게 like_id 를 통해 alarms 테이블에서 해당 알람을 삭제한다. (알람만) 그리고 List<AlarmClickDto> 리턴
     */
    @GetMapping("/main/alarmclick/{profile_id}") // 알람버튼 눌렀을경우
    public ResponseEntity<List<AlarmClickDto>> alarmclick(@PathVariable("profile_id") Long profile_id) {

        List<AlarmClickDto> resultDto = profileService.findalarm(profile_id); //board 테이블에서 board id 찾기
        //profileService.deleteAalarm(resultDto);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);

    }//맴버정보보기를 눌러서 확인

    @Data
    static class CreateProfileResponse {
        private Long id;

        public CreateProfileResponse(Long id) {
            this.id = id;
        }
    }
}


