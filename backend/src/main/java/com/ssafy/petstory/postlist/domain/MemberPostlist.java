package com.ssafy.petstory.postlist.domain;

import com.ssafy.petstory.postlist.dto.MemberPostlistDto;
import com.ssafy.petstory.member.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "members_postlists")
@Getter @Setter
public class MemberPostlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_postlist_id")
    private Long id;

    @Column(name = "member_postlist_name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "memberPostlist", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Postlist> postlists = new ArrayList<>();


    public void setMember(Member member) {
        this.member = member;
        member.getMemberPostlists().add(this);
    }


    /**
     * MemberPostlist 생성 메서드
     */
    public static MemberPostlist createMemberPostlist(MemberPostlistDto request, Member member) {

        MemberPostlist memberPostlist = new MemberPostlist();
        memberPostlist.setMember(member);
        if(request.getPostlistName() == null) {
            memberPostlist.setName("재생 목록");
        }
        memberPostlist.setName(request.getPostlistName());
        return memberPostlist;
    }

    /**
     * MemberPostlist 수정 메서드(이름)
     */
    public static MemberPostlist update(MemberPostlist memberPostlist, String postlistName) {
        memberPostlist.setName(postlistName);
        return memberPostlist;
    }


}
