package com.ssafy.petstory.controller;

import com.ssafy.petstory.dto.MemberPostlistDto;
import com.ssafy.petstory.dto.PostlistDto;
import com.ssafy.petstory.service.MemberPostlistService;
import com.ssafy.petstory.service.PostlistService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class PostlistController {

    private final MemberPostlistService memberPostlistService;

    private final PostlistService postlistService;

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

    /**
     * 저장목록 생성
     */
    @PostMapping("/api/memberPostlist/create")
    public CreatePostlistResponse createMemberPostlist(MemberPostlistDto request) throws IOException {
        Long id = memberPostlistService.create(request);

        return new CreatePostlistResponse(id);
    }

    /**
     * 저장목록 전체조회
     */
    @GetMapping("/api/memberPostlist/findAll/{memberId}")
    public Result<MemberPostlistDto> findAllMemberPostLists(@PathVariable("memberId") Long memberId){
        return new Result(memberPostlistService.findAll(memberId));
    }

    /**
     * 저장목록 수정(이름)
     */
    @PutMapping("/api/memberPostlist/update/{memberPostlistId}")
    public void updateMemberPostlist(@PathVariable("memberPostlistId") Long memberPostlistId, MemberPostlistDto request) {
        memberPostlistService.update(memberPostlistId, request);
    }

    /**
     * 저장목록 삭제
     */
    @DeleteMapping("/api/memberPostlist/delete/{memberPostlistId}")
    public void deleteMemberPostlist(@PathVariable("memberPostlistId") Long memberPostlistId) {
        memberPostlistService.delete(memberPostlistId);
    }

    /**
     * 저장목록에 게시물 추가
     */
    @PostMapping("/api/postlist/add")
    public CreatePostlistResponse addPostlist(PostlistDto request) throws IOException {

        Long id = postlistService.save(request);

        return new CreatePostlistResponse(id);
    }

    /**
     * 저장목록에 게시물 전체조회
     */
    @GetMapping("/api/postlist/findAll/{memberPostlistId}")
    public Result<PostlistDto> findAllPostLists(@PathVariable("memberPostlistId") Long memberPostlistId){
        return new Result(postlistService.findAll(memberPostlistId));
    }

    /**
     * 저장목록에 게시물 삭제
     */
    @DeleteMapping("/api/postlist/delete/{postlistId}")
    public void deletePostlist(@PathVariable("postlistId") Long postlistId) {
        postlistService.delete(postlistId);
    }

    @Data
    static class CreatePostlistResponse {
        private Long id;

        public CreatePostlistResponse(Long id) {
            this.id = id;
        }
    }
}
