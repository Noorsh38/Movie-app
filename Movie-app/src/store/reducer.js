import ACTION_TYPES from './actionTypes';

const initialState = {
  user: null,
  token: '',
  logged: false,
  movie: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.LOGIN: {
      // console.log("payloaaad",payload)
      return {
        ...state,
        logged: true,
        user: payload,
      };
    }
    case ACTION_TYPES.SET_TOKEN: {
      return {
        ...state,
        token: payload,
      };
    }
    case ACTION_TYPES.SET_LOGGED: {
      return {
        ...state,
        logged: false,
      };
    }case ACTION_TYPES.SET_MOVIE: {
      return {
        ...state,
        movie: payload,
      };
    }
    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        user: null,
        logged: false
      };
    }
    case ACTION_TYPES.DELETE_USER: {
      return {
        ...state,
        user: null,
        token: null,
      };
    }
    case ACTION_TYPES.UPDATE_USER_PROFILE: {
      return {
        ...state,
        user: payload,
      };
    }
    default:
      return state;
  }
};
