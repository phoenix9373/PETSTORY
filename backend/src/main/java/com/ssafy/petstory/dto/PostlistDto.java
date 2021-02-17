package com.ssafy.petstory.dto;

import lombok.Data;

@Data
public class PostlistDto {

//    @JsonIgnore
    private Long postlistId;
    private Long memberId;
    private Long memberPostlistId;
    private Long boardId;

    public PostlistDto() {
    }

    public PostlistDto(Long boardId) {
        this.boardId = boardId;
    }

    public PostlistDto(Long memberId, Long memberPostlistId, Long boardId) {
        this.memberId = memberId;
        this.memberPostlistId = memberPostlistId;
        this.boardId = boardId;
    }

    public PostlistDto(Long postlistId, Long memberId, Long memberPostlistId, Long boardId) {
        this.postlistId = postlistId;
        this.memberId = memberId;
        this.memberPostlistId = memberPostlistId;
        this.boardId = boardId;
    }
}
