package com.ssafy.petstory.model;


import lombok.AllArgsConstructor;
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
public class Members {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id; // pk

    private String email;
    @Column(name = "member_name")
    private String name;
    private String password;

    private boolean isBanned;

}
