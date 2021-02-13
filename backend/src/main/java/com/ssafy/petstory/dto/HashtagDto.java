package com.ssafy.petstory.dto;

import lombok.Data;

@Data
public class HashtagDto {

    private Long hashtagId;
    private String hashtagName;

    public HashtagDto(Long hashtagId, String hashtagName) {
        this.hashtagId = hashtagId;
        this.hashtagName = hashtagName;
    }
}
