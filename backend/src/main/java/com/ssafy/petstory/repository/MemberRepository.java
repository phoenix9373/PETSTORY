package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    private final EntityManager em;

    public void save(Member member) {
        em.persist(member);
    }

    /**
     * 이름에 의한 조회
     * @param name
     * @return
     */
    public List<Member> findByName(String name) {
        return em.createQuery("select m from Member m where m.name = :name", Member.class) // ":name" 파라미터 바인딩
                .setParameter("name", name)
                .getResultList();
    }
}
