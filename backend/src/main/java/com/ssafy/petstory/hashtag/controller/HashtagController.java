package com.ssafy.petstory.hashtag.controller;

import com.ssafy.petstory.board.dto.BoardQueryDto;
import com.ssafy.petstory.hashtag.dto.HashtagDto;
import com.ssafy.petstory.hashtag.service.BoardHashtagService;
import com.ssafy.petstory.hashtag.service.HashtagService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HashtagController {

    private final BoardHashtagService boardHashtagService;
    private final HashtagService hashtagService;

    @Data
    @AllArgsConstructor
    static  class Result<T>{
        private T data;
    }


    /**
     * 해시태그로 게시글 검색
     */
    @GetMapping("/hashtag/findBoards")
    public Result<BoardQueryDto> findBoardsByHashtag(@RequestBody HashtagDto dto){
        return new Result(hashtagService.findBoardsByHashtag(dto.getHashtagName()));
    }

    /**
     * 해시태그 자동완성
     *  : like query
     */
    @GetMapping("/hashtag/findOne/{hashtagName}")
    public Result<HashtagDto> findOne(@PathVariable("hashtagName") String temp){
        System.out.println(temp);
        return new Result(hashtagService.findHashtagName(temp));
    }

    /**
     * 인기 해시태그
     * @return
     */
    @GetMapping("/hashtag/findPopulars")
    public Result<HashtagDto> findPopulars() {
        return new Result(hashtagService.findPopularHashtags());
    }

    /**
     * 게시물 상세보기에서 연관 해시태그(top4) 조회
     */
//    @GetMapping("/hashtag/findRelated")
//    public Result<HashtagDto> findRelated(String hashtagName) {
//        return new Result(hashtagService.findRelatedHashtags(hashtagName));
//    }

}
