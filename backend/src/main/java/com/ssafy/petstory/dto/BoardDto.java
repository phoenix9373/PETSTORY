package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.Board;
import com.ssafy.petstory.domain.File;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardDto {

    private Long boardId;
    private String title;
    private String context;
    private LocalDateTime boardDate; // 글생성 시간
    private File file;
//    private List<File> files; // 사진 여러장 -> 리스트로 바꿔야함
//        private long likeNum;
//        private long reportNum;
//        private List<BoardHashtag> boardHashtags;
//        private List<Comment> comments;

    public BoardDto(Long boardId, String title, String context, LocalDateTime boardDate, File file) {
        this.boardId = boardId;
        this.title = title;
        this.context = context;
        this.boardDate = boardDate;
        this.file = file;
    }


//    public BoardDto(Board board) {
//        boardId = board.getId();
//        title = board.getTitle();
//        context = board.getContext();
//        boardDate = board.getBoardDate();
//        files = board.getFiles();
//    }

}
