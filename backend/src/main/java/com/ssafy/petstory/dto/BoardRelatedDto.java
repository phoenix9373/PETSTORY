package com.ssafy.petstory.dto;

import lombok.Data;

@Data
public class BoardRelatedDto {

    private Long boardId;

    public BoardRelatedDto(Long boardId) {
        this.boardId = boardId;
    }

    public BoardRelatedDto() {

    }
}
