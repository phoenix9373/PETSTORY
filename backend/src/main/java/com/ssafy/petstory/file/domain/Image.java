package com.ssafy.petstory.file.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.petstory.member.domain.Profile;
import com.ssafy.petstory.file.dto.FileDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter @Setter
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "img_full_path")
    private String imgFullPath;

    @JsonIgnore
    @OneToOne(mappedBy = "image", fetch = FetchType.LAZY)
    private Profile profile;



    /**
     * Image 생성 메서드
     */
    public static Image createImage(FileDto fileDto) {
        Image image = new Image();
        image.setImagePath(fileDto.getFilePath());
        image.setImgFullPath(fileDto.getImgFullPath());
        return image;
    }
}
