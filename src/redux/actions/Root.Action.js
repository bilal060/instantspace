import ROOT from '../constants/Root.constant';
import AuthConstant from '../constants/Auth.constant';
import {
  handleError,
  handleSuccess,
  post,
  get,
  patch,
} from '../../utils/methods';
import {TOKEN} from '../../utils/asyncStorage/Constants';
import {useNavigation} from '@react-navigation/native';

import {
  _setDataToAsyncStorage,
  getTokenAndSetIntoHeaders,
  getValueIntoAsyncStorage,
  getValueIntoLocalStorage,
  removeUserDetail,
} from '../../utils/asyncStorage/Functions';
import {
  ADDCARDS,
  ADDMEWSPACE,
  ADDSPACE,
  ADDVEHICLE,
  ALLBOOKING,
  CONVERSATIONMESSAGE,
  CREATEBOOKING,
  FILTERBOOKING,
  FILTERMANAGERS,
  FORGOTPASSWORD,
  GETALLCATEGORIES,
  GETALLSPACES,
  GETCARDS,
  GETCATEGORIES,
  GETCONVERSATION,
  GETSPACESBYCATORGY,
  GETUSERALLSPACES,
  GETUSERSPACES,
  GETVEHICLES,
  INVITEMANAGER,
  LOGIN,
  OTPVERIFY,
  OWNERBOOKING,
  OWNERMANAGERS,
  REGISTER,
  SENDMESSAGE,
  UPDATEPROFILE,
  ADDNEWAREHOUSESPACE,
  GETWAREHOUSEBYCATORGY,
} from '../../config/webservices';

export const getAllSpaces = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.GET_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETALLSPACES);
    console.log(
      '🚀 ~ file: Auth.action.js:56 ~ registerOwner ~ response:',
      response?.data,
    );
    if (response?.data?.error) {
      dispatch({type: ROOT.GET_SPACES, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.GET_SPACES,
      //   loading: false,
      //   allSpace: response?.data?.spaces,
      // });
      // handleSuccess(response?.data?.message);
      dispatch({type: ROOT.GET_SPACES, loading: false});
      CB && CB(response?.data?.spaces);
    }
  } catch (error) {
    console.log('🚀 ~ file: Root.A  AllSpaces ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_SPACES, loading: false});
  }
};

export const getSpacesByCategory = (payload, CB) => async dispatch => {
  console.log(
    '🚀 ~ file: Root.Action.js:80 ~ getSpacesByCategory ~ payload:',
    payload,
  );
  dispatch({type: ROOT.GET_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETSPACESBYCATORGY(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:84 ~ getSpacesByCategory ~ response:',
      response?.data?.subcatSpaces,
    );

    if (response?.data?.error) {
      dispatch({type: ROOT.GET_SPACES, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: ROOT.GET_SPACES,
        loading: false,
        allSpace: response?.data?.spaces,
      });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data?.subcatSpaces);
  } catch (error) {
    console.log('🚀 ~ file: Root.A  AllSpaces ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_SPACES, loading: false});
  }
};

export const getwarehouseByCategory = (payload, CB) => async dispatch => {
  console.log(
    '🚀 ~ file: Root.Action.js:80 ~ getSpacesByCategory ~ payload:',
    payload,
  );
  dispatch({type: ROOT.GET_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETWAREHOUSEBYCATORGY(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:84 ~ getSpacesByCategory ~ response:',
      response?.data,
    );

    if (response?.data?.error) {
      console.log(response?.data?.error);
      dispatch({type: ROOT.GET_SPACES, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: ROOT.GET_SPACES,
        loading: false,
        allSpace: response?.data?.spaces,
      });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data?.subcatWarehouses);
  } catch (error) {
    console.log('🚀 ~ file: Root.A  AllSpaces ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_SPACES, loading: false});
  }
};

export const getuserSpaces = (payload, CB) => async dispatch => {
  dispatch({type: AuthConstant.GETSP, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETUSERSPACES(payload));
    console.log(
      '🚀 ~ file: Auth.action.js:56 ~ registerOwner ~ response:',
      response?.data,
    );
    if (response?.data?.error) {
      dispatch({type: AuthConstant.GETSP, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: AuthConstant.GETSP,
        loading: false,
        data: response?.data?.spaces,
      });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.A  AllSpaces ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: AuthConstant.GETSP, loading: false});
  }
};

export const getAllUserSpaces = (payload, CB) => async dispatch => {
  console.log(
    '🚀 ~ file: Root.Action.js:63 ~ getAllUserSpaces ~ payload:',
    payload,
  );
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  // dispatch({type: ROOT.GET_SPACES, loading: true});

  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETUSERALLSPACES(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:67 ~ getAllUserSpaces ~ response:',
      response?.data,
    );

    if (response?.data?.error) {
      // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.GET_USER_SPACES,
      //   loading: false,
      //   userSpace: response?.data?.spaces,
      // });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:82 ~ getAllUserSpaces ~ error:',
      error,
    );

    // handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
  }
};

export const createBooking = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.CREATE_BOOKING, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await post(CREATEBOOKING, payload);
    console.log(
      '🚀 ~ file: Root.Action.js:148 ~ createBooking ~ response:',
      response,
    );

    if (response?.data?.error) {
      dispatch({type: ROOT.CREATE_BOOKING, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: ROOT.CREATE_BOOKING,
        loading: false,
      });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:77 ~ createBooking ~ error:', error);

    handleError(error?.data?.message, {autoHide: false});
    dispatch({type: ROOT.CREATE_BOOKING, loading: false});
  }
};

export const add_vehicle = (payload, CB) => async dispatch => {
  // console.log("🚀 ~ file: Root.Action.js:85 ~ payload:", payload)
  // dispatch({type: ROOT.ADD_VEHICLE, loading: true});
  //  await  getTokenAndSetIntoHeaders()
  // try {
  //   let response = await post(ADDVEHICLE, payload);
  //   if (response?.data?.error) {
  //     dispatch({type: ROOT.ADD_VEHICLE, loading: false});
  //     handleError(response?.data?.data?.message || '');
  //   } else {
  //     dispatch({
  //       type: ROOT.ADD_VEHICLE,
  //       loading: false,
  //     });
  //     handleSuccess(response?.data?.message);
  //   }
  //   CB && CB(response?.data);
  // } catch (error) {
  // console.log("🚀 ~ file: Root.Action.js:77 ~ createBooking ~ error:", error)
  //   handleError(error?.data?.error, {autoHide: false});
  //   dispatch({type: ROOT.ADD_VEHICLE, loading: false});
  // }
};

export const add_managers = (payload, CB) => async dispatch => {
  console.log('🚀 ~ file: Root.Action.js:85 ~ payload:', payload);
  await getTokenAndSetIntoHeaders();
  try {
    let response = await post(INVITEMANAGER, payload);
    console.log('🚀 ~ file: Root.Action.js:182 ~ response:', response);

    if (response?.data?.error) {
      // dispatch({type: ROOT.ADD_MANAGER, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.ADD_MANAGER,
      //   loading: false,
      // });
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:196 ~ error:', error);

    handleError(error?.data?.message, {autoHide: false});
    // dispatch({type: ROOT.ADD_MANAGER, loading: false});
  }
};

export const getUserConversations = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.USER_CONVERSATIONS, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETCONVERSATION(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:117 ~ getUserConversations ~ response:',
      response?.data,
    );

    if (response?.data?.error) {
      dispatch({type: ROOT.USER_CONVERSATIONS, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: ROOT.USER_CONVERSATIONS,
        loading: false,
        data: response?.data?.userConversations,
      });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:77error:', error);

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: ROOT.USER_CONVERSATIONS, loading: false});
  }
};

export const getConversationMessages = (payload, CB) => async dispatch => {
  console.log(
    '🚀 ~ file: Root.Action.js:141 ~ getConversationMessages ~ payload:',
    payload,
  );
  dispatch({type: ROOT.CONVERSATION_MESSAGES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(CONVERSATIONMESSAGE(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:145 ~ getConversationMessages ~ response:',
      response?.data?.messages,
    );

    if (response?.data?.error) {
      dispatch({type: ROOT.CONVERSATION_MESSAGES, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: ROOT.CONVERSATION_MESSAGES,
        loading: false,
        data: response?.data?.messages,
      });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:',
      error,
    );

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: ROOT.CONVERSATION_MESSAGES, loading: false});
  }
};
// export const getAllBooking = (payload, CB) => async dispatch => {
//   dispatch({type: ROOT.GET_ALL_BOOKING, loading: true});
//    await  getTokenAndSetIntoHeaders()
//   try {
//     let response = await get(ALLBOOKING(payload));
//     console.log("🚀 ~ file: Root.Action.js:174 ~ getAllBooking ~ response:", response?.data)

//     if (response?.data?.error) {
//       dispatch({type: ROOT.GET_ALL_BOOKING, loading: false});
//       handleError(response?.data?.data?.message || '');
//     } else {
//       dispatch({
//         type: ROOT.GET_ALL_BOOKING,
//         loading: false,
//         data:response?.data?.userBookings
//       });
//       // handleSuccess(response?.data?.message);
//     }
//     CB && CB(response?.data);
//   } catch (error) {
//   console.log("🚀 ~ file: Root.Action.js:189 ~ getAllBooking ~ error:", error)

//     handleError(error?.data?.error, {autoHide: false});
//     dispatch({type: ROOT.GET_ALL_BOOKING, loading: false});
//   }
// };

export const getAllBooking = (payload, CB) => async dispatch => {
  // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: true });
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(ALLBOOKING(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:174 ~ getAllBooking ~ response:',
      response?.data,
    );

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.GET_ALL_BOOKING,
      //   loading: false,
      //   data: response?.data?.userBookings,
      // });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:189 ~ getAllBooking ~ error:',
      error,
    );
    handleError(error?.data?.error, {autoHide: false});
  } finally {
    // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: false });
  }
};

export const getSpacsss = (payload, CB) => async dispatch => {
  console.log(
    '🚀 ~ file: Root.Action.js:141 ~ getConversationMessages ~ payload:',
    payload,
  );
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETUSERSPACES(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:145 ~ getConversationMessages ~ response:',
      response?.data,
    );

    if (response?.data?.error) {
      // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   // type: ROOT.GET_USER_SPACES,
      //   loading: false,
      //   data: response?.data?.messages,
      // });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data?.spaces);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:',
      error,
    );

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
  }
};

export const get_ownerBooking = (payload, CB) => async dispatch => {
  console.log(
    '🚀 ~ file: Root.Action.js:141 ~ getConversationMessages ~ payload:',
    payload,
  );
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(OWNERBOOKING(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:145 ~ getConversationMessages ~ response:',
      response?.data,
    );

    if (response?.data?.error) {
      // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.GET_USER_SPACES,
      //   loading: false,
      //   data:response?.data?.messages
      // });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:',
      error,
    );

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
  }
};

export const get_ownerManager = (payload, CB) => async dispatch => {
  console.log(
    '🚀 ~ file: Root.Action.js:141 ~ getConversationMessages ~ payload:',
    payload,
  );
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(OWNERMANAGERS(payload));
    console.log(
      '🚀 ~ file: Root.Action.js:145 ~ getConversationMessages ~ response:',
      response?.data,
    );

    if (response?.data?.error) {
      // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
      handleError(response?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.GET_USER_SPACES,
      //   loading: false,
      //   data:response?.data?.messages
      // });
      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:',
      error,
    );

    handleError(error?.data?.message, {autoHide: false});
    // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
  }
};
export const filter_ownerManager = (payload, CB) => async dispatch => {
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  const {id, spaceId} = payload;
  try {
    let response = await get(FILTERMANAGERS(id, spaceId));
    console.log('🚀 ~ file: Root.Action.js:454 ~ response:', response);

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:',
      error,
    );

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const filter_ownerBooking = (payload, CB) => async dispatch => {
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  const {id, spaceId} = payload;
  try {
    let response = await get(FILTERBOOKING(id, spaceId));
    console.log('🚀 ~ file: Root.Action.js:454 ~ response:', response);

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:',
      error,
    );

    handleError(error?.data?.error, {autoHide: false});
  }
};
export const get_spaceCategory = (payload, CB) => async dispatch => {
  console.log('🚀 ~ file: Root.Action.js:502 ~ payload:', payload);

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETCATEGORIES(payload));

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:',
      error,
    );

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const add_newSpace = (payload, CB) => async dispatch => {
  console.log('🚀 ~ file: Root.Action.js:502 ~ payload:', payload);
  const token = await getValueIntoAsyncStorage(TOKEN);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await post(ADDMEWSPACE, payload, config);
    console.log('🚀 ~ file: Root.Action.js:535 ~ response:', response);

    if (response?.data?.error) {
      handleError(response?.data?.message || '');
    } else {
      console.log('');
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error?.data?.message);

    handleError(error?.data?.message, {autoHide: false});
  }
};

export const add_newWarehoue = (payload, CB) => async dispatch => {
  //Alert.alert('call');
  console.log('🚀 ~ file: Root.Action.js:502 ~ payload:', payload);
  // const token = await getValueIntoAsyncStorage(TOKEN);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  //console.log(ADDNEWAREHOUSESPACE);
  try {
    let response = await post(ADDNEWAREHOUSESPACE, payload, config);
    console.log('🚀 ~ file: Root.Action.js:535 ~ response:', response);

    if (response?.data?.error) {
      console.log('error 2');
      handleError(response?.data?.data?.message || '');
    } else {
      console.log('error 1');
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const get_CustomerCard = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.GET_CUSTOMER_CARDS, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await get(GETCARDS(payload));
    console.log('🚀 ~ file: Root.Action.js:535 ~ response:', response);

    if (response?.data?.error) {
      dispatch({type: ROOT.GET_CUSTOMER_CARDS, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
      dispatch({
        type: ROOT.GET_CUSTOMER_CARDS,
        loading: false,
        data: response?.data?.cards,
      });

      // handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const add_CustomerCard = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.ADD_CUSTOMER_CARDS, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await post(ADDCARDS, payload);
    console.log('🚀 ~ file: Root.Action.js:596 ~ response:', response?.data);

    if (response?.data?.error) {
      dispatch({type: ROOT.ADD_CUSTOMER_CARDS, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
      dispatch({
        type: ROOT.ADD_CUSTOMER_CARDS,
        loading: false,
        data: response?.data,
      });

      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const getAllVechiles = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.GET_VEHICLE, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await get(GETVEHICLES(payload));
    console.log('🚀 ~ file: Root.Action.js:596 ~ response:', response?.data);

    if (response?.data?.error) {
      dispatch({type: ROOT.GET_VEHICLE, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
      dispatch({
        type: ROOT.GET_VEHICLE,
        loading: false,
        data: response?.data,
      });
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const send_messages = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.SEND_MESSAGE, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await post(SENDMESSAGE, payload);
    console.log('🚀 ~ file: Root.Action.js:596 ~ response:', response?.data);

    if (response?.data?.error) {
      dispatch({type: ROOT.SEND_MESSAGE, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
      dispatch({
        type: ROOT.SEND_MESSAGE,
        loading: false,
        data: response.data.messages,
      });
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const get_all_category = (payload, CB) => async dispatch => {
  console.log('🚀 ~ file: Root.Action.js:679 ~ payload:', payload);
  // dispatch({type: ROOT.GET_ALL_CATEGORY, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await get(GETALLCATEGORIES);
    console.log('🚀 ~ file: Root.Action.js:684 ~ response:', response);

    if (response?.data?.error) {
      // dispatch({type: ROOT.GET_ALL_CATEGORY, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
      console.log('');
      // dispatch({
      //   type: ROOT.GET_ALL_CATEGORY,
      //   loading: false,
      //   data: response.data,
      // });
    }
    CB && CB(response?.data);
  } catch (error) {
    console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);
    // dispatch({type: ROOT.GET_ALL_CATEGORY, loading: false});

    handleError(error?.data?.error, {autoHide: false});
  }
};
