package com.ssafy.petstory.controller;

import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.CreateBoardRequest;
import com.ssafy.petstory.dto.FileDto;
import com.ssafy.petstory.service.AwsS3Service;
import com.ssafy.petstory.service.BoardService;
import com.ssafy.petstory.service.FileService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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
     * 게시물 전체 조회 - 페이징
     *
     * http://localhost:8080/api/board/findAllPaging?offset=1&limit=5
     */
    @GetMapping("/api/board/findAllPagingH")
    public Result<BoardQueryDto> findAllPagingH(@RequestParam(value = "offset") int offset,
                                               @RequestParam(value = "limit") int limit){
        return new Result(boardService.findAllPagingH(offset, limit));
    }

    /**
     * 게시물 전체 조회 - 페이징
     *
     * http://localhost:8080/api/board/findAllPaging?offset=1&limit=5
     */
    @GetMapping("/api/board/findAllPaging")
    public Result<BoardQueryDto> findAllPaging(@RequestParam(value = "offset") int offset,
                                               @RequestParam(value = "limit") int limit){
        return new Result(boardService.findAllPaging(offset, limit));
    }

    /**
     * 게시물 전체 조회
     * ++ 무한스크롤(페이징)처리 추가해야 함
     */
    @GetMapping("/api/board/findAll")
    public Result<BoardQueryDto> findAll(){
        return new Result(boardService.findAll());
    }

    /**
     * 게시물 상세 조회
     *
     * http://localhost:8080/api/board/findOne/1
     */
    @GetMapping("/api/board/findOne/{boardId}")
    public Result<BoardQueryDto> findOne(@PathVariable("boardId") Long boardId){
        return new Result(boardService.findOne(boardId));
    }


    /**
     * 게시물 생성 (다중 이미지)
     */
    @PostMapping("/api/board/create")
    // @RequestBody : JSON으로 온 body를 Board로 Mapping해서 넣어줌
//    public CreateBoardResponse createBoard(@RequestParam("profileId") Long profileId, @RequestBody @Valid CreateBoardRequest request) {
    public CreateBoardResponse createBoard(CreateBoardRequest request, List<MultipartFile> files) throws IOException {

//        Long id = boardService.create(profileId, request.title, request.context);

        Long id = boardService.create(request.getTitle(), request.getContext(), files);

        return new CreateBoardResponse(id);
    }

    /**
     * 게시물 생성 (다중 이미지)
     */
    @PostMapping("/api/board/createH")
    // @RequestBody : JSON으로 온 body를 Board로 Mapping해서 넣어줌
//    public CreateBoardResponse createBoard(@RequestParam("profileId") Long profileId, @RequestBody @Valid CreateBoardRequest request) {
    public CreateBoardResponse createBoardH(CreateBoardRequest request, List<MultipartFile> files) throws IOException {

//        Long id = boardService.create(profileId, request.title, request.context);
        System.out.println("=-------------------------------------------");
        System.out.println(request.toString());

        Long id = boardService.createH(request, files);

        return new CreateBoardResponse(id);
    }


//    @Data
//    static class CreateBoardRequest {
//        private String title;
//        private String context;
//
//    }

    @Data
    static class CreateBoardResponse {
        private Long id;

        public CreateBoardResponse(Long id) {
            this.id = id;
        }
    }

}
