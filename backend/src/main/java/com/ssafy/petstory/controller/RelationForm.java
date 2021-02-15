package com.ssafy.petstory.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelationForm {
    private Long relation_id;
    private Long follower_id;
    private Long followee_id;
}
