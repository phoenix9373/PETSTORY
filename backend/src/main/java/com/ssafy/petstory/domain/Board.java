package com.ssafy.petstory.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

//    private long hashtag_id;

    // BoardHashtag table에 있는 board field에 의해서 매핑됨(이 값의 변경이 fk에 영향을 미치지 않음)
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BoardHashtag> boardHashtags = new ArrayList<>();


    // Profile과 Board는 일대다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id") // 매핑을 뭘로 할 것인 지 (fk가 profile_id가 됨)
    private Profile profile;

    // Board와 Comment는 일대다 관계
    // 영속성 전이(cascade)란 쉽게 말해 부모 엔티티가 영속화될때, 자식 엔티티도 같이 영속화되고 부모 엔티티가 삭제 될때, 자식 엔티티도 삭제되는 등 부모의 영속성 상태가 전이되는 것을 이야기한다.
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    // Board와 file는 일대일 관계 -> 여러장 사진 일대다로 바꿔야됨
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<File> files = new ArrayList<>();
//    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "file_id")
//    private File file;

    /**
     * Profile과 Board 연관 관계 (편의) 메서드
     */
    public void setProfile(Profile profile) {
        this.profile = profile;
        profile.getBoards().add(this);
    }

    /**
     * Board와 File 연관 관계 (편의) 메서드
     */
    public void setFile(File file) {
        files.add(file);
        file.setBoard(this);
    }
//    public void setFile(File file) {
//        this.file = file;
//        file.setBoard(this);
//    }

    /**
     * Board와 BoardHashtag 연관 관계 (편의) 메서드
     */
    public void addBoardHashtag(BoardHashtag boardHashtag) {
        boardHashtags.add(boardHashtag);
        boardHashtag.setBoard(this);
    }

    /**
     * Board 생성 메서드
     */
//    public static Board createBoard(Profile profile, String title, String context, BoardHashtag... boardHashtags) {
    public static Board createBoard(String title, String context) {
        Board board = new Board();
//        board.setProfile(profile);

        board.setTitle(title);
        board.setContext(context);

        board.setBoardDate(LocalDateTime.now());


        // 해쉬태그 추가
//        for (BoardHashtag boardHashtag : boardHashtags) {
//            boardHashtag.addBoardhashtag(boardHashtag);
//        }


        return board;
    }

    // ==생성 메소드== //
//    public static Order createOrder(Member member, Delivery delivery, OrderItem... orderItems) {
//        Order order = new Order();
//        order.setMember(member);
//        order.setDelivery(delivery);
//        for (OrderItem orderItem : orderItems) {
//            order.addOrderItem(orderItem);
//        }
//        order.setStatus(OrderStatus.ORDER); // 처음 상태로 강제
//        order.setOrderDate(LocalDateTime.now());
//        return order;
//    }

}
