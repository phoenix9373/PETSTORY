package com.ssafy.petstory.postlist.service;

import com.ssafy.petstory.member.domain.Member;
import com.ssafy.petstory.postlist.domain.MemberPostlist;
import com.ssafy.petstory.postlist.domain.Postlist;
import com.ssafy.petstory.board.dto.BoardQueryDto;
import com.ssafy.petstory.postlist.dto.PostlistDto;
import com.ssafy.petstory.board.repository.BoardRepository;
import com.ssafy.petstory.postlist.repository.MemberPostlistRepository;
import com.ssafy.petstory.member.repository.MemberRepository;
import com.ssafy.petstory.postlist.repository.PostlistRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostlistService {

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

    private final MemberRepository memberRepository;
    private final MemberPostlistRepository memberPostlistRepository;
    private final PostlistRepository postlistRepository;
    private final BoardRepository boardRepository;

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

    public Result<BoardQueryDto> findPostlistPaging(int offset, int limit, Long memberPostlistId, Long profile_id) {

        return new Result(boardRepository.findPostlistBoard(offset, limit, memberPostlistId, profile_id));
    }
}
