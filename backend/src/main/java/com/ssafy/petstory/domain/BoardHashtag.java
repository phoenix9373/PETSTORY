package com.ssafy.petstory.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "boards_hashtags")
@Getter @Setter
public class BoardHashtag {

    @Id
    @GeneratedValue
    @Column(name = "board_hashtag_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "board_id") // 매핑을 뭘로 할 것인지 (fk가 board_id 가 됨)
    private Board board;

    @ManyToOne
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;





    /**
     * 생성 메서드
     */
    public static BoardHashtag createBoardHashtag(Hashtag hashtag) {
        BoardHashtag boardHashtag = new BoardHashtag();
        // hashtag 중복 확인 메서드 추가 후 없을 시 생성

        boardHashtag.setHashtag(hashtag);

        return boardHashtag;
    }
}
