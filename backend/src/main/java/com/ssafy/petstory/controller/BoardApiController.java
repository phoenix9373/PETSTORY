package com.ssafy.petstory.controller;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.dto.BoardDto;
import com.ssafy.petstory.dto.FileDto;
import com.ssafy.petstory.repository.BoardRepository;
import com.ssafy.petstory.service.AwsS3Service;
import com.ssafy.petstory.service.BoardService;
import com.ssafy.petstory.service.FileService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class BoardApiController {

    private final BoardService boardService;
    private final FileService fileService;
    private final AwsS3Service awsS3Service;
    private final BoardRepository boardRepository;


    /**
     * 이미지 생성 테스트
     * -> db에 넣어보기
     */
//    @PostMapping("/api/board/file")
////    public HttpStatus fileUpload(FileDto fileDto, List<MultipartFile> files) throws IOException{
//    public HttpStatus fileUpload(FileDto fileDto, MultipartFile file) throws IOException{
//        System.out.println("=======================================================");
//        String imgPath = awsS3Service.upload(file); // dto아래서 빼서 넣을라면 반복문 코드 서비스에서 빼와야됨, 아니면 서비스로 가든가
////        String imgPath = awsS3Service.upload(files); // dto아래서 빼서 넣을라면 반복문 코드 서비스에서 빼와야됨, 아니면 서비스로 가든가
//        fileDto.setFilePath(imgPath);
//
//        fileService.save(fileDto);
//
//        return HttpStatus.OK;
//
//    }
    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

    /**
     * 게시물 전체 조회
     * 1. 무한 스크롤 (페이징 처리) -> 아직 안 함 (V5 고민중)
     * 일단 v3 시도
     */
    @GetMapping("/api/board/findAll")
    public Result<BoardDto> fildAllV3() {
//        List<> galleryDtoList = galleryService.getList();
//        model.addAttribute("galleryList", galleryDtoList);
//        return "/gallery";

//        List<Board> boards = boardRepository.findAll();
        List<Board> boards = boardService.findAll();
        List<BoardDto> result = boards.stream()
                .map(b -> new BoardDto(b))
                .collect(Collectors.toList());
        return new Result(result);
    }

    /**
     * 게시물 상세 조회
     */
    @GetMapping("/api/board/findOne/{boardId}")
    public Result<com.ssafy.petstory.dto.BoardDto> findOne(@PathVariable("boardId") Long boardId){
        Board board = boardService.findOne(boardId);
        board.getFile().getImgFullPath(); // Lazy 강제 초기화
        BoardDto result = new BoardDto(board);

        return new Result(result);
    }

    /**
     * 게시물 생성
     */
    @PostMapping("/api/board/create")
    // @RequestBody : JSON으로 온 body를 Board로 Mapping해서 넣어줌
//    public CreateBoardResponse createBoard(@RequestParam("profileId") Long profileId, @RequestBody @Valid CreateBoardRequest request) {
    public CreateBoardResponse createBoard(CreateBoardRequest request, MultipartFile file) throws IOException {

//        Long id = boardService.create(profileId, request.title, request.context);

        FileDto fileDto = new FileDto();
        Long id = boardService.create(request.title, request.context, file, fileDto);

        return new CreateBoardResponse(id);
    }

    @Data
    static class CreateBoardRequest {
        private String title;
        private String context;

    }

    @Data
    static class CreateBoardResponse {
        private Long id;

        public CreateBoardResponse(Long id) {
            this.id = id;
        }
    }

}
