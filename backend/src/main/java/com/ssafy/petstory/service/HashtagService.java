package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.BoardHashtag;
import com.ssafy.petstory.domain.Hashtag;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.dto.HashtagDto;
import com.ssafy.petstory.repository.BoardHashtagRepository;
import com.ssafy.petstory.repository.BoardRepository;
import com.ssafy.petstory.repository.HashtagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class HashtagService {

    private final HashtagRepository hashtagRepository;
    private final BoardHashtagRepository boardHashtagRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public Hashtag findOrCreateHashtag(String hashtagName) {
        Hashtag hashtag = hashtagRepository.findByName(hashtagName)
                .orElse(Hashtag.createHashtag(hashtagName));
        hashtag.setCnt(hashtag.getCnt() + 1); // 참조 1회 증가
        return hashtagRepository.save(hashtag);
    }


    /**
     * 해시태그로 게시물 검색
     */
    public List<BoardQueryDto> findBoardsByHashtag(String hashtagName) {

        // 해당 이름을 가진 해시태그 엔티티 조회
        Hashtag hashtag = findOrCreateHashtag(hashtagName);

        // 해당 해시태그를 매핑한 게시글 번호들 조회
        List<BoardHashtag> boardHashtags = boardHashtagRepository.findBoardHashtag(hashtag.getId());

        // 게시글 번호들로 게시글들 조회
        List<BoardQueryDto> result = boardRepository.findByHashtag(boardHashtags);

        return result;

    }

    /**
     * 해시태그 자동완성
     *  (게시물 생성시)
     */
    public List<String> findHashtagName(String hashtagName){
        return hashtagRepository.findByHashtagNameStartsWith(hashtagName);
    }

    /**
     * 인기 해시태그 조회
     * @return
     */
    public List<HashtagDto> findPopularHashtags() {
        return hashtagRepository.findPopularHashtags(0, 10);
    }

    /**
     * 게시물 상세보기에서 연관 해시태그(상위 4) 조회
     * @return
     */
    public List<HashtagDto> findRelatedHashtags(String hashtagName){
        return hashtagRepository.findRelatedHashtags(0, 4, hashtagName);
    }
}
