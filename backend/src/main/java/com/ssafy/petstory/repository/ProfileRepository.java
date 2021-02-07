package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Like;
import com.ssafy.petstory.domain.Profile;
import com.ssafy.petstory.domain.Relation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProfileRepository {
    private final EntityManager em;

    public void saveR(Relation relation) {  //테이블에 인서트
        System.out.println("++++++++++++++");
        em.persist(relation);
        System.out.println("릴레이션 테이블 저장후 아이디 확인: "+relation.getId());
    }

    public void saveP(Profile profile){
        System.out.println("+++++++++++++여기서 문제발생");
        em.persist(profile);
        System.out.println("프로필 테이블 저장 후 아이디 확인"+ profile.getId());
    }

    /**
     * 프로필 다중 조회
     */
    public List<Profile> findByMember_id(Long id) {
        return em.createQuery("select m from Profile m where m.member.id = :id", Profile.class) // ":name" 파라미터 바인딩
                .setParameter("id", id)
                .getResultList();
    }

    /**
     *수정시 수정할 프로필 찾아오기 + 삭제 시 삭제할 프로필 찾아오기
     */
    public Profile findOne(Long id) {
        return em.find(Profile.class, id);
    }

    public void delete(Profile profile){
        em.remove(profile);
    }

    public int findlike(Long p_id,Long b_id){  //엔티티로 리턴

            List<Like> likes = em.createQuery("SELECT m FROM Like m WHERE m.board_id = :board_id AND m.profile_id = :profile_id", Like.class)
                    .setParameter("board_id",b_id)
                    .setParameter("profile_id",p_id)
                    .getResultList();

            return likes.size();
    }

    public void savelike(Like like) {
        em.persist(like);
    }

    public void dellike(Like like) {
        em.remove(like);
    }


    public void save_relation(Relation relation) {
        em.persist(relation);
    }
}
