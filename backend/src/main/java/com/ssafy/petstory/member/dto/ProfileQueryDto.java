package com.ssafy.petstory.member.dto;

import com.ssafy.petstory.board.dto.BoardQueryDto;
import com.ssafy.petstory.member.domain.Profile;
import com.ssafy.petstory.member.domain.ProfileState;
import lombok.Data;

import java.util.List;

@Data
public class ProfileQueryDto {

    private ProfileState profileState;
    private Long memberId;
    private Long profileId;
    private String nickname;
    private String rank;
    private int followerNum;
    private int followeeNum;

    private String imgFullPath;

    private List<BoardQueryDto> boardQueryDtos;

    public ProfileQueryDto(Profile profile) {}

    public ProfileQueryDto(ProfileState profileState, Long memberId, Long profileId, String nickname, String rank, int followerNum, int followeeNum, String imgFullPath) {
        this.profileState = profileState;
        this.memberId = memberId;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
        this.imgFullPath = imgFullPath;
    }

    public ProfileQueryDto(ProfileState profileState, Long memberId, Long profileId, String nickname, String rank, int followerNum, int followeeNum, String imgFullPath, List<BoardQueryDto> boardQueryDtos) {
        this.profileState = profileState;
        this.memberId = memberId;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
        this.imgFullPath = imgFullPath;
        this.boardQueryDtos = boardQueryDtos;
    }
}
