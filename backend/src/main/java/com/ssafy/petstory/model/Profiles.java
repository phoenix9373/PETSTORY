package com.ssafy.petstory.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@Getter @Setter
public class Profiles {

    @Id
    @GeneratedValue
    @Column(name = "profile_name")
    private Long id; // pk

    private Long member_id; // fk

    private String nickname;
    private String rank;
    private int follwer_num;
    private int follwee_num;

    @Column(name = "profile_state")
    private int state; // 0: 전체 공개, 1: 친구만 공개, 2: 전체 비공개


}
