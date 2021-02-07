package com.ssafy.petstory.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class BoardHashtagQueryDto {
    @JsonIgnore
    private Long boardId;
    @JsonIgnore
    private Long hashtagId;
    private String hashtagName;


    public BoardHashtagQueryDto(Long boardId, String hashtagName) {
        this.boardId = boardId;
        this.hashtagName = hashtagName;
    }

    public BoardHashtagQueryDto(Long boardId, Long hashtagId, String hashtagName) {
        this.boardId = boardId;
        this.hashtagId = hashtagId;
        this.hashtagName = hashtagName;
    }
}
