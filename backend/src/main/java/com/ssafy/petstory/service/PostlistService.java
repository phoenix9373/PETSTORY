package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.domain.MemberPostlist;
import com.ssafy.petstory.domain.Postlist;
import com.ssafy.petstory.dto.PostlistDto;
import com.ssafy.petstory.repository.MemberPostlistRepository;
import com.ssafy.petstory.repository.MemberRepository;
import com.ssafy.petstory.repository.PostlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostlistService {

    private final MemberRepository memberRepository;
    private final MemberPostlistRepository memberPostlistRepository;
    private final PostlistRepository postlistRepository;

    /**
     * 저장목록에 게시물 추가
     */
    public Long save(PostlistDto postlistDto) throws IOException {

        Member member = memberRepository.findOne(postlistDto.getMemberId());
        MemberPostlist memberPostlist = memberPostlistRepository.findOne(postlistDto.getMemberPostlistId());
        Postlist postlist = Postlist.createPostlist(postlistDto, member, memberPostlist);

        postlistRepository.save(postlist);

        return postlist.getId();
    }


    /**
     * 저장목록에 게시물 전체 조회
     */
    public List<PostlistDto> findAll(Long memberPostlistId) {
        return postlistRepository.findAll(memberPostlistId);
    }

    /**
     * 저장목록에 게시물 삭제
     */
    public void delete(Long postlistId) {
        Postlist postlist = postlistRepository.findOne(postlistId);
        postlistRepository.delete(postlist);
    }

}
