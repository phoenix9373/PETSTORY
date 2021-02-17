package com.ssafy.petstory.dto;

import lombok.Data;

@Data
public class LikeQueryDto {
    private Long isLike;
    private Long boardId;

    public LikeQueryDto(Long isLike,Long boardId) {
        this.isLike = isLike;
        this.boardId = boardId;

    }
}
