import ACTION_TYPES from './actionTypes';

const loginUser = payload => ({ type: ACTION_TYPES.LOGIN, payload });
const logoutUser = () => ({ type: ACTION_TYPES.LOGOUT });
const deleteAccount = () => ({ type: ACTION_TYPES.DELETE_USER });
const updateUser = (payload) => ({ type: ACTION_TYPES.UPDATE_USER_PROFILE, payload });
const setMovie = (payload) => ({ type: ACTION_TYPES.SET_MOVIE, payload });


export default {
  loginUser,
  updateUser,
  logoutUser,
  deleteAccount,
  setMovie
};
