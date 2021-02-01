package com.ssafy.petstory.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelationForm {
    private Long profile_id;
    private Long follwer_id;
    private Long follwee_id;
}
