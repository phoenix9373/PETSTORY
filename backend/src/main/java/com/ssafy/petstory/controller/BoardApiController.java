package com.ssafy.petstory.controller;

import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.FileDto;
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

@RestController
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class BoardApiController {

    private final BoardService boardService;
    private final FileService fileService;
    private final AwsS3Service awsS3Service;


    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

    /**
     * 게시물 전체 조회
     * ++ 무한스크롤(페이징)처리 추가해야 함
     */
    @GetMapping("/api/board/findAll")
//    public Result<BoardQueryDto> findAll(){
    public List<BoardQueryDto> findAll(){
        return boardService.findAll();
    }

    /**
     * 게시물 상세 조회
     */
    @GetMapping("/api/board/findOne/{boardId}")
    public Result<BoardQueryDto> findOne(@PathVariable("boardId") Long boardId){
        BoardQueryDto result = boardService.findOne(boardId);

        return new Result(result);
    }

    /**
     * 게시물 생성 V2 (다중 이미지)
     */
    @PostMapping("/api/board/create")
    // @RequestBody : JSON으로 온 body를 Board로 Mapping해서 넣어줌
//    public CreateBoardResponse createBoard(@RequestParam("profileId") Long profileId, @RequestBody @Valid CreateBoardRequest request) {
    public CreateBoardResponse createBoard(CreateBoardRequest request, List<MultipartFile> files) throws IOException {

//        Long id = boardService.create(profileId, request.title, request.context);

        FileDto fileDto = new FileDto();
        Long id = boardService.createV2(request.title, request.context, files, fileDto);

        return new CreateBoardResponse(id);
    }

    /**
     * 게시물 생성 V1 (단일 이미지)
     */
    @PostMapping("/api/board/createV1")
    // @RequestBody : JSON으로 온 body를 Board로 Mapping해서 넣어줌
    public CreateBoardResponse createBoardV1(CreateBoardRequest request, MultipartFile file) throws IOException {

//        Long id = boardService.create(profileId, request.title, request.context);

        FileDto fileDto = new FileDto();
        Long id = boardService.createV1(request.title, request.context, file, fileDto);

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
