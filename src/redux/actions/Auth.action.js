/* eslint-disable prettier/prettier */
import AUTH from '../constants/Auth.constant';
import {
  handleError,
  handleSuccess,
  post,
  get,
  patch,
} from '../../utils/methods';
import {TOKEN, USERLOGIN} from '../../utils/asyncStorage/Constants';
import {useNavigation} from '@react-navigation/native';

import {
  _setDataToAsyncStorage,
  getTokenAndSetIntoHeaders,
  getValueIntoAsyncStorage,
  getValueIntoLocalStorage,
  removeUserDetail,
  _setDataObjectToAsyncStorage,
} from '../../utils/asyncStorage/Functions';
import {
  FORGOTPASSWORD,
  GOOGLELOGIN,
  LOGIN,
  MANAGERREGISTER,
  OTPVERIFY,
  REGISTER,
  SENDFILEMESSAGE,
  UPDATECOMPANYPROFILE,
  UPDATEPROFILE,
} from '../../config/webservices';

export const login = (payload, CB) => async dispatch => {
  

  // dispatch({ type: AUTH.LOGIN_USER_API, loading: false,});

  dispatch({type: AUTH.LOGIN_USER_API, loading: true});

  try {
    let response = await post(LOGIN, payload);
  
    if (response?.data?.error) {
      dispatch({type: AUTH.LOGIN_USER_API, loading: false});
      handleError(response?.data?.message || '');
    } else {
      await _setDataObjectToAsyncStorage(USERLOGIN, response?.data?.user);
      await _setDataToAsyncStorage(TOKEN, response?.data?.token);
      await getTokenAndSetIntoHeaders(response?.data?.token);
      dispatch({
        type: AUTH.LOGIN_USER_API,
        loading: false,
        user: response?.data?.user,
        isLoggedIn: true,
      });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.table('🚀 ~ file: Auth.action.js ~ line 42 ~ login ~ error', error);

    handleError(error?.data?.message, {autoHide: false});
    dispatch({type: AUTH.LOGIN_USER_API, loading: false});
  }
};



export const Googlelogin = (payload, CB) => async dispatch => {
  

  // dispatch({ type: AUTH.LOGIN_USER_API, loading: false,});

  dispatch({type: AUTH.LOGIN_USER_API, loading: true});

  try {
    let response = await post(GOOGLELOGIN, payload);
  
    if (response?.data?.error) {
      dispatch({type: AUTH.LOGIN_USER_API, loading: false});
      handleError(response?.data?.message || '');
    } else {
      await _setDataObjectToAsyncStorage(USERLOGIN, response?.data?.user);
      await _setDataToAsyncStorage(TOKEN, response?.data?.token);
      await getTokenAndSetIntoHeaders(response?.data?.token);
      dispatch({
        type: AUTH.LOGIN_USER_API,
        loading: false,
        user: response?.data?.user,
        isLoggedIn: true,
      });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.table('🚀 ~ file: Auth.action.js ~ line 42 ~ login ~ error', error);

    handleError(error?.data?.message, {autoHide: false});
    dispatch({type: AUTH.LOGIN_USER_API, loading: false});
  }
};

export const registerOwner = (payload, CB) => async dispatch => {
 
  dispatch({type: AUTH.REGISTER_OWNER_API, loading: true});

  try {
    let response = await post(REGISTER, payload);
  

    if (response?.data?.error) {
      dispatch({
        type: AUTH.REGISTER_OWNER_API,
        loading: false,
        role: payload?.role,
      });
      // handleError(error?.data?.message, {autoHide: false});
      handleError(response?.data?.message || '');
    } else {
      dispatch({
        type: AUTH.REGISTER_OWNER_API,
        loading: false,
      });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    
    handleError(error?.data?.message, {autoHide: false});
    dispatch({type: AUTH.REGISTER_OWNER_API, loading: false});
  }
};

export const registerManager = (payload, CB) => async dispatch => {
  console.log(JSON.stringify(payload))

  dispatch({type: AUTH.REGISTER_OWNER_API, loading: true});

  try {
    let response = await patch(MANAGERREGISTER, payload);
   

    if (response?.data?.error) {
      dispatch({
        type: AUTH.REGISTER_OWNER_API,
        loading: false,
        role: payload?.role,
      });
      handleError(response?.data?.message || '');
    } else {
      dispatch({
        type: AUTH.REGISTER_OWNER_API,
        loading: false,
      });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    
    handleError(error?.data?.message, {autoHide: false});
    dispatch({type: AUTH.REGISTER_OWNER_API, loading: false});
  }
};

export const verifyOTP = (payload, CB) => async dispatch => {
  dispatch({type: AUTH.VERIFY_OWNER_API, loading: true});

  try {
    let response = await post(OTPVERIFY, payload);
   
    if (response?.data?.error) {
      dispatch({type: AUTH.VERIFY_OWNER_API, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      await _setDataToAsyncStorage(TOKEN, response?.data?.token);
      await getTokenAndSetIntoHeaders(response?.data?.token);
      dispatch({
        type: AUTH.VERIFY_OWNER_API,
        loading: false,
        user: response?.data?.data?.user,
        // role: payload?.role,

        // isLoggedIn: true,
      });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.table('🚀 ~ file: Auth.action.js ~ line 42 ~ login ~ error', error);

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: AUTH.VERIFY_OWNER_API, loading: false});
  }
};

export const updateUserProfile = (payload, CB) => async dispatch => {
 
  // const token = await getValueIntoAsyncStorage(TOKEN);
  // getTokenAndSetIntoHeaders(token);
  // dispatch({type: AUTH.UPDATE_USERPROFILE_API, loading: true});
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await patch(UPDATEPROFILE, payload, config);
 

    if (response?.data?.error) {
      dispatch({type: AUTH.UPDATE_USERPROFILE_API, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: AUTH.UPDATE_USERPROFILE_API,
        loading: false,
        user: response?.data?.data?.user,
      });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
   

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: AUTH.UPDATE_USERPROFILE_API, loading: false});
  }
};


export const updateCompnayProfile = (payload, CB) => async dispatch => {

  const token = await getValueIntoAsyncStorage(TOKEN);
  getTokenAndSetIntoHeaders(token);
  dispatch({type: AUTH.UPDATE_CPROFILE_API, loading: true});
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await patch(UPDATECOMPANYPROFILE, payload, config);
   

    if (response?.data?.error) {
      dispatch({type: AUTH.UPDATE_CPROFILE_API, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: AUTH.UPDATE_CPROFILE_API,
        loading: false,
        user: response?.data?.data?.user,
        // isLoggedIn: true,
      });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
  

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: AUTH.UPDATE_CPROFILE_API, loading: false});
  }
};

export const forgotPass = (payload, CB) => async dispatch => {
  dispatch({type: AUTH.FORGOT_PASS, loading: true});

  try {
    let response = await post(FORGOTPASSWORD, payload);
  
    if (response?.data?.error) {
      dispatch({type: AUTH.FORGOT_PASS, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: AUTH.FORGOT_PASS,
        loading: false,
      });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.table('🚀 ~ file: Auth.action.js ~ line 42 ~ login ~ error', error);

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: AUTH.FORGOT_PASS, loading: false});
  }
};

export const userLogout =
  (showToast = true, type, message = 'Successfully logout!') =>
  async dispatch => {
    // if(showToast) {
    //     if(type === 'expire') {
    //         handleError(message);
    //     } else {
    //         // handleSuccess(message);
    //     }
    // }
    await removeUserDetail();
    dispatch({type: AUTH.LOGOUT_USER_API, isLoggedIn: false});
  
  };

export const newSpace = () => async => dispatch => {
  dispatch({type: 'ALLSPACE', loading: true});
};
