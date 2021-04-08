package com.ssafy.petstory.board.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateBoardRequest {

    private Long profileId;
    private String title;
    private String context;

    private List<String> hashtags;

    public CreateBoardRequest(){}

    public CreateBoardRequest(String title, String context) {
        this.title = title;
        this.context = context;
    }

    public CreateBoardRequest(Long profilId, String title, String context, List<String> hashtags) {
        this.profileId = profileId;
        this.title = title;
        this.context = context;
        this.hashtags = hashtags;
    }

    public CreateBoardRequest(String title, String context, List<String> hashtags) {
        this.title = title;
        this.context = context;
        this.hashtags = hashtags;
    }


}
