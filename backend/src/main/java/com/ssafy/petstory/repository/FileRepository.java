package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.File;
import com.ssafy.petstory.domain.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class FileRepository {

    private final EntityManager em;

    public void save(File file) {
        em.persist(file);
    }

    public void saveProfileImage(Image image) {
        em.persist(image);
    }

    public List<File> findByImgFullPaths(List<String> imgFullPaths) {
        return em.createQuery(
                "select f" +
                        " from File f" +
                        " where f.imgFullPath in :imgFullPaths", File.class)
                .setParameter("imgFullPaths", imgFullPaths)
                .getResultList();
    }


    /**
     * baord Id들을 찾는 메서드
     */
    public List<Long> toBoardIds(List<File> files){
        List<Long> boardIds = files.stream()
                .map(f -> f.getId())
                .collect(Collectors.toList());
        return boardIds;
    }
    /**
     * imgFullPath들을 찾는 메서드
     */
    public List<String> toImgFullPaths(List<File> files){
        List<String> imgFullPaths = files.stream()
                .map(f -> f.getImgFullPath())
                .collect(Collectors.toList());
        return imgFullPaths;
    }

    public List<Long> findBoardId(String imgFullPath) {
        return em.createQuery(
                "select f.board.id" +
                        " from File f" +
                        " where f.imgFullPath in :imgFullPath", Long.class)
                .setParameter("imgFullPath", imgFullPath)
                .getResultList();
    }

    public List<String> findByBoardIds(Long boardId) {
        return em.createQuery(
                "select f.imgFullPath" +
                        " from File f" +
                        " where f.board.id in :boardId", String.class)
                .setParameter("boardId", boardId)
                .getResultList();
    }

    public void checkImageAndUpdate(Long boardId, List<String> imgFullPaths) {
//        List<Long> boardIds = toBoardIds(file);
//        List<Long> boardId = findBoardId(imgFullPaths.get(0));
        List<String> imgFullPathsInBoard = findByBoardIds(boardId);
        System.out.println("1111111111111111111111111111111111111111111111111111111111");
        System.out.println("boardId:  " + boardId);
        for (String s : imgFullPathsInBoard) {
            System.out.println(s);
        }

        // input imgFullPaths와 원래 게시물이 가지고 있던 imgFullPaths 비교
        List<String> deleted = imgFullPathsInBoard.stream()
                .filter(ib -> imgFullPaths.stream().noneMatch(Predicate.isEqual(ib)))
                .collect(Collectors.toList());

        System.out.println("222222222222222222222222222222222222222222222222222222222222");
        for (String s : deleted) {
            System.out.println(s);
        }
        System.out.println("33333333333333333333333333333333333333333333333333333333333333333");

        List<File> deletedFiles = findByImgFullPaths(deleted);
        for (File deletedFile : deletedFiles) {
            delete(deletedFile);
        }


    }

    public void delete(File file) {
        em.remove(file);
    }
}
