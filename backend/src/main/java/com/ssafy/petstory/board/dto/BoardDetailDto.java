package com.ssafy.petstory.board.dto;

import com.ssafy.petstory.board.domain.Board;
import com.ssafy.petstory.hashtag.dto.BoardHashtagQueryDto;
import com.ssafy.petstory.file.dto.FileQueryDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardDetailDto {
    private Long profileId;
    private String nickname;
    private String imgFullPath;

    private Long boardId;
    private String title;
    private String context;
    private LocalDateTime boardDate; // 글생성 시간
    private long likeNum;
    private long reportNum;
    private List<FileQueryDto> files;
    private List<BoardHashtagQueryDto> boardHashtags;
    private List<BoardRelatedDto> relatedBoards; // 상세보기시 같은 해시태그를 가진 게시물들

    public BoardDetailDto(Long profileId, String nickname, String imgFullPath, Long boardId, String title, String context, LocalDateTime boardDate, long likeNum, long reportNum, List<FileQueryDto> files, List<BoardHashtagQueryDto> boardHashtags, List<BoardRelatedDto> relatedBoards) {
        this.profileId = profileId;
        this.nickname = nickname;
        this.imgFullPath = imgFullPath;
        this.boardId = boardId;
        this.title = title;
        this.context = context;
        this.boardDate = boardDate;
        this.likeNum = likeNum;
        this.reportNum = reportNum;
        this.files = files;
        this.boardHashtags = boardHashtags;
        this.relatedBoards = relatedBoards;
    }

    public BoardDetailDto(Board board) {
        this.boardId = board.getId();
        this.title = board.getTitle();
        this.context = board.getContext();
        this.boardDate = board.getBoardDate();
        this.likeNum = board.getLikeNum();
        this.reportNum = board.getReportNum();
    }
}
