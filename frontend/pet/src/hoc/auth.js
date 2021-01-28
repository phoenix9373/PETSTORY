<<<<<<< HEAD
// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { authUser } from '../_actions/userAction';

// export default function (Componet, option, adminRoute = null) {
//   // option
//   // null => 아무나 출입가능
//   // true => 로그인한 유저만 출입 가능
//   // false => 로그인한 유저는 출입 불가능
//   function AuthCheck(props) {
//     const dispatch = useDispatch();

//     // useEffect를 사용해서 초기 검증을 실행해준다
//     useEffect(() => {
//       dispatch(authUser()).then((res) => {
//         console.log('훅 테스트', res);
//         // // 로그인을 하지 않았을때
//         // if (!res.payload.isAuth) {
//         //   if (option) {
//         //     // option이 true일때 로그인으로 강제 이동
//         //     props.history.push('/login');
//         //   }
//         // } else {
//         //   // 로그인을 했을때
//         //   // 관리자인 경우
//         //   if (adminRoute && res.payload.isAdmin) {
//         //     // 관리자 페이지로 이동
//         //     props.history.push('/login');
//         //   } else {
//         //     // 관리자가 아닌 경우
//         //     // option이 false일때 LandingPage로 이동
//         //     console.log('test');
//         //     if (!option) {
//         //       props.history.push('/');
//         //     }
//         //   }
//         // }
//       });
//     }, []);

//     return <Componet />;
//   }

//   return AuthCheck;
// }
=======
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from '../_actions/userAction';

export default function (Componet, option, adminRoute = null) {
  // option
  // null => 아무나 출입가능
  // true => 로그인한 유저만 출입 가능
  // false => 로그인한 유저는 출입 불가능
  function AuthCheck(props) {
    const dispatch = useDispatch();

    // useEffect를 사용해서 초기 검증을 실행해준다
    useEffect(() => {
      dispatch(authUser()).then((res) => {
        console.log('훅 테스트', res);
        // // 로그인을 하지 않았을때
        // if (!res.payload.isAuth) {
        //   if (option) {
        //     // option이 true일때 로그인으로 강제 이동
        //     props.history.push('/login');
        //   }
        // } else {
        //   // 로그인을 했을때
        //   // 관리자인 경우
        //   if (adminRoute && res.payload.isAdmin) {
        //     // 관리자 페이지로 이동
        //     props.history.push('/login');
        //   } else {
        //     // 관리자가 아닌 경우
        //     // option이 false일때 LandingPage로 이동
        //     console.log('test');
        //     if (!option) {
        //       props.history.push('/');
        //     }
        //   }
        // }
      });
    }, []);

    return <Componet />;
  }

  return AuthCheck;
}
>>>>>>> 8455288 (S04P12B204-119 [feat]: FE - 새글생생성 NAV에 추가)
