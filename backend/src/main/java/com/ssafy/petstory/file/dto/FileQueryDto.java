package com.ssafy.petstory.file.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Data
public class FileQueryDto {
    @JsonIgnore
    private Long boardId;
    private Long fileId;
    private String filePath;
    private String imgFullPath;

    public FileQueryDto(Long boardId, Long fileId, String filePath, String imgFullPath) {
        this.boardId = boardId;
        this.fileId = fileId;
        this.filePath = filePath;
        this.imgFullPath = imgFullPath;
    }
}