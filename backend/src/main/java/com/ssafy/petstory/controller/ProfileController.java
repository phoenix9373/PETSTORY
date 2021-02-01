package com.ssafy.petstory.controller;


import com.ssafy.petstory.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
//@RequestMapping("/map")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;


//    @GetMapping("/members/new") // get - 회원가입 버튼 클릭 시
//    public ResponseEntity<String> createForm(@RequestBody Model model){
//        model.addAttribute("memberForm", new MemberForm());
//        return new ResponseEntity<>("success", HttpStatus.OK);
//    }

    /**
     * 프로필 생성
     * */
    @PostMapping("/profiles/new")  // post - 맴버로 로그인 후 프로필 생성 클릭 시 -> 프론트에서 맴버 id(세션에 저장된), 받아와 Member타입은 null로
    public ResponseEntity<String> create(@Valid @RequestBody ProfileForm proform, BindingResult result, Model model){

        if (result.hasErrors()) {
            return new ResponseEntity<>("error입니다. 파라미터명, 형식 확인", HttpStatus.FORBIDDEN);
        }


        model.addAttribute("profileForm", new ProfileForm()); // model에 ProfileForm 생성

        System.out.println("=================================================== 받은 닉네임 확인");
        System.out.println(proform.getNickname());
        
        //service -> 1. 맴버 id를 이용해 member 찾고   -> 2. entity 메서드 profile 엔티티에 연관관계 지어주고 서비스에서 db에 바로 넣어준다
        //이때 relation 테이블도 함께 생성된다.
        profileService.createprofile(proform);


//        profile.set(form.getMember_name());
//        profile.setEmail(form.getEmail());
//        profile.setPassword(form.getPassword());

        return new ResponseEntity<>("success", HttpStatus.OK); //이건 컨트롤러에서 해당 뷰를 보여주는 것이 아니라 redirect 오른쪽 주소로 url 요청 다시하는거(새로고침)
        //ResponseEntity로 성공 메세지 전달 가능
    }


//    /**
//     * 맴버 정보 확인 -완성
//     * */
//
//    @GetMapping("/detail/{member_id}")
//    public ResponseEntity<MemberForm> detail(@PathVariable("member_id") Long member_id, MemberForm form, Model model) {
//
//        Member member = new Member();
//        member.setId(member_id);
//
//
//        Member memberentity = memberService.detail(member.getId());  //id 받은걸로 엔티티 검색
//
//        if (memberentity == null) {//해당아이디로 검색된 정보가 없음
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//
//        model.addAttribute("memberForm", new MemberForm());
//        form.setEmail(member.getEmail());
//        form.setMember_name(member.getName());
//        form.setPassword(member.getPassword());  //dto로 클라에 전달
//
//        return new ResponseEntity<>(form, HttpStatus.OK);
//    }//맴버정보보기를 눌러서 확인


//    /**
//     * 맴버 정보 수정
//     * */
//
//    @GetMapping("/detail/{member_id}")
//    public ResponseEntity<MemberForm> detail(@PathVariable("member_id") Long member_id, MemberForm form, Model model) {
//
//        Member member = new Member();
//        member.setId(member_id);
//
//
//        Member memberentity = memberService.detail(member.getId());  //id 받은걸로 엔티티 검색
//
//        if (memberentity == null) {//해당아이디로 검색된 정보가 없음
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//
//        model.addAttribute("memberForm", new MemberForm());
//        form.setEmail(member.getEmail());
//        form.setMember_name(member.getName());
//        form.setPassword(member.getPassword());  //dto로 클라에 전달
//
//        return new ResponseEntity<>(form, HttpStatus.OK);
//    }//맴버정보보기를 눌러서 확인
//
//    /**
//     * 맴버 정보 삭제
//     * */
//    @GetMapping("/detail/{member_id}")
//    public ResponseEntity<MemberForm> detail(@PathVariable("member_id") Long member_id, MemberForm form, Model model) {
//
//        Member member = new Member();
//        member.setId(member_id);
//
//
//        Member memberentity = memberService.detail(member.getId());  //id 받은걸로 엔티티 검색
//
//        if (memberentity == null) {//해당아이디로 검색된 정보가 없음
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//
//        model.addAttribute("memberForm", new MemberForm());
//        form.setEmail(member.getEmail());
//        form.setMember_name(member.getName());
//        form.setPassword(member.getPassword());  //dto로 클라에 전달
//
//        return new ResponseEntity<>(form, HttpStatus.OK);
//    }//맴버정보보기를 눌러서 확인
}
