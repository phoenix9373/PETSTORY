package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.File;
import com.ssafy.petstory.domain.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

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

}
