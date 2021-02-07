package com.ssafy.petstory.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "likes")
@Getter
@Setter
public class Like implements Serializable {  //복합키를 사용했기 대문에 직렬화 구현해야함  -> https://developmentnotepad.tistory.com/entry/Spring-%EC%9E%90%EB%B0%94-%EC%A7%81%EB%A0%AC%ED%99%94-Serializable

    @Id
    @Column(name = "board_id")
    private Long board_id;

    @Id
    @Column(name = "profile_id")
    private Long profile_id;

}
