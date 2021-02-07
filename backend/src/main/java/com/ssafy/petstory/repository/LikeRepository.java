package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.Like;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.FileQueryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor// final nonnull인 필드로 LikeRpository 생성자 만든다ㅏ
public class LikeRepository {
    private final EntityManager em;

    /**
     * 게시물 상세(단건) 조회시 넘어온 boardId로 file 컬렉션을 Map으로 한 방에 조회
     */
    private List<FileQueryDto> findFileMapOne(Long boardId) {
        List<FileQueryDto> fileDtos = em.createQuery(
                "select new com.ssafy.petstory.dto.FileQueryDto(f.board.id, f.id, f.filePath, f.imgFullPath)" +
                        " from File f" +
                        " where f.board.id in :boardId", FileQueryDto.class)
                .setParameter("boardId", boardId)
                .getResultList();
        return fileDtos;
    }

    /**
     * 게시물 조회 후 likeup
     */
    public void likeup(Long boardId) {
        Board board = em.find(Board.class, boardId);
        board.setLikeNum(board.getLikeNum()+1);  //라이크 +1 해주기
        BoardQueryDto result = new BoardQueryDto(board);


        // file 컬렉션을 Map 한 방에 조회
        List<FileQueryDto> fileMap = findFileMapOne(boardId);

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.setFiles(fileMap);
    }

    /**
     * 게시물 조회 후 likedown
     */
    public void likedown(Long boardId) {
        Board board = em.find(Board.class, boardId);
        board.setLikeNum(board.getLikeNum()-1);  //라이크 +1 해주기
        BoardQueryDto result = new BoardQueryDto(board);


        // file 컬렉션을 Map 한 방에 조회
        List<FileQueryDto> fileMap = findFileMapOne(boardId);

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.setFiles(fileMap);
    }

    public Like findOne(Like like) {
        Long p_id = like.getProfile_id();
        Long b_id = like.getBoard_id();

        return em.createQuery("SELECT m FROM Like m WHERE m.board_id = :board_id AND m.profile_id = :profile_id", Like.class)
                .setParameter("board_id",b_id)
                .setParameter("profile_id",p_id)
                .getSingleResult();

    }
}
