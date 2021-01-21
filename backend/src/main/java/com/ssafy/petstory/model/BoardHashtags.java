package com.ssafy.petstory.model;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "boards_hashtags")
@Getter
public class BoardHashtags {

    private Long board_id;

    private Long hashtag_id;

}
