package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.File;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
//public interface FileRepository extends JpaRepository<File, Long> {
public class FileRepository {

    private final EntityManager em;

    public void save(File file) {
        em.persist(file);
    }

//    @Override
//    List<File> findAllFiles();
}
