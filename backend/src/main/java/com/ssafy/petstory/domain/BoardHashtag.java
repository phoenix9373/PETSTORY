package com.ssafy.petstory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.petstory.dto.FileDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "boards_hashtags")
@Getter @Setter
@NoArgsConstructor
public class BoardHashtag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_hashtag_id")
    private Long id;

//    @Column(name = "board_hashtag_cnt")
//    private long cnt; // 해당 해시타그로의 모든 접근에 대한 횟수 -> 상위내역 카테고리로 추천목록에 보여줌

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id") // 매핑을 뭘로 할 것인지 (fk가 board_id 가 됨)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtag_id") // 매핑을 뭘로 할 것인지 (fk가 hashtag_id 가 됨)
    private Hashtag hashtag;


    /**
     * 다대일
     * BoardHashtag와 Board 연관 관계 (편의) 메서드
     */
//    public void setBoard(Board board) {
//        this.board = board;
//        board.getBoardHashtags().add(this);
//    }

    /**
     * 다대일
     * BoardHashtag와 Hashtag 연관 관계 (편의) 메서드
     */
    public void setHashtag(Hashtag hashtag) {
        this.hashtag = hashtag;
        hashtag.getBoardHashtags().add(this);
    }


//    /**
//     * 생성 메서드
//     */
//    public static BoardHashtag createBoardHashtag(Hashtag hashtag) {
//        BoardHashtag boardHashtag = new BoardHashtag();
//        // hashtag 중복 확인 메서드 추가 후 없을 시 생성
//
//        boardHashtag.setHashtag(hashtag);
//
//        return boardHashtag;
//    }
    /**
     * 생성 메서드
     */
    public static BoardHashtag createBoardHashtag(Hashtag hashtag) {
        BoardHashtag boardHashtag = new BoardHashtag();

        // hashtag 중복 확인 메서드 추가 후 없을 시 생성
        boardHashtag.setHashtag(hashtag);

        return boardHashtag;
    }


    @Builder
    public BoardHashtag(Long id, Board board, Hashtag hashtag) {
        this.id = id;
        this.board = board;
        this.hashtag = hashtag;
    }
}
