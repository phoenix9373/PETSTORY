package com.ssafy.petstory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "relations")
@Getter @Setter
public class Relation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "relation_id")
    private Long id;

    private long follower_id;
    private long followee_id;

//    @JsonIgnore  //데이터 주고 받을 때 영향을 주지 않는다.
//    @OneToOne(mappedBy = "relation", fetch = FetchType.LAZY)
//    private Profile profile;

}
