package com.ssafy.petstory.service;

import com.ssafy.petstory.domain.File;
import com.ssafy.petstory.domain.Image;
import com.ssafy.petstory.dto.FileDto;
import com.ssafy.petstory.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AwsS3Service awsS3Service;
    private final FileRepository fileRepository;

    @Transactional
    public void create(File file) {
        fileRepository.save(file);
    }

    /**
     * 프로필 이미지 생성
     */
    @Transactional
    public Image createImage(MultipartFile file) throws IOException {
        // 이미지 정보 생성
        FileDto fileDto = new FileDto();
        String imgPath = awsS3Service.uploadProfileImage(file);
        fileDto.setFilePath(imgPath);
        fileDto.setImgFullPath("https://" + awsS3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + fileDto.getFilePath());
        Image image = Image.createImage(fileDto);
        fileRepository.saveProfileImage(image);
        return image;
    }

    private FileDto convertEntityToDto(File file) {
        return FileDto.builder()
                .id(file.getId())
                .filePath(file.getFilePath())
                .imgFullPath("https://" + awsS3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + file.getFilePath())
                .build();
    }


}
