package com.ssafy.petstory.service;

import com.ssafy.petstory.controller.ProfileForm;
import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.domain.Profile;
import com.ssafy.petstory.domain.Relation;
import com.ssafy.petstory.repository.MemberRepository;
import com.ssafy.petstory.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileService {

    private final RelationRepository relationRepository;
    private final MemberRepository memberRepository;

    public void createprofile(ProfileForm proform) {

        Member member = memberRepository.findOne(proform.getMember_id()); //memberId를 통해 member 엔티티를 찾아온다.(프로필에 넣어줄거임)

        Relation relation = new Relation();
        System.out.println("================================");
        System.out.println(relation.getId());
        //프로필 별 relation 테이블 최초생성, 초기값 전부 null로 생성 엔티티로 db 접근
        relationRepository.save(relation);

        //받아온 맴버로 프로필 생성
        Profile profile = Profile.createProfile(member,proform,relation);

    }

}
