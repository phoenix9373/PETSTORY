package com.ssafy.petstory.file;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryRepository extends JpaRepository<GalleryEntity, Long> {

    @Override
    List<GalleryEntity> findAll();

}