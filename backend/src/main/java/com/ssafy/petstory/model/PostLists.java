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
public class PostLists {

    @Id
    @GeneratedValue
    @Column(name = "postlist_id")
    private Long id;

    @Column(name = "postlist_name")
    private String name;

    private long board_id;
    private Long member_id;
}
