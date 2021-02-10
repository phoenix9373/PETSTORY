package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.Profile;
import com.ssafy.petstory.dto.BoardHashtagQueryDto;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.FileQueryDto;
import com.ssafy.petstory.dto.ProfileQueryDto;
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

        // boardHashtag 컬렉션 Map 한 방에 조회
        Map<Long, List<BoardHashtagQueryDto>> boardhashtagMap = findBoardHashtagMap(toBoardIds(result));
        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setBoardHashtags(boardhashtagMap.get(b.getBoardId()))
        );
        return result;
    }


    /**
     * 1:N 관계(Collection)을 제외한 나머지를 한 번에 조회
     * -> XToOne 모두 조회
     */
    private List<BoardQueryDto> findBoardsPaging(int offset, int limit) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto" +
                        "(p.id, p.nickname, p.image.imgFullPath, b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b" +
                        " join b.profile p", BoardQueryDto.class)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }

    /**
     * 게시물 전체 조회
     */
    public List<BoardQueryDto> findAll() {
        // 루트 조회(XToOne 코드 모두 한 번에 조회)
        List<BoardQueryDto> result = findBoards();

        // file 컬렉션을 Map 한 방에 조회
        Map<Long, List<FileQueryDto>> fileMap = findFileMap(toBoardIds(result));

        // boardHashtag 컬렉션 Map 한 방에 조회
        Map<Long, List<BoardHashtagQueryDto>> boardhashtagMap = findBoardHashtagMap(toBoardIds(result));
        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setBoardHashtags(boardhashtagMap.get(b.getBoardId()))
        );
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
     * toBoardIds에서 찾은 boardId들로 boardHashtag 컬렉션을 Map으로 한 방에 조회
     */
    private Map<Long, List<BoardHashtagQueryDto>> findBoardHashtagMap(List<Long> boardIds) {
        List<BoardHashtagQueryDto> boardHashtagQueryDtos = em.createQuery(
        "select new com.ssafy.petstory.dto.BoardHashtagQueryDto(bh.board.id, h.name)" +
                    " from BoardHashtag bh" +
                    " join bh.hashtag h" +
                    " where bh.board.id in :boardIds", BoardHashtagQueryDto.class)
                .setParameter("boardIds", boardIds)
                .getResultList();
        return boardHashtagQueryDtos.stream()
                .collect(Collectors.groupingBy(boardHashtagQueryDto -> boardHashtagQueryDto.getBoardId())); // fileDtos -> map으로 바꿔서 최적화(코드 작성 편의, 성능 향상)
    }

    /**
     * 1:N 관계(Collection)을 제외한 나머지를 한 번에 조회
     * -> XToOne 모두 조회
     */
    private List<BoardQueryDto> findBoards() {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto" +
                        "(p.id, p.nickname, p.image.imgFullPath, b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b " +
                        " join b.profile p", BoardQueryDto.class)
                .getResultList();
    }

    /**
     * 게시물 상세(단건) 조회
     */
    public BoardQueryDto findOne(Long boardId) {
        Board board = em.find(Board.class, boardId);
        BoardQueryDto result = new BoardQueryDto(board);

        result.setProfileId(board.getProfile().getId());
        result.setNickname(board.getProfile().getNickname());
        result.setImgFullPath(board.getProfile().getImage().getImgFullPath());

        // file 컬렉션을 Map 한 방에 조회
        List<FileQueryDto> fileOne = findFileOne(boardId);
        // boardHashtag 컬렉션 Map 한 방에 조회
        List<BoardHashtagQueryDto> boardhashtagOne = findBoardHashtagOne(boardId);
        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.setFiles(fileOne);
        result.setBoardHashtags(boardhashtagOne);

        return result;
    }

    /**
     * 게시물 조회
     */
    public Board findBoard(Long boardId) {
        return em.find(Board.class, boardId);
    }

    /**
     * 게시물 상세(단건) 조회시 넘어온 boardId로 file 컬렉션을 조회
     */
    private List<FileQueryDto> findFileOne(Long boardId) {
        List<FileQueryDto> fileDtos = em.createQuery(
                "select new com.ssafy.petstory.dto.FileQueryDto(f.board.id, f.id, f.filePath, f.imgFullPath)" +
                        " from File f" +
                        " where f.board.id in :boardId", FileQueryDto.class)
                .setParameter("boardId", boardId)
                .getResultList();
        return fileDtos;
    }

    /**
     * toBoardIds에서 찾은 boardId로 boardHashtag 컬렉션을 조회
     */
    private List<BoardHashtagQueryDto> findBoardHashtagOne(Long boardIds) {
        List<BoardHashtagQueryDto> boardHashtagQueryDtos = em.createQuery(
                "select new com.ssafy.petstory.dto.BoardHashtagQueryDto(bh.board.id, h.name)" +
                        " from BoardHashtag bh" +
                        " join bh.hashtag h" +
                        " where bh.board.id in :boardIds", BoardHashtagQueryDto.class)
                .setParameter("boardIds", boardIds)
                .getResultList();
        return boardHashtagQueryDtos;
    }

    /**
     * 게시물 삭제
     */
    public void delete(Board board) {
        em.remove(board);
    }



    /**
     * 프로필 조회 (자신이 쓴 게시물까지)
     * 수정시 수정할 프로필 찾아오기 + 삭제 시 삭제할 프로필 찾아오기
     */
    public ProfileQueryDto findProfileOne(Long profileId) {
        Profile profile = em.find(Profile.class, profileId);
        ProfileQueryDto getProfile = new ProfileQueryDto(profile);
        getProfile.setImgFullPath(profile.getImage().getImgFullPath());

        List<BoardQueryDto> result = findProfileBoard(profileId);

        // file 컬렉션을 Map 한 방에 조회
        Map<Long, List<FileQueryDto>> fileMap = findFileMap(toBoardIds(result));

        // boardHashtag 컬렉션 Map 한 방에 조회
        Map<Long, List<BoardHashtagQueryDto>> boardhashtagMap = findBoardHashtagMap(toBoardIds(result));
        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setBoardHashtags(boardhashtagMap.get(b.getBoardId()))
        );

        getProfile.setBoardQueryDtos(result);
        return getProfile;
    }

    /**
     * 게시물 상세(단건) 조회시 넘어온 boardId로 file 컬렉션을 조회
     */
    private List<BoardQueryDto> findProfileBoard(Long profileId) {
        List<BoardQueryDto> boardQueryDtos = em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto" +
                        "(b.profile.id, b.profile.nickname, b.profile.image.imgFullPath, b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b " +
                        " where b.profile.id in :profileId", BoardQueryDto.class)
                .setParameter("profileId", profileId)
                .getResultList();
        return boardQueryDtos;
    }

}
