package com.ssafy.petstory.board.controller;

import com.ssafy.petstory.board.dto.CommentDto;
import com.ssafy.petstory.board.service.CommentService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }


    /**
     * 댓글 생성
     */
    @PostMapping("/comment/create")
    public CreateCommentResponse createComment(@RequestBody CommentDto request) throws IOException {

        Long id = commentService.create(request);

        return new CreateCommentResponse(id);
    }

    /**
     * 댓글 전체 조회(해당 게시물)
     */
    @GetMapping("/comment/findAll/{boardId}")
    public Result<CommentDto> findAll(@PathVariable("boardId") Long boardId){
        return new Result(commentService.findAll(boardId));
    }

    /**
     * 댓글 수정
     */
    @PutMapping("/comment/update/{commentId}")
    public void updateComment(@PathVariable("commentId") Long commentId, @RequestBody CommentDto request) {

        commentService.update(request);
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/comment/delete/{commentId}")
    public void deleteComment(@PathVariable("commentId") Long commentId) {

        commentService.delete(commentId);

    }


    @Data
    static class CreateCommentResponse {
        private Long id;

        public CreateCommentResponse(Long id) {
            this.id = id;
        }
    }
}
