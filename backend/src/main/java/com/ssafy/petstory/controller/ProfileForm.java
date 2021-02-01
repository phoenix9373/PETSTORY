package com.ssafy.petstory.controller;

import com.ssafy.petstory.domain.ProfileState;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileForm {  //테이블 명하고 같게

    private Long profile_id;
    private String nickname;
    private String rank;
    private int follwer_num;
    private int follwee_num;
    private ProfileState profile_state;
    private Long member_id;
    private int relation_id;

}
