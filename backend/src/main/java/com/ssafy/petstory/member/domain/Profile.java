package com.ssafy.petstory.member.domain;

import com.ssafy.petstory.board.domain.Board;
import com.ssafy.petstory.file.domain.Image;
import com.ssafy.petstory.member.dto.ProfileForm;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profiles")
@Getter
@Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)  // protected 생성자 생성
//항상 null이 아니길 기대하지만 null이 들어가면 엔티티 안전성이 떨어짐
public class Profile {

//    @Builder  //엔티티 접근 안정성을 위해 @Builder로 접근
//    public Profile(Long profile_id, String nickname, String rank, int follwer_num, int follwee_num, ProfileState profile_state,int member_id, int relation_id){
//        this.id= profile_id;
//        this.nickname=nickname;
//        this.rank=rank;
//        this.follwer_num=follwer_num;
//        this.follwee_num=follwee_num;
//        this.state= profile_state;
//        this.member= Member(member_id);
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id; // pk

    private String nickname;
    @Column(name = "\"rank\"")
    private String rank;

    @Column(name = "profile_state")
    @Enumerated(EnumType.STRING)  //db에 저장되는 값 숫자로 , 받는건 String 으로
    private ProfileState state;

    // Profile과 Image는 일대일 관계
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;

    // Member와 Profile은 일대다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // Profile과 Board는 일대다 관계
    // 영속성 전이(cascade)란 쉽게 말해 부모 엔티티가 영속화될때, 자식 엔티티도 같이 영속화되고 부모 엔티티가 삭제 될때, 자식 엔티티도 삭제되는 등 부모의 영속성 상태가 전이되는 것을 이야기한다.
    @OneToMany(mappedBy = "profile", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();

    @Column(name = "follower_num")
    private int followerNum;
    @Column(name = "followee_num")
    private int followeeNum;

    /**
     * Member와 Profile 연관 관계 (편의) 메서드
     * -> 위치는 핵심적으로 Controll 하는 쪽이 들고 있는 게 좋음
     */
    public void setMember(Member member) { // 아래 주석친 메인 코드의 기능을 하는 메서드
        this.member = member;
        member.getProfiles().add(this);
    }

//    public static void main(String[] args) {
//        Member member = new Member();
//        Profile profile = new Profile();
//
//        member.getProfiles().add(profile);
//        profile.setMember(member);
//    }

    /**
     * 릴레이션 프로필하고 연결 필요없다고 판단 02/06
     */

//    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    // 1:1 관계는 foreign key를 아무데나 넣어도 됨 (주로 access가 많은 곳에 둠)
//    // -> Profile에 relation_id(FK)를 둠
//    @JoinColumn(name = "relation_id")
//    // -> 연관관계 주인을 FK와 가까운 Profile Class에 있는 Relation로 잡음
//    private Relation relation;

//    /**
//     * Profile과 Relation 양방향 연관 관계 편의 메소드
//     */
//    public void setRelation(Relation relation) {
//        this.relation = relation;
//        relation.setProfile(this);
//    }
    /**
     * Profile과 Image 연관 관계 편의 메소드
     */
    public void setImage(Image image) {
        this.image = image;
        image.setProfile(this);
    }
    /**
     * 프로필 생성 메소드
     */

//    public static Profile createProfile(Member member, ProfileForm form,Relation relation){
    public static Profile createProfile(Member member, ProfileForm form){
        Profile profile = new Profile();

        //엔티티로 바꾼다음 서비스로 리턴 -> Repository에서 최종 프로필 생성
        //Member m1 = profile.setMember(member);

        profile.setMember(member); //프로필 엔티티의 맴버 -> 맴버 아이디로 찾아온 맴버
        profile.setNickname(form.getNickname());
        profile.setRank(form.getRank());
        profile.setFolloweeNum(form.getFolloweeNum());
        profile.setFollowerNum(form.getFollowerNum());
        profile.setState(form.getProfileState());
        //profile.setRelation(relation);

        System.out.println("프로필 엔티티에 저장 완료 후 닉네임 확인: "+profile.getNickname());
        return profile;
    }

}
