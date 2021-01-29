package com.ssafy.petstory.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "images")
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED) // protected 생성자 생성
public class Image {

    @Id
    @GeneratedValue
    @Column(name = "image_id")
    private Long id;

    private String image;

//    @JsonIgnore
//    @OneToOne(mappedBy = "image", fetch = FetchType.LAZY)
//    private Board board;


}
