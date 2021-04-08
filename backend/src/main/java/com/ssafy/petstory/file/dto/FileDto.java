package com.ssafy.petstory.file.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FileDto {

    private Long id;
    private String filePath;
    private String imgFullPath;

    @Builder
    public FileDto(Long id, String filePath, String imgFullPath) {
        this.id = id;
        this.filePath = filePath;
        this.imgFullPath = imgFullPath;
    }
}