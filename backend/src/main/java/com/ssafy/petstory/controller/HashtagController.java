package com.ssafy.petstory.controller;

import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.HashtagDto;
import com.ssafy.petstory.service.BoardHashtagService;
import com.ssafy.petstory.service.HashtagService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
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
    @GetMapping("/api/hashtag/findBoards")
    public Result<BoardQueryDto> findBoardsByHashtag(String hashtagName){
        return new Result(hashtagService.findBoardsByHashtag(hashtagName));
    }

    /**
     * 해시태그 자동완성
     *  : like query
     */
    @GetMapping("/api/hashtag/findOne")
    public Result<String> findOne(String hashtagName){
        return new Result(hashtagService.findHashtagName(hashtagName));
    }

    /**
     * 인기 해시태그
     * @return
     */
    @GetMapping("/api/hashtag/findPopulars")
    public Result<HashtagDto> findPopulars() {
        return new Result(hashtagService.findPopularHashtags());
    }

    /**
     * 게시물 상세보기에서 연관 해시태그(top4) 조회
     */
//    @GetMapping("/api/hashtag/findRelated")
//    public Result<HashtagDto> findRelated(String hashtagName) {
//        return new Result(hashtagService.findRelatedHashtags(hashtagName));
//    }

}
