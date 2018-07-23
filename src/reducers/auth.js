import { LOG_IN, LOGGED_IN } from '../actions/auth';

export const auth = (state = authInitialState, action) => {
    const { payload } = action;
    switch (action.type) {
      case LOGGED_IN:
        return {
          isLoggedIn: true
        }
      case LOG_IN:
        return {
          currentUser: {
            username: payload.username,
            uid: payload.uid,
            firstName: payload.firstName,
            lastName: payload.lastName
          },
          isLoggedIn: state.isLoggedIn
        }
      default:
        return state
    }
  };

const authInitialState = {
  currentUser: {
    username: "",
    uid: "",
    firstName: "",
    lastName: "",
  },
  isLoggedIn: false
};

export default auth;