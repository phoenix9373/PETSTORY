package com.ssafy.petstory.hashtag.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hashtags")
@Getter
@Setter
@NoArgsConstructor
public class Hashtag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hashtag_id")
    private Long id;

    @Column(name = "hashtag_name")
    private String name;

    @JsonIgnore
    @Column(name = "hashtag_cnt")
    private int cnt;

    @OneToMany(mappedBy = "hashtag", fetch = FetchType.LAZY) // cascade?
    List<BoardHashtag> boardHashtags = new ArrayList<>();




    /**
     * 생성 메서드
     */
    public static Hashtag createHashtag(String hashtagName) {

        // hashtag 중복 확인 메서드 추가 후 없을 시 생성

        Hashtag hashtag = new Hashtag();
        hashtag.setName(hashtagName);
        return hashtag;
    }
}
