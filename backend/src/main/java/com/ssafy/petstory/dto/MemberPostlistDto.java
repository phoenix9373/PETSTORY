package com.ssafy.petstory.dto;

import lombok.Data;

@Data
public class MemberPostlistDto {

    private Long memberId;
    private Long memberPostlistId;
    private String postlistName;


    public MemberPostlistDto() {
    }

    /**
     * 생성
     */
    public MemberPostlistDto(Long memberId, String postlistName) {
        this.memberId = memberId;
        this.postlistName = postlistName;
    }

    /**
     * 조회
     */
    public MemberPostlistDto(Long memberId, Long memberPostlistId, String postlistName) {
        this.memberId = memberId;
        this.memberPostlistId = memberPostlistId;
        this.postlistName = postlistName;
    }


}
