package com.ssafy.petstory.board.dto;

import lombok.Data;

@Data
public class CommentDto {

    private Long profileId;
    private Long boardId;
    private Long commentId; // 수정 명세
    private String content;


    public CommentDto() {
    }


    /**
     * 생성
     */
    public CommentDto(Long profileId, Long boardId, String content) {
        this.profileId = profileId;
        this.boardId = boardId;
        this.content = content;
    }

    /**
     * 수정
     */
    public CommentDto(Long profileId, Long boardId, Long commentId, String content) {
        this.profileId = profileId;
        this.boardId = boardId;
        this.commentId = commentId;
        this.content = content;
    }
}
