package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.*;
import com.ssafy.petstory.dto.CreateBoardRequest;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.FileDto;
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
    private final BoardHashtagRepository boardHashtagRepository;
    private final ProfileRepository profileRepository;
    private final FileRepository fileRepository;
    private final AwsS3Service awsS3Service;
    private final HashtagRepository hashtagRepository;
    private final BoardHashtagService boardHashtagService;
    private final HashtagService hashtagService;
    private FileService fileService;


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
        FileDto fileDto = new FileDto();
        if (!inputFiles.get(0).isEmpty()) { // fileService로 옮길까 고민중
            List<String> imgPathes = awsS3Service.upload(inputFiles);
            for (String imgPath : imgPathes) {
                fileDto.setFilePath(imgPath);
                File file = File.createFile(fileDto);
//                file.setBoard(board);
                file.setFilePath(fileDto.getFilePath());
                file.setImgFullPath("https://" + awsS3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + file.getFilePath());
                file.setBoard(board);
                fileRepository.save(file);
            }
        }

        // 해쉬태그 생성 -> 생성시 해쉬태그 중복체크
        List<Hashtag> hashtags = boardHashtagService.save(board, request.getHashtags());
        for (Hashtag hashtag : hashtags) {
            BoardHashtag boardHashtag = BoardHashtag.createBoardHashtag(hashtag);
            boardHashtag.setBoard(board);
            boardHashtagRepository.save(boardHashtag);
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
    public List<BoardQueryDto> findAllPaging(int offset, int limit) {
        return boardRepository.findAllPaging(offset, limit);
    }
    /**
     * 게시물 전체 조회 - 페이징
     */
    public List<BoardQueryDto> findAllPagingH(int offset, int limit) {
        return boardRepository.findAllPagingH(offset, limit);
    }

    /**
     * 게시물 상세 조회
     */
    public BoardQueryDto findOne(Long boardId) {
        return boardRepository.findOne(boardId);
    }


    private class ItemParam {
        private Long id;
        private String image;
    }


    /**
     * 게시물 수정
     */
//    @Transactional
//    public void update(Long boardId){
//        Board board = boardRepository.findBoard(boardId);
//        board.change(); // dirty checking
//    }


    /**
     * 게시물 삭제
     */
    @Transactional
    public void delete(Long boardId) {
        Board board = boardRepository.findBoard(boardId);
        boardRepository.delete(board);
    }


}
