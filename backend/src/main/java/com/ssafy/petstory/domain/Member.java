package com.ssafy.petstory.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "members")
@Getter @Setter
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id; // pk

    @NotEmpty
    private String email;

    @Column(name = "member_name")
    private String name;
    private String password;

    private boolean isBanned;

    // Member와 Profile은 일대다 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Profile> profiles = new ArrayList<>();

    // Member와 Postlist은 일대다 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Postlist> postlists = new ArrayList<>();

}
