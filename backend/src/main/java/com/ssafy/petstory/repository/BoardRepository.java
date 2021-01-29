package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class BoardRepository {

    private final EntityManager em;

    /**
     * 게시물 생성
     */
    public void save(Board board) {
        em.persist(board);
    }


    /**
     * 이미지 생성 테스트
     */
    public void saveImg(Image image) {
        em.persist(image);
    }

    /**
     * 게시물 전체 조회
     * V3
     * xToOne 전부 fetch join -> row수가 One을 기준으로 늘어나지 않음
     */
    public List<Board> findAll() {
        return em.createQuery(
                "select b from Board b" +
                        " join fetch b.file f", Board.class)
                .getResultList();
    }

    /**
     * 게시물 상세 조회
     */
    public Board findOne(Long boardId) {
        return em.find(Board.class, boardId);

    }
}
