package com.ssafy.petstory.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long itd;

    private String comment;

    private long profile_id;

    // Board과 Comment는 일대다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id") // 매핑을 뭘로 할 것인 지 (fk가 board_id가 됨)
    private Board board;

    /**
     * Board과 Comment 연관 관계 (편의) 메서드
     */
    public void setBoard(Board board) {
        this.board = board;
        board.getComments().add(this);
    }

    /**
     * Comment 생성 메서드
     */
    public static Comment createComment() {
        Comment comment = new Comment();

        return comment;
    }
    
}
