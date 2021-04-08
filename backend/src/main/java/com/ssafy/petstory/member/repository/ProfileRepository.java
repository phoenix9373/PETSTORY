package com.ssafy.petstory.member.repository;

import com.ssafy.petstory.board.domain.Board;
import com.ssafy.petstory.member.domain.Like;
import com.ssafy.petstory.member.dto.ReadMultiProfileResponse;
import com.ssafy.petstory.member.domain.Alarm;
import com.ssafy.petstory.member.domain.Profile;
import com.ssafy.petstory.member.domain.Relation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProfileRepository {
    private final EntityManager em;

    /**
     * 프로필 생성
     */
    public void saveP(Profile profile){
        em.persist(profile);
    }

    /**
     * 프로필 다중 조회
     */
    public List<ReadMultiProfileResponse> findByMemberId(Long id) {
        return em.createQuery(
                "select new com.ssafy.petstory.member.dto.ReadMultiProfileResponse(p.id, p.nickname, p.state, p.rank, p.image.imgFullPath)" +
                        " from Profile p" +
                        " where p.member.id = :id", ReadMultiProfileResponse.class) // ":name" 파라미터 바인딩
                .setParameter("id", id)
                .getResultList();
    }

    /**
     * 프로필 조회
     * 수정시 수정할 프로필 찾아오기 + 삭제 시 삭제할 프로필 찾아오기
     */
    public Profile findOne(Long id) {
        return em.find(Profile.class, id);
    }

    /**
     * 프로필 삭제
     */
    public void delete(Profile profile){
        em.remove(profile);
    }

    public int findLike(Long pId, Long bId){  //엔티티 사이즈로 리턴

            List<Like> likes = em.createQuery("SELECT m FROM Like m WHERE m.board.id = :boardId AND m.profileId = :profileId", Like.class)
                    .setParameter("boardId",bId)
                    .setParameter("profileId",pId)
                    .getResultList();

            return likes.size();
    }

    public void saveLike(Like like) {
        em.persist(like);
    }

    public void delLike(Like like) {
        System.out.println("왜 삭제가 안되냐구1");
        em.remove(like);
    }


    public void saveRelation(Relation relation) {
        em.persist(relation);
    }

    public void saveAlarm(Like like) {
        Alarm alarm = new Alarm();
        alarm.setLikeId(like); //매핑
        em.persist(alarm);
    }

    public void delAlarm(Like dellike) {
        Alarm alarm = new Alarm();
        alarm.setLikeId(dellike); //매핑

        em.remove(alarm);
    }

    public int likeCount(Long profileId) {
        List<Like> likes = em.createQuery("SELECT m FROM Like m WHERE m.board.profile.id = :boardId", Like.class)
                .setParameter("boardId",profileId)
                .getResultList();

        List<Alarm> alarms = em.createQuery("select  a from Alarm  a where a.likeId in :likeIds", Alarm.class)
                .setParameter("likeIds",likes)
                .getResultList();

        return alarms.size();
    }

    public List<Long> findAlarmBoard(Long profileId) {
        List<Board> boards = em.createQuery("SELECT m FROM Board m WHERE m.profile.id = :profileId", Board.class)
                .setParameter("profileId",profileId)
                .getResultList();

        List<Long> boardId = new ArrayList<>();

        for(int i =0;i<boards.size();i++){
            boardId.add(boards.get(i).getId());
        }

        return boardId;
    }
    public void delAlarm2(Like delLike) {
        Alarm alarm = findDelAlarm(delLike.getLikeId());
        em.remove(alarm);
    }

    public Alarm findDelAlarm(Long delLikeId){
        Alarm temp = new Alarm();
        try {
        Alarm alarm = em.createQuery("SELECT m FROM Alarm m WHERE m.likeId.likeId = :delLikeId", Alarm.class)
                .setParameter("delLikeId",delLikeId)
                .getSingleResult();
            return alarm;
        } catch (NoResultException nre) {
            return temp;
        }

    }

    public List<Like> findAlarmLike(Long boardId) {
        //2단계 board_id를 통해 like테이블에서 LIKE 엔티티 형식의 리스트로 받는다.
        List<Like> likes = em.createQuery("SELECT m FROM Like m WHERE m.board.id = :boardId", Like.class)
                .setParameter("boardId",boardId)
                .getResultList();

        //수만큼 라이크 아이디 가 있을 건데 알람테이블에 존재 하는 것만 뽑자 이거야
        List<Like> likeList = new ArrayList<>();
        for(int i =0 ; i<likes.size() ;i++){
            int flag = isAlarm(likes.get(i).getLikeId());

            if(flag != 0) { //알람 테이블에 likeId 일치하는게 있을 때만 넣어줘
                likeList.add(likes.get(i));
            }
        }

        return likeList;
    }

    private int isAlarm(Long likeId) {

        List<Alarm> likes = em.createQuery("SELECT m FROM Alarm m WHERE m.likeId.likeId = :likeId", Alarm.class)
                .setParameter("likeId",likeId)
                .getResultList();
        return likes.size();
    }

    public List<Profile> findFollowee(Long profile_id) {  //내가 팔로우 하는 사람 검색 하는거 니까 wer 로 검색하고 목록 가져와서 wee 아이디로 findone 하자
        List<Profile> weelist = new ArrayList<>();

        List<Relation> followees = em.createQuery("SELECT m FROM Relation m WHERE m.followerId = :profileId", Relation.class)
                .setParameter("profileId",profile_id)
                .getResultList();

        for(int i =0 ; i<followees.size() ;i++){
            weelist.add(findOne(followees.get(i).getFolloweeId()));
        }
        return weelist;
    }

    public List<Profile> findFollower(Long profileId) {//나를 팔로우 하는 사람 검색 하는거 니까 wee 로 검색하고 목록 가져와서 wer 아이디로 findone 하자
        List<Profile> werlist = new ArrayList<>();

        List<Relation> followers = em.createQuery("SELECT m FROM Relation m WHERE m.followeeId = :profileId", Relation.class)
                .setParameter("profileId",profileId)
                .getResultList();

        for(int i =0 ; i<followers.size() ;i++){
            werlist.add(findOne(followers.get(i).getFollowerId()));
        }
        return werlist;
    }
}
