package com.ssafy.petstory.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // protected 생성자 생성
public class Profile {

    @Id
    @GeneratedValue
    @Column(name = "profile_name")
    private Long id; // pk

    private String nickname;
    private String rank;

    @Column(name = "profile_state")
    @Enumerated(EnumType.STRING)
    private ProfileState state;

    // Member와 Profile은 일대다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // Profile과 Board는 일대다 관계
    // 영속성 전이(cascade)란 쉽게 말해 부모 엔티티가 영속화될때, 자식 엔티티도 같이 영속화되고 부모 엔티티가 삭제 될때, 자식 엔티티도 삭제되는 등 부모의 영속성 상태가 전이되는 것을 이야기한다.
    @OneToMany(mappedBy = "profile", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();

    private int follwer_num;
    private int follwee_num;

    /**
     * Member와 Profile 연관 관계 (편의) 메서드
     * -> 위치는 핵심적으로 Controll 하는 쪽이 들고 있는 게 좋음
     */
    public void setMember(Member member) { // 아래 주석친 메인 코드의 기능을 하는 메서드
        this.member = member;
        member.getProfiles().add(this);
    }

//    public static void main(String[] args) {
//        Member member = new Member();
//        Profile profile = new Profile();
//
//        member.getProfiles().add(profile);
//        profile.setMember(member);
//    }

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // 1:1 관계는 foreign key를 아무데나 넣어도 됨 (주로 access가 많은 곳에 둠)
    // -> Profile에 relation_id(FK)를 둠
    @JoinColumn(name = "relation_id")
    // -> 연관관계 주인을 FK와 가까운 Profile Class에 있는 Relation로 잡음
    private Relation relation;

    /**
     * Profile과 Relation 양방향 연관 관계 편의 메소드
     */
    public void setRelation(Relation relation) {
        this.relation = relation;
        relation.setProfile(this);
    }



}
