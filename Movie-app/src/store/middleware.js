
import actions from '../store/actions';

const _login = body => dispatch => {
  return loginMethod(body).then(res => {
    if (res?.token) {
      let info = jwt_decode(res.token);
      // console.log("test",info);
      dispatch(
        actions.loginUser({ token: res.token, user: info.payload }),
      );
      return true;
    } else {
      return {
        message: res?.message || 'An error occurred',
      };
    }
  });
};

const _signup = (body) => async (dispatch) => {
  return registerMethod(body).then(res => {
    if (res?.token) {
      let info = jwt_decode(res.token);
      // console.log("test",info);
      dispatch(
        actions.loginUser({ token: res.token, user: info.payload }),
      );
      return res;
    } else {
      return {
        message: res?.message || 'An error occurred',
      };
    }
  });
  // let res = await registerMethod(body);
  // return res;

}

const _updateProfile = (user_id, user) => async dispatch => {
  let res = await updateUserMethod(user_id, user);
  // console.log(res)
  if (res.success) {
    dispatch(actions.updateUser(user));
  }
  return res;
};



export default {
  ...actions,
  _login,
  _signup,
  _updateProfile,
};
