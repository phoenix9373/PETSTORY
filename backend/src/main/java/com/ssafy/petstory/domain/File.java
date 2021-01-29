package com.ssafy.petstory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.petstory.dto.FileDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "files")
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED) // protected 생성자 생성
public class File {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id;

//    @Column(length = 50, nullable = false)
//    private String title;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_img_full_path")
    private String imgFullPath;

    @JsonIgnore
    @OneToOne(mappedBy = "file", fetch = FetchType.LAZY)
    private Board board;


//    @Builder
//    public File(Long id, String filePath) {
//        this.id = id;
//        this.filePath = filePath;
//    }

    /**
     * File 생성 메서드
     */
    public static File createFile(Board board, FileDto fileDto) {
        File file = new File();
        file.setBoard(board);
        file.setId(file.getId());
        file.setFilePath(file.getFilePath());

        System.out.println(fileDto.getFilePath());
        System.out.println(file.getBoard());
        System.out.println(file.getId());
        System.out.println(file.getFilePath());


        return file;
    }

}
