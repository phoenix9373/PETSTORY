package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.domain.MemberPostlist;
import com.ssafy.petstory.dto.MemberPostlistDto;
import com.ssafy.petstory.repository.MemberPostlistRepository;
import com.ssafy.petstory.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberPostlistService {

    private final MemberRepository memberRepository;
    private final MemberPostlistRepository memberPostlistRepository;

    /**
     * 저장목록 생성
     */
    public Long create(MemberPostlistDto request) throws IOException {

        Member member = memberRepository.findOne(request.getMemberId());

        MemberPostlist memberPostlist = MemberPostlist.createMemberPostlist(request, member);

        memberPostlistRepository.save(memberPostlist);

        return memberPostlist.getId();
    }

    /**
     * 저장목록 전체 조회
     */
    public List<MemberPostlistDto> findAll(Long memberId) {
        return memberPostlistRepository.findAll(memberId);
    }

    /**
     * 저장목록 이름 변경
     */
    public void update(Long memberPostlistId, MemberPostlistDto request) {
        MemberPostlist memberPostlist = memberPostlistRepository.findOne(memberPostlistId);
        MemberPostlist.update(memberPostlist, request.getPostlistName());
    }

    /**
     * 저장목록 삭제
     */
    public void delete(Long memberPostlistId) {
        MemberPostlist memberPostlist = memberPostlistRepository.findOne(memberPostlistId);
        memberPostlistRepository.delete(memberPostlist);
    }
}
