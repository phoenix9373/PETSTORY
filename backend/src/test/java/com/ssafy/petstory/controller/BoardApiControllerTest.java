package com.ssafy.petstory.controller;

import com.ssafy.petstory.repository.BoardRepository;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class BoardApiControllerTest {

    @Autowired EntityManager em;
    @Autowired BoardRepository boardRepository;

//    @Test
//    public void 게시글생성() {
//        // given
////        Profile profile = createProfile();
//        Board board = createBoard();
//
//
//        // when
//
//        // then
//    }
//
//    private Board createBoard(String title, String context) {
//        Board board = new Board();
//
//
//
//    }
}