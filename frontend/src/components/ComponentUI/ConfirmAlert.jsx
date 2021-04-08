import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './ConfirmAlert.css';

class ConfirmAlert extends React.Component {
  // import 객체와   css, 그리고 submit을 가져다 쓰세요!
  submit = () => {
    confirmAlert({
      title: '제출하시겠습니까?',
      message: '정말 제출하시겠습니까?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes'),
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };

  render() {
    return (
      <div className="container">
        <button onClick={this.submit}>Confirm dialog</button>
      </div>
    );
  }
}
