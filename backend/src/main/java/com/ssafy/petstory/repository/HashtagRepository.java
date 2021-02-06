package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Hashtag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class HashtagRepository {

    private final EntityManager em;

    public Hashtag save(Hashtag hashtag) {
        em.persist(hashtag);
        return hashtag;
    }

    public Optional<Hashtag> findByName(String name) {
        List<Hashtag> hashtags = em.createQuery(
                "select h from Hashtag h" +
                        " where h.name = :name", Hashtag.class)
                .setParameter("name", name)
                .getResultList();
        if (hashtags.isEmpty()) {
            return Optional.ofNullable(null);
        }else {
            return Optional.ofNullable(hashtags.get(0));
        }

    }

    public List<Hashtag> findByName1(String name) {
        return em.createQuery(
                "select h from Hashtag h" +
                        " where h.name = :name", Hashtag.class)
                .setParameter("name", name)
                .getResultList();
    }

}
