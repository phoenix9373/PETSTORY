package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.Hashtag;
import com.ssafy.petstory.repository.BoardHashtagRepository;
import com.ssafy.petstory.repository.FileRepository;
import com.ssafy.petstory.repository.HashtagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true) // 데이터의 변경이 없는 읽기 전용 메서드에 사용, 영속성 컨텍스트를 플러시 하지 않으므로 약간의 성능 향상(읽기 전용에는 다 적용)
@RequiredArgsConstructor // final, nonnull인 field를 가지고 생성자를 만들어줌
public class HashtagService {

    private final BoardHashtagRepository boardHashtagRepository;
    private final HashtagRepository hashtagRepository;

    @Transactional
    public Hashtag findOrCreateHashtag(String hashtagName) {

        Hashtag hashtag = hashtagRepository.findByName(hashtagName)
                .orElse(Hashtag.createHashtag(hashtagName));
//        return hashtag;
        return hashtagRepository.save(hashtag);
    }

}
