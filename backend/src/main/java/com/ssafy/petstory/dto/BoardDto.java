package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.File;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardDto {

    private Long boardId;
    private String title;
    private String context;
    private LocalDateTime boardDate; // 글생성 시간
    private File file; // 사진 여러장 -> 리스트로 바꿔야함
//        private long likeNum;
//        private long reportNum;
//        private List<BoardHashtag> boardHashtags;
//        private List<Comment> comments;

    public BoardDto(Board board) {
        boardId = board.getId();
        title = board.getTitle();
        context = board.getContext();
        boardDate = board.getBoardDate();
        file = board.getFile();
    }

}
