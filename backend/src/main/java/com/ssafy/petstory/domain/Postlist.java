package com.ssafy.petstory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.petstory.dto.PostlistDto;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "postlists")
@Getter @Setter
public class Postlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postlist_id")
    private Long id;

    @Column(name = "board_id")
    private Long boardId;

//    @Column(name = "postlist_content")
//    private String content;

    // MemberPostlist와 Postlist는 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonIgnore
    @JoinColumn(name = "member_postlist_id")
    private MemberPostlist memberPostlist;

    public void setMemberPostlist(MemberPostlist memberPostlist) {
        this.memberPostlist = memberPostlist;
        memberPostlist.getPostlists().add(this);
    }

    /**
     * Postlist 생성 메서드
     */
    public static Postlist createPostlist(PostlistDto dto, Member member, MemberPostlist memberPostlist) {

        Postlist postlist = new Postlist();
//        memberPostlist.setMember(member);
        postlist.setMemberPostlist(memberPostlist);
        postlist.setBoardId(dto.getBoardId());

        return postlist;
    }

}
