package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.*;
import com.ssafy.petstory.dto.*;
import com.ssafy.petstory.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional(readOnly = true) // 데이터의 변경이 없는 읽기 전용 메서드에 사용, 영속성 컨텍스트를 플러시 하지 않으므로 약간의 성능 향상(읽기 전용에는 다 적용)
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class BoardService {

    private final BoardRepository boardRepository;
    private final ProfileRepository profileRepository;
    private final AwsS3Service awsS3Service;
    private final BoardHashtagService boardHashtagService;
    private final FileService fileService;


    /**
     * 게시물 생성
     */
    @Transactional // 트랜잭션, 영속성 컨텍스트 -> 영속성 컨텍스트가 자동 변경
    // 값 세팅이 끝난 후 Transactional에 의해 commit이 되고 jpa는 flush(영속성 context중 변경 내역을 찾음)를 날림 -> 변경 내역이 있을 경우 변경 감지(dirty checking)
//    public Long create(Long profileId, String title, String context, ItemParam... itemParams) {
    public Long create(CreateBoardRequest request, List<MultipartFile> inputFiles) throws IOException {

        // Entity 조회
        Profile profile = profileRepository.findOne(request.getProfileId());
        // 게시물 생성
        Board board = Board.createBoard(profile, request.getTitle(), request.getContext());

        // 이미지 정보 생성
        if (!inputFiles.get(0).isEmpty()) { // fileService로 옮길까 고민중
            FileDto fileDto = new FileDto();
            List<String> imgPathes = awsS3Service.upload(inputFiles);
            for (String imgPath : imgPathes) {
                fileDto.setFilePath(imgPath);
                File file = fileService.createFile(fileDto);
                file.setBoard(board);
            }
        }
        // 해시태그 생성 -> 생성시 해시태그 중복체크
        List<Hashtag> hashtags = boardHashtagService.saveByNames(board, request.getHashtags());

        for (Hashtag hashtag : hashtags) {
            BoardHashtag boardHashtag = BoardHashtag.createBoardHashtag(hashtag);
            boardHashtag.setBoard(board);
            boardHashtagService.save(boardHashtag);
        }
        // 좋아요 누른 유저 검증 및 상태유지

        // 게시물 저장
        boardRepository.save(board);

        return board.getId();
    }

    /**
     * 게시물 전체 조회
     */
    public List<BoardQueryDto> findAll() {
        return boardRepository.findAll();
    }

    /**
     * 게시물 전체 조회 - 페이징
     */
    public List<BoardQueryDto> findAllPaging(int offset, int limit,Long profile_id) {
        return boardRepository.findAllPaging(offset, limit,profile_id);
    }

    /**
     * 게시물 상세 조회
     */
    public BoardDetailDto findOne(Long boardId) {
        return boardRepository.findOne(boardId);
    }

//    /**
//     * 좋아요 한 게시물 조회 - 페이징
//     */
//    public Object findLike(Long profile_id) {
//        boardRepository.findLike(profile_id);
//    }


    private class ItemParam {
        private Long id;
        private String image;
    }

    /**
     * 게시물 수정
     */
    @Transactional
    public Long update(Long boardId, UpdateBoardRequest request, List<MultipartFile> inputFiles) throws IOException {
        Board board = boardRepository.findBoard(boardId);
        board.update(request.getTitle(), request.getContext()); // dirty checking


        boardHashtagService.update(boardId, board.getBoardHashtags(), request.getHashtags());

        /**
         * boardHashtag에 boardId가 같은 row에서 hashtagName이 같은 애는 남기고
         * 다른 애들은 모두 지운 후,
         * request.hashtagNames에서 매핑 결과가 없는 애만 해시태그에 추가
         *
         */

//        for (String hashtag : request.getHashtags()) {
//            System.out.println("------------------------------------------------------------");
//            board.getBoardHashtags().forEach(bh -> {
//                if(bh.getHashtag().getName() != hashtag){
//                    notDupHashtagNames.add(hashtag);
//                }else {
//
//                }
//            });

//            board.getBoardHashtags().stream().map((bh) -> {
//                return bh.getHashtag().getName() != hashtag;
//            }).anyMatch(Objects::isNull);

//            System.out.println(collect);
//        }


        List<Hashtag> hashtags = boardHashtagService.saveByNames(board, request.getHashtags());
        for (Hashtag hashtag : hashtags) {
            if (hashtag.getBoardHashtags() != board.getBoardHashtags()) {
                BoardHashtag boardHashtag = BoardHashtag.createBoardHashtag(hashtag);
                boardHashtag.setBoard(board);
                boardHashtagService.save(boardHashtag);
            }
        }

        // 이미 게시물의 있던 이미지의 수정 내역 확인(유지, 삭제)
        if(!request.getImgFullPaths().get(0).isEmpty()){
            fileService.checkImageAndUpdate(boardId, request.getImgFullPaths());
        }

        // 이미지 생성
        if (!inputFiles.get(0).isEmpty()) { // fileService로 옮길까 고민중
            FileDto fileDto = new FileDto();
            List<String> imgPathes = awsS3Service.upload(inputFiles);
            for (String imgPath : imgPathes) {
                fileDto.setFilePath(imgPath);
                File file = fileService.createFile(fileDto);
                file.setBoard(board);
            }
        }
        return board.getId();
    }


    /**
     * 게시물 삭제
     */
    @Transactional
    public void delete(Long boardId) {
        Board board = boardRepository.findBoard(boardId);
        boardRepository.delete(board);
    }


}
