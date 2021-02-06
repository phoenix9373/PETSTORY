package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.BoardHashtag;
import com.ssafy.petstory.domain.Hashtag;
import com.ssafy.petstory.repository.BoardHashtagRepository;
import com.ssafy.petstory.repository.HashtagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true) // 데이터의 변경이 없는 읽기 전용 메서드에 사용, 영속성 컨텍스트를 플러시 하지 않으므로 약간의 성능 향상(읽기 전용에는 다 적용)
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class BoardHashtagService {

    private final BoardHashtagRepository boardHashtagRepository;
    private final HashtagRepository hashtagRepository;
    private final HashtagService hashtagService;

    public List<Hashtag> save(Board board, List<String> hashtagNames){
//        List<BoardHashtag> boardHashtags = mapToBoardHashtag(hashtagNames);
        List<Hashtag> hashtags = mapToBoardHashtag(hashtagNames);

//        for (BoardHashtag boardHashtag : boardHashtags) {
//            boardHashtag.setBoard(board);
//        }
        return hashtags;
    }

    private List<Hashtag> mapToBoardHashtag(List<String> hashtagNames){
        List<Hashtag> hashtags = hashtagNames.stream()
                .map(name -> {
                    Hashtag hashtag = hashtagService.findOrCreateHashtag(name);
                    return hashtag;
                })
                .collect(Collectors.toList());
        return hashtags;
    }
//    private List<BoardHashtag> mapToBoardHashtag(List<String> hashtags){
//        List<BoardHashtag> boardHashtags = hashtags.stream()
//                .map(name -> {
//                    Hashtag hashtag = hashtagService.findOrCreateHashtag(name);
//                    return findOrCreateBoardHashtag(hashtag);
//                })
//                .collect(Collectors.toList());
//        return boardHashtags;
//    }

    @Transactional
    private BoardHashtag findOrCreateBoardHashtag(Hashtag hashtag) {
        BoardHashtag boardHashtag = boardHashtagRepository.findByHashtag(hashtag.getId())
                .orElse(BoardHashtag.builder()
                        .hashtag(hashtag)
                        .build());
//        return boardHashtag;
        return boardHashtagRepository.save(boardHashtag);
    }
}
