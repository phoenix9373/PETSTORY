package com.ssafy.petstory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "likes")
@Getter
@Setter
public class Like implements Serializable {  //복합키를 사용했기 때문에 직렬화 구현해야함(취소 복합키 사용안할거야 02.28)  -> https://developmentnotepad.tistory.com/entry/Spring-%EC%9E%90%EB%B0%94-%EC%A7%81%EB%A0%AC%ED%99%94-Serializable
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    // Board과 Like 일대다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board") // 매핑을 뭘로 할 것인 지 (fk가 board_id가 됨)
    private Board board;


    @Column(name = "profile_id")
    private Long profileId;

    //부모임 라이크 누르면 영속성 전이 alarm 생성

    @JsonIgnore  //데이터 주고 받을 때 영향을 주지 않는다.
    @OneToOne(mappedBy = "likeId", fetch = FetchType.LAZY,orphanRemoval = true) //LIKE 없애면 ALARM도 없어짐
    private Alarm alarm;
}
