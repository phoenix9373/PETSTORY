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

    /**
     * 맴버 생성
     * */
    public void save(Member member) {
        em.persist(member);
        System.out.println("생성한 맴버 아이디: "+member.getId());
    }

    /**
     * 이름에 의한 조회
     */
    public List<Member> findByName(String name) {
        return em.createQuery("select m from Member m where m.name = :name", Member.class) // ":name" 파라미터 바인딩
                .setParameter("name", name)
                .getResultList();
    }
    /**
     * 맴버아이디를 통해 맴버 가져오기
     *public <T> T find(Class<T> entityClass, Object primaryKey,
     *                       Map<String, Object> properties);
     */
    public Member findOne(Long id) {
        return em.find(Member.class, id);
    }

    /**
     * 로그인 시 찾기
     */
    public Member loginFind(String email, String pw) {  //email하고 pw 로 찾아와서 Member엔티티 타입으로 리턴
        return em.createQuery("SELECT m FROM Member m WHERE m.email = :email AND m.password = :password",Member.class)
                .setParameter("email",email)
                .setParameter("password",pw)
                .getSingleResult();
    }

    /**
     * 맴버아이디를 통해 삭제
     */
    public void delete(Member member){
        em.remove(member);
    }
}
