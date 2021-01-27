package com.ssafy.petstory.controller;


import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/map")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/members/new") // get - 회원가입 버튼 클릭 시
    public ResponseEntity<String> createForm(@RequestBody Model model){
        model.addAttribute("memberForm", new MemberForm());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("/members/new")  // post - 양식 작성 후 회원가입하기 클릭 시
    public ResponseEntity<String> create(@RequestBody MemberForm form){
//    public ResponseEntity create(String email, String member_name, String password){

//        if (result.hasErrors()) {
//            return new ResponseEntity<>("되는건가?", HttpStatus.FORBIDDEN);
//        }
        System.out.println("===================================================");
        System.out.println(form.getEmail());

        Member member = new Member();


        member.setName(form.getMember_name());
        member.setEmail(form.getEmail());
        member.setPassword(form.getPassword());

//        member.setId(form.getMember_id());
//        member.setBanned(form.is_banned());

        memberService.join(member);
        return new ResponseEntity<>("success", HttpStatus.OK); //이건 컨트롤러에서 해당 뷰를 보여주는 것이 아니라 redirect 오른쪽 주소로 url 요청 다시하는거(새로고침)
        //ResponseEntity로 성공 메세지 전달 가능
    }

    //검색창에서 member로 회원검색
}
