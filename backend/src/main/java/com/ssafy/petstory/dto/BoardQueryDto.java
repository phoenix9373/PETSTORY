package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.Board;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardQueryDto {

    private Long boardId;
    private String title;
    private String context;
    private LocalDateTime boardDate; // 글생성 시간
    private long likeNum;
    private long reportNum;
    private List<FileQueryDto> files;
    private List<BoardHashtagQueryDto> boardHashtags;


    public BoardQueryDto(Board board) {
        this.boardId = board.getId();
        this.title = board.getTitle();
        this.context = board.getContext();
        this.boardDate = board.getBoardDate();
        this.likeNum = board.getLikeNum();
        this.reportNum = board.getReportNum();
    }

    public BoardQueryDto(Long boardId, String title, String context, LocalDateTime boardDate, long likeNum, long reportNum) {
        this.boardId = boardId;
        this.title = title;
        this.context = context;
        this.boardDate = boardDate;
        this.likeNum = likeNum;
        this.reportNum = reportNum;
    }

    public BoardQueryDto(Long boardId, String title, String context, LocalDateTime boardDate, long likeNum, long reportNum, List<FileQueryDto> files, List<BoardHashtagQueryDto> boardHashtags) {
        this.boardId = boardId;
        this.title = title;
        this.context = context;
        this.boardDate = boardDate;
        this.likeNum = likeNum;
        this.reportNum = reportNum;
        this.files = files;
        this.boardHashtags = boardHashtags;
    }

    public BoardQueryDto(Long boardId, String title, String context, LocalDateTime boardDate, long likeNum, long reportNum, List<FileQueryDto> files) {
        this.boardId = boardId;
        this.title = title;
        this.context = context;
        this.boardDate = boardDate;
        this.likeNum = likeNum;
        this.reportNum = reportNum;
        this.files = files;
    }

}
