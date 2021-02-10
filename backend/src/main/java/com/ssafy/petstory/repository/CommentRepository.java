package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.Comment;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.CommentDto;
import com.ssafy.petstory.dto.FileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepository {

    private final EntityManager em;

    /**
     * 댓글 생성
     */
    public void save(Comment comment) {
        em.persist(comment);
    }

    /**
     * 댓글 전체조회
     */
    public List<CommentDto> findAll(Long boardId) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.CommentDto(c.profileId, c.id, c.content)" +
                        " from Comment c" +
                        " where c.board.id in :boardId", CommentDto.class)
                .setParameter("boardId", boardId)
                .getResultList();
    }


    /**
     * 댓글 엔티티 조회
     */
    public Comment findComment(Long commentId) {
        return em.find(Comment.class, commentId);
    }

    /**
     * 댓글 삭제
     */
    public void delete(Comment comment) {
        em.remove(comment);
    }


}
