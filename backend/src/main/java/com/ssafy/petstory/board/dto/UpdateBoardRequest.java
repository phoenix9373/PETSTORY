package com.ssafy.petstory.board.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpdateBoardRequest {

    private Long profileId;
    private String title;
    private String context;

    private List<String> hashtags;
    private List<String> imgFullPaths;

    public UpdateBoardRequest(Long profileId, String title, String context, List<String> hashtags, List<String> imgFullPaths) {
        this.profileId = profileId;
        this.title = title;
        this.context = context;
        this.hashtags = hashtags;
        this.imgFullPaths = imgFullPaths;
    }
}
