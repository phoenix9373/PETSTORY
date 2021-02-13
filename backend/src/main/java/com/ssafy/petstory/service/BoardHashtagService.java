package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.BoardHashtag;
import com.ssafy.petstory.domain.Hashtag;
import com.ssafy.petstory.repository.BoardHashtagRepository;
import com.ssafy.petstory.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true) // 데이터의 변경이 없는 읽기 전용 메서드에 사용, 영속성 컨텍스트를 플러시 하지 않으므로 약간의 성능 향상(읽기 전용에는 다 적용)
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class BoardHashtagService {

    private final BoardHashtagRepository boardHashtagRepository;
    private final HashtagService hashtagService;
    private final BoardRepository boardRepository;

    public void save(BoardHashtag boardHashtag) {
        boardHashtagRepository.save(boardHashtag);
    }

    public List<Hashtag> saveByNames(Board board, List<String> hashtagNames){
        List<Hashtag> hashtags = mapToHashtag(hashtagNames);
        return hashtags;
    }

    private List<Hashtag> mapToHashtag(List<String> hashtagNames){
        List<Hashtag> hashtags = hashtagNames.stream()
                .map(name -> {
                    Hashtag hashtag = hashtagService.findOrCreateHashtag(name);
                    return hashtag;
                })
                .collect(Collectors.toList());
        return hashtags;
    }

    /**
     * Board의 Hashtag가 변경되어
     * -> 변경되지 않은 부분을 제외하고(boardHashtag에 boardId가 매핑 후 hashtagName이 같은 row)
     * -> 변경이 없는 부분을 boardHashtag에서 삭제 후 request에서 같은 부분에 매핑된 적 없는 이름들을 추가
     *
     * 일단, 걍 다 지워
     */
    public void update(Long boardId, List<BoardHashtag> boardHashtags, List<String> hashtags) {

        boardHashtagRepository.delete(boardId);
//        boardHashtags.stream()
//                .map((bh) ->{
//                    boardHashtagRepository.findByBoardId(boardId)
//
//                })

    }
}
