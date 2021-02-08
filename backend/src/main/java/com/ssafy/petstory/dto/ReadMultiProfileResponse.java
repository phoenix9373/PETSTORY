package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.Image;
import com.ssafy.petstory.domain.Member;
import com.ssafy.petstory.domain.ProfileState;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
public class ReadMultiProfileResponse {

    private Long profileId;
    private String nickname;
    private String rank;

    private String imgFullPath;

    public ReadMultiProfileResponse(Long profileId, String nickname, String rank, String imgFullPath) {
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.imgFullPath = imgFullPath;
    }
}
