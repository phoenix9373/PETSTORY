package com.ssafy.petstory.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "alarms")
@Getter
@Setter
public class Alarm {

    @Id
    @GeneratedValue
    @Column(name = "alarm_id")
    private Long alarmId; // pk

    // 자식임
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "like_id")
    private Like likeId;

}
