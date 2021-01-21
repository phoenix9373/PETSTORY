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
@Getter
@Setter
public class Hashtags {

    @Id
    @GeneratedValue
    @Column(name = "hashtag_id")
    private Long id;

    @Column(name = "hashtag_name")
    private String name;

}
