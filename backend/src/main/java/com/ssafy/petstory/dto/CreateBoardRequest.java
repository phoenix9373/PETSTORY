package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.BoardHashtag;
import com.ssafy.petstory.domain.Hashtag;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class CreateBoardRequest {

    private String title;
    private String context;

    private List<String> hashtags;

    public CreateBoardRequest(){}

    public CreateBoardRequest(String title, String context) {
        this.title = title;
        this.context = context;
    }


    public CreateBoardRequest(String title, String context, List<String> hashtags) {
        this.title = title;
        this.context = context;
        this.hashtags = hashtags;
    }


}
