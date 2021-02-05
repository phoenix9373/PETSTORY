import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, success: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case LOGOUT_USER:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}

// /* eslint-disable no-confusing-arrow */
// import { userConstants } from '../_actions/types';

// export function users(state = {}, action) {
//   switch (action.type) {
//     case userConstants.GETALL_REQUEST:
//       return {
//         loading: true,
//       };
//     case userConstants.GETALL_SUCCESS:
//       return {
//         items: action.users,
//       };
//     case userConstants.GETALL_FAILURE:
//       return {
//         error: action.error,
//       };
//     case userConstants.DELETE_REQUEST:
//       // add 'deleting:true' property to user being deleted
//       return {
//         ...state,
//         items: state.items.map((user) =>
//           user.id === action.id ? { ...user, deleting: true } : { ...user },
//         ),
//       };
//     case userConstants.DELETE_SUCCESS:
//       // remove deleted user from state
//       return {
//         items: state.items.filter((user) => user.id !== action.id),
//       };
//     case userConstants.DELETE_FAILURE:
//       // remove 'deleting:true' property and add 'deleteError:[error]' property to user
//       return {
//         ...state,
//         items: state.items.map((user) => {
//           if (user.id === action.id) {
//             // make copy of user without 'deleting:true' property
//             const { deleting, ...userCopy } = user;
//             // return copy of user with 'deleteError:[error]' property
//             return { ...userCopy, deleteError: action.error };
//           }

//           return user;
//         }),
//       };
//     default:
//       return state;
//   }
// }
