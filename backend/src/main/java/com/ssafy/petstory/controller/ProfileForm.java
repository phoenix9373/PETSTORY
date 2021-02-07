package com.ssafy.petstory.controller;

import com.ssafy.petstory.domain.ProfileState;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileForm {  //테이블 명하고 같게

    private ProfileState profile_state;
    //private int relation_id;
    private Long member_id;
    private Long profile_id;
    private String nickname;
    private String rank;
    private int follower_num;
    private int followee_num;

}
