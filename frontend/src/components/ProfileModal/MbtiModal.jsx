import React, { Component } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
// css
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './MbtiModal.module.css';
// assets
import walkA from '../../assets/mbti/walkA.png';
import walkB from '../../assets/mbti/walkB.png';
import placeA from '../../assets/mbti/placeA.png';
import placeB from '../../assets/mbti/placeB.png';
import otherDogA from '../../assets/mbti/otherDogA.png';
import otherDogB from '../../assets/mbti/otherDogB.png';
import eduA from '../../assets/mbti/eduA.png';
import eduB from '../../assets/mbti/eduB.png';

class MbtiModal extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = { result: '' };
  }
  next(e) {
    this.slider.slickNext();
    const target = e.target;
    const value = target.value;
    this.setState({ result: this.state.result + value });
  }
  previous() {
    this.slider.slickPrev();
  }

  state = {
    slideIndex: 0,
    updateCount: 0,
  };

  // submitMbti = () => {
  //   this.onSubmit();
  // };

  // handleMbtiModal = () => {
  //   this.onClose();
  // };

  render() {
    const settings = {
      dots: false, // carousel 점 보여줄건지
      // fade: true, // 부드럽게 넘어가긴 하는데, 클릭시 자동으로 다음페이지ㄱ
      infinite: false, // 마지막 장 다음 첫번째 장 보여줄건지
      speed: 500, // 넘어가는 속도
      arrows: true,
      slidesToShow: 1, // 한 슬라이드에 몇 장 보여줄건지
      slidesToScroll: 1,
      initialSlide: 0,
      // afterChange: () => // slickGoTo 상단에 슬라이드 진행상황
      //   this.setState((state) => ({ updateCount: state.updateCount + 1 })),
      // beforeChange: (current, next) => this.setState({ slideIndex: next }),
    };
    const body = (
      <div className={styles.body}>
        {/* <p>진행 상황 {this.state.updateCount}</p> */}
        {/* <input
          onChange={(e) => this.slider.slickGoTo(e.target.value)}
          value={this.state.slideIndex}
          type="range"
          min={0}
          max={5}
        /> */}
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          <div className={styles.bigQuestionBox}>
            <h2>반려인과 산책할 때</h2>
            <div className={styles.smallQuestionBox}>
              <div className={styles.questionA}>
                <label>
                  <h3>나만 따라오라개!</h3>
                  <img className={styles.img} src={walkA} alt="산책이미지a" />
                  <p>하네스가 끊어져라 힘으로 끌고가는 댕댕이</p>
                  <input
                    type="checkbox"
                    value="E"
                    onChange={this.next}
                    style={{ display: 'none' }}
                  ></input>
                </label>
              </div>
              <label>
                <h3>알아서 모셔라</h3>
                <img className={styles.img} src={walkB} alt="산책이미지b" />
                <p>가끔은 안아야 하는 댕댕이</p>
                <input
                  type="checkbox"
                  value="Q"
                  onChange={this.next}
                  style={{ display: 'none' }}
                ></input>
              </label>
            </div>
          </div>
          <div>
            <h2>산책하다가 낯선 강아지와 만났을 때</h2>
            <div className={styles.smallQuestionBox}>
              <div className={styles.questionA}>
                <label>
                  <h3>인싸 기질 폭발</h3>
                  <img
                    className={styles.img}
                    src={otherDogA}
                    alt="낯선강아지a"
                  />
                  <p>반갑다 내 친구야~ 금방 친해지는 댕댕이</p>
                  <input
                    type="checkbox"
                    value="S"
                    onChange={this.next}
                    style={{ display: 'none' }}
                  ></input>
                </label>
              </div>
              <div className={styles.questionB}>
                <label>
                  <h3>몰라 뭐야 너 무서워</h3>
                  <img
                    className={styles.img}
                    src={otherDogB}
                    alt="낯선강아지b"
                  />
                  <p>반려인 뒤로 숨거나 나름 사납게 짖는 댕댕이</p>
                  <input
                    type="checkbox"
                    value="I"
                    onChange={this.next}
                    style={{ display: 'none' }}
                  ></input>
                </label>
              </div>
            </div>
          </div>
          <div>
            <h2>낯선 장소에 갔을 때</h2>
            <div className={styles.smallQuestionBox}>
              <label>
                <h3>나 지금 떨고있니?</h3>
                <img className={styles.img} src={placeA} alt="낯선장소a" />
                <p>핸드폰 진동마냥 덜덜덜 반려인만 찾는 댕댕이</p>
                <input
                  type="checkbox"
                  value="W"
                  onChange={this.next}
                  style={{ display: 'none' }}
                ></input>
              </label>
              <label>
                <h3>호기심 대마왕</h3>
                <img className={styles.img} src={placeB} alt="낯선장소b" />
                <p>궁금한게 넘 많아! 빨빨 돌아다니는 댕댕이</p>
                <input
                  type="checkbox"
                  value="A"
                  onChange={this.next}
                  style={{ display: 'none' }}
                ></input>
              </label>
            </div>
          </div>
          <div>
            <h2>교육할 때</h2>
            <div className={styles.smallQuestionBox}>
              <div className={styles.questionA}>
                <label>
                  <h3>동작그만, 밑장빼기냐</h3>
                  <img className={styles.img} src={eduA} alt="교육a" />
                  <p> 간식이 안보이면 꿈적도 안하는 댕댕이</p>
                  <input
                    type="checkbox"
                    value="C"
                    onChange={this.next}
                    style={{ display: 'none' }}
                  ></input>
                </label>
              </div>
              <div className={styles.questionB}>
                <label>
                  <h3>손은 손이고 발도 손이다</h3>
                  <img className={styles.img} src={eduB} alt="교육b" />
                  <p>간식 따위 필요없어! 달라면 다 주는 댕댕이</p>
                  <input
                    type="checkbox"
                    value="F"
                    onChange={this.next}
                    style={{ display: 'none' }}
                  ></input>
                </label>
              </div>
            </div>
          </div>
          <div>
            <h2>{this.state.result}형입니다.</h2>
            {/* <button onClick={this.submitMbti}>완료</button> */}
            <button onClick={this.props.onSubmit}>완료</button>
          </div>
        </Slider>
        <button className={styles.btn} onClick={this.props.onClose}>
          취소
        </button>
      </div>
    );

    return (
      <Modal
        className={styles.modal}
        overlayClassName={styles.overLay}
        isOpen={this.props.mbtiTest}
        onRequestClose={this.props.onClose}
      >
        {body}
      </Modal>
    );
  }
}
export default MbtiModal;
