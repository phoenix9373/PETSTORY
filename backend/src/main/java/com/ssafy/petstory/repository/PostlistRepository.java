package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Postlist;
import com.ssafy.petstory.dto.PostlistDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostlistRepository {

    private final EntityManager em;

    /**
     * 저장목록에 게시물 추가
     */
    public void save(Postlist postlist) {
        em.persist(postlist);
    }

    /**
     * 저장목록 특정 게시물 찾기
     */
    public Postlist findOne(Long postlistId) {
        return em.find(Postlist.class, postlistId);
    }

    /**
     * 저장목록 전체조회(해당 멤버의)
     */
    public List<PostlistDto> findAll(Long memberPostlistId) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.PostlistDto" +
                        "(p.id, p.boardId, p.memberPostlist.id, p.memberPostlist.member.id)" +
                        " from Postlist p" +
                        " where p.memberPostlist.id in :memberPostlistId", PostlistDto.class)
                .setParameter("memberPostlistId", memberPostlistId)
                .getResultList();
    }

    /**
     * 저장목록에 게시물 삭제
     */
    public void delete(Postlist postlist) {
        em.remove(postlist);
    }
}
