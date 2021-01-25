package com.ssafy.petstory.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "hashtags")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Getter
@Setter
public abstract class Hashtag { // abstract로 해야하나??

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "hashtag_id")
    private Long id;

    @Column(name = "hashtag_name")
    private String name;



}
