package com.ssafy.petstory.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter @Setter
public class Relations {

    private Long follower_id;
    private Long followee_id;
}
