package com.ssafy.petstory.repository;

import com.ssafy.petstory.domain.*;
import com.ssafy.petstory.dto.AlarmClickDto;
import com.ssafy.petstory.dto.ReadMultiProfileResponse;
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
        System.out.println("+++++++++++++여기서 문제발생");
        em.persist(profile);
        System.out.println("프로필 테이블 저장 후 아이디 확인"+ profile.getId());
    }

    /**
     * 프로필 다중 조회
     */
    public List<ReadMultiProfileResponse> findByMemberId(Long id) {
        return em.createQuery(
                "select new com.ssafy.petstory.dto.ReadMultiProfileResponse(p.id, p.nickname, p.state, p.rank, p.image.imgFullPath)" +
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

    public int findlike(Long p_id,Long b_id){  //엔티티 사이즈로 리턴

            List<Like> likes = em.createQuery("SELECT m FROM Like m WHERE m.board.id = :board_id AND m.profileId = :profile_id", Like.class)
                    .setParameter("board_id",b_id)
                    .setParameter("profile_id",p_id)
                    .getResultList();

            return likes.size();
    }

    public void savelike(Like like) {
        em.persist(like);
    }

    public void dellike(Like like) {
        System.out.println("왜 삭제가 안되냐구1");
        em.remove(like);
    }


    public void save_relation(Relation relation) {
        em.persist(relation);
    }

    public void savealarm(Like like) {
        Alarm alarm = new Alarm();
        alarm.setLikeId(like); //매핑
        em.persist(alarm);
    }

    public void delalarm(Like dellike) {
        Alarm alarm = new Alarm();
        alarm.setLikeId(dellike); //매핑

        em.remove(alarm);
    }

    public int likecount(Long profile_id) {
        List<Like> likes = em.createQuery("SELECT m FROM Like m WHERE m.board.profile.id = :board_id", Like.class)
                .setParameter("board_id",profile_id)
                .getResultList();

        List<Alarm> alarms = em.createQuery("select  a from Alarm  a where a.likeId in :like_ids", Alarm.class)
                .setParameter("like_ids",likes)
                .getResultList();

        return alarms.size();
    }

    public List<Long> findAlarmBoard(Long profile_id) {
        List<Board> boards = em.createQuery("SELECT m FROM Board m WHERE m.profile.id = :profile_id", Board.class)
                .setParameter("profile_id",profile_id)
                .getResultList();

        List<Long> board_id = new ArrayList<>();

        for(int i =0;i<boards.size();i++){
            board_id.add(boards.get(i).getId());
        }

        return board_id;
    }
    public void delalarm2(Like dellike) {
        Alarm alarm = findDelAlarm(dellike.getLikeId());
//        alarm.setLikeId(dellike); //매핑
//        alarm.setAlarmId(dellike.getAlarm().getAlarmId());
        em.remove(alarm);
    }

    public Alarm findDelAlarm(Long del_like_id){
        Alarm temp = new Alarm();
        try {
        Alarm alarm = em.createQuery("SELECT m FROM Alarm m WHERE m.likeId.likeId = :del_like_id", Alarm.class)
                .setParameter("del_like_id",del_like_id)
                .getSingleResult();
            return alarm;
        } catch (NoResultException nre) {
            return temp;
        }

    }

    public List<Like> findAlarmLike(Long board_id) {
        //2단계 board_id를 통해 like테이블에서 LIKE 엔티티 형식의 리스트로 받는다.
        List<Like> likes = em.createQuery("SELECT m FROM Like m WHERE m.board.id = :board_id", Like.class)
                .setParameter("board_id",board_id)
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

        List<Relation> followees = em.createQuery("SELECT m FROM Relation m WHERE m.follower_id = :profile_id", Relation.class)
                .setParameter("profile_id",profile_id)
                .getResultList();

        for(int i =0 ; i<followees.size() ;i++){
            weelist.add(findOne(followees.get(i).getFollowee_id()));
        }
        return weelist;
    }

    public List<Profile> findFollower(Long profile_id) {//나를 팔로우 하는 사람 검색 하는거 니까 wee 로 검색하고 목록 가져와서 wer 아이디로 findone 하자
        List<Profile> werlist = new ArrayList<>();

        List<Relation> followers = em.createQuery("SELECT m FROM Relation m WHERE m.followee_id = :profile_id", Relation.class)
                .setParameter("profile_id",profile_id)
                .getResultList();

        for(int i =0 ; i<followers.size() ;i++){
            werlist.add(findOne(followers.get(i).getFollower_id()));
        }
        return werlist;
    }
}
