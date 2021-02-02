package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.Image;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.FileDto;
import com.ssafy.petstory.dto.FileQueryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
     * 게시물 전체 조회 - 페이징
     */
    public List<BoardQueryDto> findAllPaging(int offset, int limit) {
        // 루트 조회(XToOne 코드 모두 한 번에 조회)
        List<BoardQueryDto> result = findBoardsPaging(offset, limit);

        // file 컬렉션을 Map 한 방에 조회
        Map<Long, List<FileQueryDto>> fileMap = findFileMap(toBoardIds(result));

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId())));
        return result;
    }
    /**
     * 1:N 관계(Collection)을 제외한 나머지를 한 번에 조회
     * -> XToOne 모두 조회
     */
    private List<BoardQueryDto> findBoardsPaging(int offset, int limit) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto(b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b", BoardQueryDto.class)
//                        " join b.profile p", BoardQueryDto.class)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }




    ///////////////////////////////////////////////////////////////////////////////////////

    /**
     * 게시물 전체 조회
     */
    public List<BoardQueryDto> findAll() {
        // 루트 조회(XToOne 코드 모두 한 번에 조회)
        List<BoardQueryDto> result = findBoards();

        // file 컬렉션을 Map 한 방에 조회
        Map<Long, List<FileQueryDto>> fileMap = findFileMap(toBoardIds(result));

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId())));
        return result;
    }

    /**
     * 게시물 전체조회를 위한 baord Id들을 찾는 메서드
     */
    private List<Long> toBoardIds(List<BoardQueryDto> result){
        List<Long> lists = result.stream()
                .map(b -> b.getBoardId())
                .collect(Collectors.toList());
        return lists;
    }

    /**
     * toBoardIds에서 찾은 boardId들로 file 컬렉션을 Map으로 한 방에 조회
     */
    private Map<Long, List<FileQueryDto>> findFileMap(List<Long> boardIds) {
        List<FileQueryDto> fileDtos = em.createQuery(
        "select new com.ssafy.petstory.dto.FileQueryDto(f.board.id, f.id, f.filePath, f.imgFullPath)" +
                    " from File f" +
                    " where f.board.id in :boardIds", FileQueryDto.class)
                .setParameter("boardIds", boardIds)
                .getResultList();
        return fileDtos.stream()
                .collect(Collectors.groupingBy(fileQueryDto -> fileQueryDto.getBoardId())); // fileDtos -> map으로 바꿔서 최적화(코드 작성 편의, 성능 향상)
    }

    /**
     * 1:N 관계(Collection)을 제외한 나머지를 한 번에 조회
     * -> XToOne 모두 조회
     */
    private List<BoardQueryDto> findBoards() {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto(b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b", BoardQueryDto.class)
//                        " join b.profile p", BoardQueryDto.class)
                .getResultList();
    }

    /**
     * 게시물 상세(단건) 조회
     */
    public BoardQueryDto findOne(Long boardId) {
        Board board = em.find(Board.class, boardId);
        BoardQueryDto result = new BoardQueryDto(board);

        // file 컬렉션을 Map 한 방에 조회
        List<FileQueryDto> fileMap = findFileMapOne(boardId);

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.setFiles(fileMap);

        return result;
    }

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
}
