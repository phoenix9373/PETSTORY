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
public class Comments {

    @Id
    @GeneratedValue
    @Column(name = "commend_id")
    private Long itd;

    private String comment;

    private long board_id;
    private long profile_id;
    
}
