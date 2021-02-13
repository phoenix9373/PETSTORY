package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.BoardHashtag;
import com.ssafy.petstory.domain.Hashtag;
import com.ssafy.petstory.dto.HashtagDto;
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
        return em.createQuery(
                "select h from Hashtag h" +
                        " where h.name = :name", Hashtag.class)
                .setParameter("name", name)
                .getResultList()
                .stream()
                .findFirst();
    }

   public List<String> findByHashtagNameStartsWith(String hashtagName) {
        return em.createQuery(
                "select h.name from Hashtag h" +
                        " where h.name like :hashtagName", String.class)
                .setParameter("hashtagName", "%" + hashtagName + "%")
                .getResultList();
    }

    /**
     * 인기 해시태그 조회
     */
    public List<HashtagDto> findPopularHashtags(int offset, int limit) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.HashtagDto(h.id, h.name)" +
                        " from Hashtag h" +
                        " order by h.cnt desc", HashtagDto.class)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }
}
