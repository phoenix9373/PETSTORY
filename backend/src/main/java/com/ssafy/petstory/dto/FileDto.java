package com.ssafy.petstory.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FileDto {

    private Long id;
    private String filePath;
    private String imgFullPath;

//    public File toEntity() {
//        File build = File.builder()
//                .id(id)
//                .filePath(filePath)
//                .build();
//        return build;
//    }

    @Builder
    public FileDto(Long id, String filePath, String imgFullPath) {
        this.id = id;
        this.filePath = filePath;
        this.imgFullPath = imgFullPath;
    }
}