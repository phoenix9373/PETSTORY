package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.*;
import com.ssafy.petstory.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
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
    public List<BoardQueryDto> findAllPaging(int offset, int limit, long profile_id) {
        // 루트 조회(XToOne 코드 모두 한 번에 조회)
        List<BoardQueryDto> result = findBoardsPaging(offset, limit);

        // file 컬렉션을 Map 한 방에 조회 ->boardid 리스트를 넣는다.
        Map<Long, List<FileQueryDto>> fileMap = findFileMap(toBoardIds(result));

        // boardHashtag 컬렉션 Map 한 방에 조회
        Map<Long, List<BoardHashtagQueryDto>> boardhashtagMap = findBoardHashtagMap(toBoardIds(result));

        //해당 게시글 like 여부 조회
        //게시글 리스트를 가지고 매핑하고 각각의 게시물에 넣어주자 id - like 여부
        Map<Long, List<LikeQueryDto>> likeMap = findlike(toBoardIds(result),profile_id);

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setBoardHashtags(boardhashtagMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setIsLike(likeMap.get(b.getBoardId()))
        );  //

        return result;
    }


    /**
     *  좋아요 한 게시물 조회 - 페이징
     */


    /**
     * 포스트리스트의 게시물 만 뽑아와
     */
    private List<BoardQueryDto> findPostlistBoardsPaging(int offset, int limit, List<Long> posts) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto" +
                        "(p.id, p.nickname, p.image.imgFullPath, b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b" +
                        " join b.profile p" +
                        " where b.id in :posts"+
                        " order by b.boardDate desc", BoardQueryDto.class)
                .setParameter("posts", posts)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
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
                        " join b.profile p" +
                        " order by b.boardDate desc", BoardQueryDto.class)
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
        List<Long> boardIds = result.stream()
                .map(b -> b.getBoardId())
                .collect(Collectors.toList());
        return boardIds;
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
                "select new com.ssafy.petstory.dto.BoardHashtagQueryDto(bh.board.id, bh.id, h.name)" +
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
    public BoardDetailDto findOne(Long boardId) {
        Board board = em.find(Board.class, boardId);
        BoardDetailDto result = new BoardDetailDto(board);

        result.setProfileId(board.getProfile().getId());
        result.setNickname(board.getProfile().getNickname());
        result.setImgFullPath(board.getProfile().getImage().getImgFullPath());

        // file 컬렉션을 Map 한 방에 조회
        List<FileQueryDto> fileOne = findFileOne(boardId);
        // boardHashtag 컬렉션 Map 한 방에 조회
        List<BoardHashtagQueryDto> boardhashtagOne = findBoardHashtagOne(boardId);


        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.setFiles(fileOne);
        result.setBoardHashtags(boardhashtagOne);
        // 연관된(같은) 해시태그를 가진 게시물 번호들(top4) 조회
        if(!boardhashtagOne.isEmpty()){
            Long hashtagId = boardhashtagOne.get(0).getHashtagId();
            List<BoardRelatedDto> relatedBoards = findRelatedBoards(boardId, hashtagId);
            result.setRelatedBoards(relatedBoards);
        }else{
            List<BoardRelatedDto> empty = new ArrayList<>();
            result.setRelatedBoards(empty);
        }
        return result;
    }

    /**
     * 게시물 상세보기 시
     *  해당 게시물의 해시태그와 같은 게시물 조회
     *  이 때, 같은 게시물은 제외
     */
    private List<BoardRelatedDto> findRelatedBoards(Long boardId, Long hashtagId) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardRelatedDto(bh.board.id)" +
                        " from BoardHashtag bh" +
                        " where bh.hashtag.id in :hashtagId" +
                        " and bh.board.id not in :boardId", BoardRelatedDto.class)
                .setParameter("hashtagId", hashtagId)
                .setParameter("boardId", boardId)
                .setFirstResult(0)
                .setMaxResults(4)
                .getResultList();
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
                "select new com.ssafy.petstory.dto.BoardHashtagQueryDto(bh.board.id, h.id, h.name)" +
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
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto" +
                        "(b.profile.id, b.profile.nickname, b.profile.image.imgFullPath, b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b " +
                        " where b.profile.id in :profileId", BoardQueryDto.class)
                .setParameter("profileId", profileId)
                .getResultList();
    }

    /**
     * 해시태그로 게시글들 전체 조회
     */
    public List<BoardQueryDto> findByHashtag(List<BoardHashtag> boardHashtags) {
        List<Long> boardIds = toBoardIdsByBoardHashtag(boardHashtags);
        List<BoardQueryDto> result = findBoardsByBoardIds(boardIds);

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
     * 해시태그에 해당하는 boardId들 조회
     */
    private List<Long> toBoardIdsByBoardHashtag(List<BoardHashtag> boardHashtags){
        List<Long> lists = boardHashtags.stream()
                .map(bh -> bh.getBoard().getId())
                .collect(Collectors.toList());
        return lists;
    }

    /**
     * BoardHashtag에 해당하는
     * 1:N 관계(Collection)을 제외한 나머지를 한 번에 조회
     * -> XToOne 모두 조회
     */
    private List<BoardQueryDto> findBoardsByBoardIds(List<Long> boardIds) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.BoardQueryDto" +
                        "(p.id, p.nickname, p.image.imgFullPath, b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
                        " from Board b " +
                        " join b.profile p" +
                        " where b.id in :boardIds", BoardQueryDto.class)
                .setParameter("boardIds", boardIds)
                .getResultList();


//        em.createQuery(
//                "select new com.ssafy.petstory.dto.BoardQueryDto" +
//                        "(b.profile.id, b.profile.nickname, b.profile.image.imgFullPath, b.id, b.title, b.context, b.boardDate, b.likeNum, b.reportNum)" +
//                        " from Board b " +
//                        " where b.boardHashtag.id in :boardHashtagId", BoardQueryDto.class)
//                .setParameter("boardHashtagId", boardHashtagId)
//                .getResultList();
    }
    public Map<Long, List<LikeQueryDto>> findlike(List<Long> b_ids,Long p_id){  //엔티티 사이즈로 리턴

        List<LikeQueryDto> islikes = em.createQuery(
                "SELECT new com.ssafy.petstory.dto.LikeQueryDto(m.likeId,m.board.id)  FROM Like m WHERE m.board.id in :board_id AND m.profileId = :profile_id", LikeQueryDto.class)
                .setParameter("board_id",b_ids)
                .setParameter("profile_id",p_id)
                .getResultList();

        return islikes.stream()
                .collect(Collectors.groupingBy(islike -> islike.getBoardId())); // fileDtos -> map으로 바꿔서 최적화(코드 작성 편의, 성능 향상)
    }

    public List<BoardQueryDto> findPostlistBoard(int offset, int limit, Long memberPostlistId, Long profile_id) {
        //맴버 포스트 리스트 id로 board_id 뽑아온 후 그걸로 where 써서 걸러서 result에 뽑아오자
        List<Long> posts = findBoardIdByMPid(memberPostlistId);

        // 루트 조회(XToOne 코드 모두 한 번에 조회)
        List<BoardQueryDto> result = findPostlistBoardsPaging(offset, limit,posts);

        // file 컬렉션을 Map 한 방에 조회 ->boardid 리스트를 넣는다.
        Map<Long, List<FileQueryDto>> fileMap = findFileMap(toBoardIds(result));

        // boardHashtag 컬렉션 Map 한 방에 조회
        Map<Long, List<BoardHashtagQueryDto>> boardhashtagMap = findBoardHashtagMap(toBoardIds(result));

        //해당 게시글 like 여부 조회
        //게시글 리스트를 가지고 매핑하고 각각의 게시물에 넣어주자 id - like 여부
        Map<Long, List<LikeQueryDto>> likeMap = findlike(toBoardIds(result),profile_id);

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setBoardHashtags(boardhashtagMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setIsLike(likeMap.get(b.getBoardId()))
        );  //

        return result;
    }

    private List<Long> findBoardIdByMPid(Long MPid) {
        List<Long> pBoardId = new ArrayList<>();

        List<Postlist> posts = em.createQuery("SELECT p FROM Postlist p WHERE p.memberPostlist.id = :MPid ", Postlist.class)
                .setParameter("MPid",MPid)
                .getResultList();

        for(int i =0;i<posts.size();i++){
            pBoardId.add(posts.get(i).getBoardId());
        }
        return pBoardId;
    }

    public List<BoardQueryDto> findLikeBoard(int offset, int limit, Long profileId) {

        //profileId로 like테이블에서 board_id 뽑아온 후 그걸로 where 써서 걸러서 likeboards에 뽑아오자
        List<Long> likeboards = findBoardIdByLike(profileId);

        // 루트 조회(XToOne 코드 모두 한 번에 조회)
        List<BoardQueryDto> result = findPostlistBoardsPaging(offset, limit, likeboards);
        // file 컬렉션을 Map 한 방에 조회 ->boardid 리스트를 넣는다.
        Map<Long, List<FileQueryDto>> fileMap = findFileMap(toBoardIds(result));

        // boardHashtag 컬렉션 Map 한 방에 조회
        Map<Long, List<BoardHashtagQueryDto>> boardhashtagMap = findBoardHashtagMap(toBoardIds(result));

        //해당 게시글 like 여부 조회
        //게시글 리스트를 가지고 매핑하고 각각의 게시물에 넣어주자 id - like 여부
        Map<Long, List<LikeQueryDto>> likeMap = findlike(toBoardIds(result),profileId);

        // 루프를 돌면서 컬렉션 추가(추가 쿼리 실행 x, 메모리로 가져와 처리)
        result.forEach(b ->
                b.setFiles(fileMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setBoardHashtags(boardhashtagMap.get(b.getBoardId()))
        );
        result.forEach(b ->
                b.setIsLike(likeMap.get(b.getBoardId()))
        );
        return result;
    }

    private List<Long> findBoardIdByLike(Long profileId) {
        List<Long> pBoardId = new ArrayList<>();

        List<Like> likes = em.createQuery("SELECT p FROM Like p WHERE p.profileId = :profileId ", Like.class)
                .setParameter("profileId",profileId)
                .getResultList();

        for(int i =0;i<likes.size();i++){
            pBoardId.add(likes.get(i).getBoard().getId());
        }
        return pBoardId;
    }

}
