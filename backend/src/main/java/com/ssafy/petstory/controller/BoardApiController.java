package com.ssafy.petstory.controller;

import com.ssafy.petstory.dto.*;
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
    @GetMapping("/api/board/findAllPaging")
    public Result<BoardQueryDto> findAllPaging(@RequestParam(value = "offset") int offset,
                                               @RequestParam(value = "limit") int limit){
        return new Result(boardService.findAllPaging(offset, limit));
    }

    /**
     * 게시물 전체 조회
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
    public Result<BoardDetailDto> findOne(@PathVariable("boardId") Long boardId){
        return new Result(boardService.findOne(boardId));
    }

    /**
     * 게시물 생성 (다중 이미지)
     */
    @PostMapping("/api/board/create")
    public CreateBoardResponse createBoard(CreateBoardRequest request, List<MultipartFile> files) throws IOException {

        Long id = boardService.create(request, files);

        return new CreateBoardResponse(id);
    }

    /**
     * 게시물 수정
     */
    @PutMapping("/api/board/update/{boardId}")
    public CreateBoardResponse updateBoard(@PathVariable("boardId") Long boardId, UpdateBoardRequest request, List<MultipartFile> files) throws IOException {

        Long id = boardService.update(boardId, request, files);

        return new CreateBoardResponse(id);
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/api/board/delete/{boardId}")
    public void deleteBoard(@PathVariable("boardId") Long boardId) {

        boardService.delete(boardId);
    }



    @Data
    static class CreateBoardResponse {
        private Long id;

        public CreateBoardResponse(Long id) {
            this.id = id;
        }
    }

}
