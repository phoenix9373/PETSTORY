package com.ssafy.petstory.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "postlists")
@Getter @Setter
public class Postlist {

    @Id
    @GeneratedValue
    @Column(name = "postlist_id")
    private Long id;

    @Column(name = "postlist_name")
    private String name;

    private long board_id;

    // Member와 Postlist는 일대다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    /**
     * Member와 Postlist 연관 관계 (편의) 메서드
     * -> 위치는 핵심적으로 Controll 하는 쪽이 들고 있는 게 좋음
     */
    public void setMember(Member member) {

        this.member = member;
        member.getPostlists().add(this);
    }
}
