package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.ProfileState;
import lombok.Data;

@Data
public class ReadMultiProfileResponse {

    private Long profileId;
    private String nickname;
    private ProfileState profileState;
    private String rank;

    private String imgFullPath;

    public ReadMultiProfileResponse(Long profileId, String nickname, ProfileState profileState, String rank, String imgFullPath) {
        this.profileId = profileId;
        this.nickname = nickname;
        this.profileState = profileState;
        this.rank = rank;
        this.imgFullPath = imgFullPath;
    }
}
