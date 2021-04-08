package com.ssafy.petstory.board.domain;

import com.ssafy.petstory.board.dto.CommentDto;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @Column(name = "comment_content")
    private String content;

    private long profileId;

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
    public static Comment createComment(CommentDto request, Board board) {
        Comment comment = new Comment();
        comment.setBoard(board);
        comment.setContent(request.getContent());
        comment.setProfileId(request.getProfileId());

        return comment;
    }

    /**
     * Comment 수정 메서드
     */
    public static Comment update(CommentDto request, Comment comment, Board board) {
        comment.setContent(request.getContent());
//        comment.setBoard(board);
        return comment;
    }

}
