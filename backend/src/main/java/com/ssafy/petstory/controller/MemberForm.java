package com.ssafy.petstory.controller;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter @Setter
public class MemberForm {

//    private Long member_id;

    @NotEmpty(message = "아이디 입력은 필수 입니다.")  // front 폼에서 placeholder 이메일 아이디 입력하세요.
    private String email;
    private String password;
    private String member_name;
//    private boolean is_banned;

}
