package com.ssafy.petstory.controller;

import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.MemberPostlistDto;
import com.ssafy.petstory.dto.PostlistDto;
import com.ssafy.petstory.service.BoardService;
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
    @PostMapping("/memberPostlist/create")
    public CreatePostlistResponse createMemberPostlist(@RequestBody MemberPostlistDto request) throws IOException {
        Long id = memberPostlistService.create(request);

        return new CreatePostlistResponse(id);
    }

    /**
     * 저장목록 전체조회
     */
    @GetMapping("/memberPostlist/findAll/{memberId}")
    public Result<MemberPostlistDto> findAllMemberPostLists(@PathVariable("memberId") Long memberId){
        return new Result(memberPostlistService.findAll(memberId));
    }

    /**
     * 저장목록 수정(이름)
     */
    @PutMapping("/memberPostlist/update/{memberPostlistId}")
    public void updateMemberPostlist(@PathVariable("memberPostlistId") Long memberPostlistId, @RequestBody MemberPostlistDto request) {
        memberPostlistService.update(memberPostlistId, request);
    }

    /**
     * 저장목록 삭제
     */
    @DeleteMapping("/memberPostlist/delete/{memberPostlistId}")
    public void deleteMemberPostlist(@PathVariable("memberPostlistId") Long memberPostlistId) {
        memberPostlistService.delete(memberPostlistId);
    }

    /**
     * 저장목록에 게시물 추가
     */
    @PostMapping("/postlist/add")
    public CreatePostlistResponse addPostlist(@RequestBody PostlistDto request) throws IOException {

        Long id = postlistService.save(request);

        return new CreatePostlistResponse(id);
    }

    /**
     * 저장목록에 게시물 전체조회
     */
    @GetMapping("/postlist/findAll/{memberPostlistId}")
    public Result<PostlistDto> findAllPostLists(@PathVariable("memberPostlistId") Long memberPostlistId){
        return new Result(postlistService.findAll(memberPostlistId));
    }

    /**
     * 저장목록 선택 시 게시물 조회
     */
    @GetMapping("/postlist/findAllPaging/{memberPostlistId}")
    public BoardApiController.Result<BoardQueryDto> findAllPaging(@RequestParam(value = "offset") int offset,
                                                                  @RequestParam(value = "limit") int limit,
                                                                  @RequestParam(value = "profile_id") Long profile_id,
                                                                  @PathVariable("memberPostlistId") Long memberPostlistId){
        return new BoardApiController.Result(postlistService.findPostlistPaging(offset, limit, memberPostlistId, profile_id));
    }

    /**
     * 저장목록에 게시물 삭제
     */
    @DeleteMapping("/postlist/delete/{postlistId}")
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
