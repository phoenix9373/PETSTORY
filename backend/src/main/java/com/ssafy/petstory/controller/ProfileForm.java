package com.ssafy.petstory.controller;

import com.ssafy.petstory.domain.ProfileState;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProfileForm {  //테이블 명하고 같게

    private ProfileState profileState;
    //private int relation_id;
    private Long memberId;
    private Long profileId;
    private String nickname;
    private String rank;
    private int followerNum;
    private int followeeNum;

    private String imgFullPath;

    public ProfileForm(){}
    public ProfileForm(ProfileState profileState, Long memberId, Long profileId, String nickname, String rank, int followerNum, int followeeNum) {
        this.profileState = profileState;
        this.memberId = memberId;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
    }

    /**
     * 생성 스팩(request)
     */
    public ProfileForm(Long memberId, String nickname) {
        this.memberId = memberId;
        this.nickname = nickname;
    }

    /**
     * 생성 스팩(response)
     */
    public ProfileForm(Long memberId, String nickname, String imgFullPath) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.imgFullPath = imgFullPath;
    }

    /**
     * update 스팩
     */
    public ProfileForm(ProfileState profileState, String nickname, String imgFullPath) {
        this.profileState = profileState;
        this.nickname = nickname;
        this.imgFullPath = imgFullPath;
    }

    public ProfileForm(ProfileState profileState, Long profileId, String nickname, String rank, int followerNum, int followeeNum) {
        this.profileState = profileState;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
    }

    public ProfileForm(ProfileState profileState, Long memberId, Long profileId, String nickname, String rank, int followerNum, int followeeNum, String imgFullPath) {
        this.profileState = profileState;
        this.memberId = memberId;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
        this.imgFullPath = imgFullPath;
    }

    private String imgFullPath;

    public ProfileForm(){}
    public ProfileForm(ProfileState profileState, Long memberId, Long profileId, String nickname, String rank, int followerNum, int followeeNum) {
        this.profileState = profileState;
        this.memberId = memberId;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
    }

    /**
     * 생성 스팩(request)
     */
    public ProfileForm(Long memberId, String nickname) {
        this.memberId = memberId;
        this.nickname = nickname;
    }

    /**
     * 생성 스팩(response)
     */
    public ProfileForm(Long memberId, String nickname, String imgFullPath) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.imgFullPath = imgFullPath;
    }

    /**
     * update 스팩
     */
    public ProfileForm(ProfileState profileState, String nickname, String imgFullPath) {
        this.profileState = profileState;
        this.nickname = nickname;
        this.imgFullPath = imgFullPath;
    }

    public ProfileForm(ProfileState profileState, Long profileId, String nickname, String rank, int followerNum, int followeeNum) {
        this.profileState = profileState;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
    }

    public ProfileForm(ProfileState profileState, Long memberId, Long profileId, String nickname, String rank, int followerNum, int followeeNum, String imgFullPath) {
        this.profileState = profileState;
        this.memberId = memberId;
        this.profileId = profileId;
        this.nickname = nickname;
        this.rank = rank;
        this.followerNum = followerNum;
        this.followeeNum = followeeNum;
        this.imgFullPath = imgFullPath;
    }
}
