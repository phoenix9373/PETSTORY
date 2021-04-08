package com.ssafy.petstory.hashtag.respository;

import com.ssafy.petstory.hashtag.domain.BoardHashtag;
import com.ssafy.petstory.hashtag.domain.Hashtag;
import com.ssafy.petstory.hashtag.dto.BoardHashtagQueryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class BoardHashtagRepository {

    private final EntityManager em;

    /**
     * 해시태그 생성
     *
     * @return
     */
    public BoardHashtag save(BoardHashtag boardHashtag) {
        em.persist(boardHashtag);
        return boardHashtag;
    }

    /**
     * 1:N 관계인 boardHashtags hashtagName으로 조회
     */
    public List<BoardHashtagQueryDto> findByHashtagName(String hashtagName) {
        return em.createQuery(
                "select new com.ssafy.petstory.hashtag.dto.BoardHashtagQueryDto()" +
                        " from BoardHashtag bh" +
                        " join bh.hashtag h" +
                        " where bh.hashtag.name = :hashtagName", BoardHashtagQueryDto.class)
                .setParameter("hashtagName", hashtagName)
                .getResultList();
    }

    public Optional<BoardHashtag> findByHashtag(Long id) {
        return em.createQuery(
                "select bh from BoardHashtag bh" +
                        " where bh.hashtag.id = :id", BoardHashtag.class)
                .setParameter("id", id)
                .getResultList()
                .stream()
                .findFirst();
//        if(boardHashtags.isEmpty()){
//            return Optional.ofNullable(null);
//        }else {
//            return Optional.ofNullable(boardHashtags.get(0));
//        }
    }

    public Optional<Hashtag> findByName(String name) {
        Hashtag hashtag = em.createQuery(
                "select h from Hashtag h" +
                        " where h.name = :name", Hashtag.class)
                .setParameter("name", name)
                .getSingleResult();
        return Optional.ofNullable(hashtag); // 맞냐?
    }

    /**
     * hashtag id를 가진 board들 검색하기 위한 boardhagtag 검색
     */
    public List<BoardHashtag> findBoardHashtag(Long hashtagId) {
        return em.createQuery(
                "select bh from BoardHashtag bh" +
                        " where bh.hashtag.id = :hashtagId", BoardHashtag.class)
                .setParameter("hashtagId", hashtagId)
                .getResultList();
    }


    /**
     * board update시 사용
     */
//    public Optional<BoardHashtag> findByBoardId(Long boardId) {
    public List<BoardHashtag> findByBoardId(Long boardId) {
        return em.createQuery(
                " select bh" +
                        " from BoardHashtag bh" +
                        " where bh.board.id = :boardId", BoardHashtag.class)
                .setParameter("boardId", boardId)
                .getResultList();
//                .stream()
//                .findFirst();
    }

    /**
     * boardHash 삭제
     */
    public void delete(Long boardId) {
        List<BoardHashtag> boardHashtags = findByBoardId(boardId);
        for (BoardHashtag boardHashtag : boardHashtags) {
            em.remove(boardHashtag);
        }
    }


}
