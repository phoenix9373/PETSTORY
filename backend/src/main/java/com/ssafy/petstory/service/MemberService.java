package com.ssafy.petstory.service;

import com.ssafy.petstory.controller.MemberForm;
import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    /**
     * 중복 회원 검증
     */
    private void validateDuplicateMember(Member member) {
        // EXCEPTION
        List<Member> findMembers = memberRepository.findByName(member.getName()); // 이름으로 조회가 되면 무언가 값이 들어온 것 -> 중복된 이름 검출
        // -> members 수를 세서 0보다 크면 중복 (최적화)
        // 동시에 호출 시(db insert)(mult-thread) -> 동시에 같은 이름으로 가입하게됨
        // -> 실무에서는 최후의 방어로 db의 member name을 unique 제약 조건으로 잡음
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    /**
     * 회원 가입
     */
    @Transactional
    public Long join(Member member) {
        //validateDuplicateMember(member); // 중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    /**
     * 회원 정보 확인
     */

    @Transactional
    public Member detail(Long member_id){  //memberRepo에서 처리하고

        Member memberdtail = memberRepository.findOne(member_id);
        return memberdtail;
    }

    /**
     * 회원 수정
     */
    @Transactional
    public void update(Long id, MemberForm form) {
        Member member = memberRepository.findOne(id);  //id로 해당하는거 찾아와서 수정하자
        member.setName(form.getMember_name());
        member.setPassword(form.getPassword());
        member.setEmail(form.getEmail());
    }
    /**
     * 회원 삭제
     */
    @Transactional
    public void delete(Long id) {
        Member member = memberRepository.findOne(id);  //id로 해당하는거 찾아와서 삭제하자
        memberRepository.delete(member);  //id로 해당하는거 찾아와서 수정하자
    }
    /**
     * 로그인
     */
    @Transactional
    public Member login(MemberForm dto){
        Member member = memberRepository.loginFind(dto.getEmail(),dto.getPassword());
        return member;
    }
}
