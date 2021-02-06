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

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_img_full_path")
    private String imgFullPath;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    /**
     * 다대일
     * File과 Board 연관 관계 (편의) 메서드
     */
    public void setBoard(Board board) {
        this.board = board;
        board.getFiles().add(this);
    }

    /**
     * File 생성 메서드
     */
    public static File createFile(FileDto fileDto) {
        File file = new File();

        return file;
    }

}
