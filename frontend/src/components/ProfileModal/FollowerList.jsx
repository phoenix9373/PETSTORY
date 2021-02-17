// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// // axios
// import axios from 'axios';

// // components
// import Follower from './Follower';

// function FollowerList() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [followers, setFollowers] = useState(null);
//   const [isFollowerModal, setFollowerModal] = useState(false);

//   const handleFollowerModal = () => {
//     setFollowerModal(!isFollowerModal);
//   };

//   useEffect(() => {
//     const fetchFollowers = async () => {
//       try {
//         setFollowers(null);
//         setError(null);
//         setLoading(true);
//         const profileId = localStorage.getItem('profileId');
//         const response = await axios.get(
//           `http://localhost:8080/profile/followers/${profileId}`,
//         );
//         // const response = await axios.get(
//         //   'https://jsonplaceholder.typicode.com/users', // `http://localhost:8080/profile/followers/${profile_id}` profile_id는 props에서 가져오기
//         // );
//         // setFollowers((response.data) => {
//         //   const followerList = response.data.map((follower) => {
//         //     const obj = { followerId, nickname };
//         //     return obj;
//         //   });
//         setFollowers(response.data); // 응답: memberId, nickname, image
//       } catch (e) {
//         setError(e);
//       }
//       setLoading(false);
//     };
//     fetchFollowers();
//   }, []);
//   if (loading) {
//     return <div>로딩중..</div>;
//   }
//   if (error) {
//     return <div>에러 발생</div>;
//   }
//   return (
//     <div>
//       <Modal
//         isOpen={isFollowerModal}
//         onRequestClose={handleFollowerModal}
//         style={{
//           content: {
//             top: '20%',
//             left: '30%',
//             right: '30%',
//             bottom: '20%',
//           },
//         }}
//       >
//         <ul>
//           {followers ? (
//             followers.map((follower) => (
//               <Follower key={follower.followerId} follower={follower} />
//             ))
//           ) : (
//             <h2>follower가 없습니다.</h2>
//           )}
//         </ul>
//         <button onClick={handleFollowerModal}>닫기</button>
//       </Modal>
//     </div>
//   );
// }

// export default FollowerList;

import React from 'react';

const FollowerList = () => <div>에러뜰까봐 일단 주석처리</div>;

export default FollowerList;
