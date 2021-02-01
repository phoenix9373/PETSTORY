package com.ssafy.petstory.repository;


import com.ssafy.petstory.domain.Relation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

//프로필 생성 시 릴레이션 테이블 생성
//팔로우 신청 시 릴레이션 테이블에 값 넣기

@Repository
@RequiredArgsConstructor
public class RelationRepository {
    private final EntityManager em;

    public void save(Relation relation) {  //테이블에 인서트
        System.out.println("++++++++++++++");
        em.persist(relation);
        System.out.println("릴레이션 아이디: "+relation.getId());

    }
}
