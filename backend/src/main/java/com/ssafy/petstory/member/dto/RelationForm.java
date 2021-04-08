package com.ssafy.petstory.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelationForm {
    private Long relationId;
    private Long followerId;
    private Long followeeId;
}
