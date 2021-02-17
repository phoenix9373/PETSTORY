package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.MemberPostlist;
import com.ssafy.petstory.dto.MemberPostlistDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberPostlistRepository {

    private final EntityManager em;

    /**
     * 저장목록 생성
     * 중복있는 이름으로만
     */
    public void save(MemberPostlist memberPostlist) {
        em.persist(memberPostlist);
    }


    /**
     * 저장목록 전체조회(해당 멤버의)
     */
    public List<MemberPostlistDto> findAll(Long memberId) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.MemberPostlistDto" +
                        "(mp.member.id, mp.id, mp.name)" +
                        " from MemberPostlist mp" +
                        " where mp.member.id in :memberId", MemberPostlistDto.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    /**
     * 저장목록 엔티티 조회
     */
    public MemberPostlist findOne(Long memberPostlistId) {
        return em.find(MemberPostlist.class, memberPostlistId);
    }

    /**
     * 저장목록 삭제
     */
    public void delete(MemberPostlist memberPostlist) {
        em.remove(memberPostlist);
    }
}

