package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.File;
import com.ssafy.petstory.dto.FileDto;
import com.ssafy.petstory.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AwsS3Service awsS3Service;
    private final FileRepository fileRepository;

    @Transactional
    public void create(File file) {
        fileRepository.save(file);
    }



    private FileDto convertEntityToDto(File file) {
        return FileDto.builder()
                .id(file.getId())
                .filePath(file.getFilePath())
                .imgFullPath("https://" + awsS3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + file.getFilePath())
                .build();
    }


}
