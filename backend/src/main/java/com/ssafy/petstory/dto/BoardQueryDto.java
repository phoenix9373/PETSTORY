package com.ssafy.petstory.dto;

import com.ssafy.petstory.domain.File;
import lombok.Data;

import javax.persistence.Column;
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
//    private long hashtag_id;
    private List<FileQueryDto> files;

    public BoardQueryDto(Long boardId, String title, String context, LocalDateTime boardDate, long likeNum, long reportNum) {
        this.boardId = boardId;
        this.title = title;
        this.context = context;
        this.boardDate = boardDate;
        this.likeNum = likeNum;
        this.reportNum = reportNum;
    }
}
