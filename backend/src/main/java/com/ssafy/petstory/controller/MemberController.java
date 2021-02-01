package com.ssafy.petstory.controller;


import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.service.JwtService;
import com.ssafy.petstory.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
//@RequestMapping("/map")
@RequiredArgsConstructor
public class MemberController {
    public static final Logger logger = LoggerFactory.getLogger(JwtService.class);
    private final MemberService memberService;

    @Autowired
    private JwtService jwtService;

//    @GetMapping("/members/new") // get - 회원가입 버튼 클릭 시
//    public ResponseEntity<String> createForm(@RequestBody Model model){
//        model.addAttribute("memberForm", new MemberForm());
//        return new ResponseEntity<>("success", HttpStatus.OK);
//    }

    /**
     * 맴버 생성
     * */
    @PostMapping("/members/new")  // post - 양식 작성 후 회원가입하기 클릭 시 json으로 받아올거 ->세션에 저장된 member_id + 프로필 양식에 넣은 값
    public ResponseEntity<String> create(@Valid @RequestBody MemberForm form, BindingResult result, Model model){

        model.addAttribute("memberForm", new MemberForm());

        if (result.hasErrors()) {
            return new ResponseEntity<>("error 파라미터명, 형식 확인", HttpStatus.FORBIDDEN);
        }

        System.out.println("===================================================");
        System.out.println("이메일 받은거 : " + form.getEmail());

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


    /**
     * 맴버 정보 확인
     * */
    @GetMapping("/detail/{member_id}")
    public ResponseEntity<MemberForm> detail(@PathVariable("member_id") Long member_id, MemberForm form, Model model) {

        Member member = new Member();
        member.setId(member_id);


        Member memberentity = memberService.detail(member.getId());  //id 받은걸로 엔티티 검색

        if (memberentity == null) {//해당아이디로 검색된 정보가 없음
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        model.addAttribute("memberForm", new MemberForm());
        form.setEmail(memberentity.getEmail());
        form.setMember_name(memberentity.getName());
        form.setPassword(memberentity.getPassword());  //dto로 클라에 전달

        return new ResponseEntity<>(form, HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인


    /**
     * 맴버 정보 수정
     * */
    @PutMapping("member/update/{member_id}") // v2 mem id로 받아서 검색 후 수정, 받아오는 형식 memformdto
    public ResponseEntity<String> updateMember(@PathVariable("member_id") Long member_id ,@Valid @RequestBody MemberForm form, Model model) {

        model.addAttribute("memberForm", new MemberForm());

        memberService.update(member_id, form);
        //Member findMember = memberService.findOne(id); 수정정보 리턴할 때

        return new ResponseEntity<>("회원 정보가 수정되었습니다.", HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인

    /**
     * 맴버 정보 삭제
     * */
    @DeleteMapping("member/delete/{member_id}")
    public ResponseEntity<String> deleteMember(@PathVariable("member_id") Long member_id ) {

        Member member = new Member();
        member.setId(member_id);
        memberService.delete(member_id);
        return new ResponseEntity<>("회원 정보가 삭제되었습니다.", HttpStatus.OK);
    }//맴버정보보기를 눌러서 확인


    /**
     * 로그인
     */
    @PostMapping(value = "/login", produces = "application/json;charset:utf-8") // produces
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberForm dto) { // 객체를 그냥 반환하지 말고 ResponseEntity로 상태값과 함께 반환하자
        Map<String, Object> resultMap = new HashMap<>(); // <스트링, 겍체>로 생성
        HttpStatus status = null;

        Member loginUser = memberService.login(dto); // service() -mapper(dao 기능 같은) 를 통해 같은거 있나 찾아보고 member엔티티 loginuser 생성

        if (loginUser == null) {
            resultMap.put("message", "로그인 실패");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST); // 받아온 userid userpwd 일치하는게 없다
            // -> 실패 (view단에서 확인하세요 띄우자)
        }

        String token = jwtService.create(dto);  //jwt토근에는 dto 전달 -> db 건드리는거 아니니까 어짜피
        logger.trace("로그인 토큰정보 : {}", token); //logger에 기록

        // 토큰 정보는 response의 헤더로 보내고 나머지는 Map에 담는다.
        resultMap.put("auth-token", token);
        resultMap.put("id", loginUser.getId());
        resultMap.put("name", loginUser.getName());
        status = HttpStatus.ACCEPTED;

        return new ResponseEntity<>(resultMap, status); // id, pw 같은거 찾아서 세션 쿠키 처리하고 받아 왔음!
    } // (optional을 사용해서 널포인트익셉션 처리 축약할 수도 있다 https://mangkyu.tistory.com/70)ㅇㅇ

    /**
     * 로그아웃
     */
    @GetMapping("/logout")//세션에 남아있는거 죽이고 return하는거 출력
    public String logout(HttpSession session) {
        session.invalidate();
        return "로그아웃 되셨습니다";
    }
}
