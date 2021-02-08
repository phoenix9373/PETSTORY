package com.ssafy.petstory.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "boards")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // protected 생성자 생성
public class Board {

    @Id
    @GeneratedValue
    @Column(name = "board_id")
    private Long id;

    @Column(name = "board_title")
    private String title;

    @Column(name = "board_context")
    private String context;

    private LocalDateTime boardDate; // 글생성 시간

    private long likeNum;
    private long reportNum;

    // Profile과 Board는 일대다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id") // 매핑을 뭘로 할 것인 지 (fk가 profile_id가 됨)
    private Profile profile;

    // Board와 BoardHashtag는 일대다 관계
    // BoardHashtag table에 있는 board field에 의해서 매핑됨(이 값의 변경이 fk에 영향을 미치지 않음)
//    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL) // orphanRemoval = true
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL) // orphanRemoval = true
    private List<BoardHashtag> boardHashtags = new ArrayList<>();


    // Board와 Comment는 일대다 관계
    // 영속성 전이(cascade)란 쉽게 말해 부모 엔티티가 영속화될때, 자식 엔티티도 같이 영속화되고 부모 엔티티가 삭제 될때, 자식 엔티티도 삭제되는 등 부모의 영속성 상태가 전이되는 것을 이야기한다.
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    // Board와 file는 일대다 관계
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<File> files = new ArrayList<>();

    /**
     * 다대일
     * Profile과 Board 연관 관계 (편의) 메서드
     */
    public void setProfile(Profile profile) {
        this.profile = profile;
        profile.getBoards().add(this);
    }

    /**
     * Board와 BoardHashtag 연관 관계 (편의) 메서드
     */
    public void addBoardHashtag(BoardHashtag boardHashtag) {
        boardHashtags.add(boardHashtag);
        boardHashtag.setBoard(this);
    }

    /**
     * Board와 BoardHashtag 연관 관계 (편의) 메서드
     */
//    public void addFiles(File file) {
//        files.add(file);
//        file.setBoard(this);
//    }

    /**
     * Board 생성 메서드
     */
//    public static Board createBoard(Profile profile, String title, String context, BoardHashtag... boardHashtags) {
    public static Board createBoard(Profile profile, String title, String context, BoardHashtag... boardHashtags) {
        Board board = new Board();
        board.setProfile(profile);

        board.setTitle(title);
        board.setContext(context);

        board.setBoardDate(LocalDateTime.now());

        for (BoardHashtag boardHashtag : boardHashtags) {
            board.addBoardHashtag(boardHashtag);
        }

        return board;
    }

}
