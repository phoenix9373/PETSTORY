package com.ssafy.petstory.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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

    //    @NotEmpty
    private String email;

    @Column(name = "member_name")
    private String name;

    private String password;
    @Column(name = "is_Banned")
    private boolean isBanned;

    // Member와 Profile은 일대다 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Profile> profiles = new ArrayList<>();

    // Member와 Postlist은 일대다 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MemberPostlist> memberPostlists = new ArrayList<>();


}
