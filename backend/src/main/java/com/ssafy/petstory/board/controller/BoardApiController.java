package com.ssafy.petstory.board.controller;

import com.ssafy.petstory.board.dto.BoardDetailDto;
import com.ssafy.petstory.board.dto.BoardQueryDto;
import com.ssafy.petstory.board.dto.CreateBoardRequest;
import com.ssafy.petstory.board.dto.UpdateBoardRequest;
import com.ssafy.petstory.board.service.BoardService;
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
     * isLike안에 board_id 값이 있는 것이 좋아요 눌린 게시물 입니다. (profile_id는 의미없음) 프론트에서 값 있는지 없는지 체크해서
     * 하트 색정하면 될듯 (내가 좋아요 했던 게시물인지)
     */
    @GetMapping("/board/findAllPaging/{profileId}")
    public Result<BoardQueryDto> findAllPaging(@RequestParam(value = "offset") int offset,
                                               @RequestParam(value = "limit") int limit,
                                               @PathVariable("profileId") Long profileId){
        return new Result(boardService.findAllPaging(offset, limit, profileId));
    }


    /**
     * 자신이 좋아요 한 게시물 조회
     */
    @GetMapping("/board/findLike/{profileId}")
    public Result<BoardQueryDto> findLike(@RequestParam(value = "offset") int offset,
                                          @RequestParam(value = "limit") int limit,
                                          @PathVariable("profileId") Long profileId){

        return new Result(boardService.findLike(offset, limit, profileId));
    }

    /**
     * 헤쉬태그 이름 받고 게시물 반환
     * 1. 헤쉬테그 아이디 뽑아 내기
     * 2. 보드 아이디 뽑아 내기
     * 3. 보드 아이디로 보드 객체 리스트 반환
     */
    @GetMapping("/board/findHashtag/{profileId}")
    public Result<BoardQueryDto> findHashtagBoard(@PathVariable("profileId") Long profileId,
                                                  @RequestParam(value = "hashtagName") String hashtagName){

        return new Result(boardService.findHashtagBoard(hashtagName,profileId));
    }

    /**
     * 게시물 전체 조회
     */
    @GetMapping("/board/findAll")
    public Result<BoardQueryDto> findAll(){
        return new Result(boardService.findAll());
    }

    /**
     * 게시물 상세 조회
     *
     * http://localhost:8080/api/board/findOne/1
     */
    @GetMapping("/board/findOne/{boardId}")
    public Result<BoardDetailDto> findOne(@PathVariable("boardId") Long boardId){
        return new Result(boardService.findOne(boardId));
    }

    /**
     * 게시물 생성 (다중 이미지)
     */
    @PostMapping("/board/create")
    public CreateBoardResponse createBoard(CreateBoardRequest request, List<MultipartFile> files) throws IOException {

        Long id = boardService.create(request, files);

        return new CreateBoardResponse(id);
    }

    /**
     * 게시물 수정
     */
    @PutMapping("/board/update/{boardId}")
    public CreateBoardResponse updateBoard(@PathVariable("boardId") Long boardId, UpdateBoardRequest request, List<MultipartFile> files) throws IOException {

        Long id = boardService.update(boardId, request, files);

        return new CreateBoardResponse(id);
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/board/delete/{boardId}")
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