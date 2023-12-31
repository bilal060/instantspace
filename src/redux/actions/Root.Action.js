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
  DELETECARDS,
  ALLBOOKINGSTATUS,
  ALLBOOKINGUpcoming,
  BOOKINGUPDATE_STATUS,
  GETCONVERSATIONMESSAGE,
  GETEARNING,
  SENDFILEMESSAGE
} from '../../config/webservices';
import { Alert } from 'react-native';
import { userLogout } from './Auth.action';

export const getAllSpaces = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.GET_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETALLSPACES);
   
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
   

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_SPACES, loading: false});
  }
};

export const getSpacesByCategory = (payload, CB) => async dispatch => {
 
  dispatch({type: ROOT.GET_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETSPACESBYCATORGY(payload));
   

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
  

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_SPACES, loading: false});
  }
};

export const getwarehouseByCategory = (payload, CB) => async dispatch => {
 
  dispatch({type: ROOT.GET_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETWAREHOUSEBYCATORGY(payload));
  

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
    CB && CB(response?.data?.subcatWarehouses);
  } catch (error) {
 

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_SPACES, loading: false});
  }
};

export const getuserSpaces = (payload, CB) => async dispatch => {
  // dispatch({type: AuthConstant.GETSP, loading: true});
  // await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETUSERSPACES(payload));
   
    if (response?.data?.error) {
      // dispatch({type: AuthConstant.GETSP, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   type: AuthConstant.GETSP,
      //   loading: false,
      //   data: response?.data?.spaces,
      // });
      // console.log("success")
      // console.log(response?.data)
      CB && CB(response?.data?.spaces);
    }
   
  } catch (error) {
    console.log("kndhjshjdshjjhsdjhsjshhjeghdhsggh")
     console.log(error)
     handleError(error?.data?.message, {autoHide: false});
     dispatch({type: AuthConstant.GETSP, loading: false});
  }
};

export const getAllUserSpaces = (payload, CB) => async dispatch => {

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  // dispatch({type: ROOT.GET_SPACES, loading: true});

  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETUSERALLSPACES(payload));
   

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
  

    // handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
  }
};

export const createBooking = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.CREATE_BOOKING, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await post(CREATEBOOKING, payload);
    

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

  await getTokenAndSetIntoHeaders();
  try {
    let response = await post(INVITEMANAGER, payload);
    

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


    handleError(error?.data?.message, {autoHide: false});
    // dispatch({type: ROOT.ADD_MANAGER, loading: false});
  }
};

export const getUserConversations = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.USER_CONVERSATIONS, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    // let response = await get(GETCONVERSATION(payload));
 
    let response =  await post(GETCONVERSATION, payload);
    if (response?.data?.error) {
      dispatch({type: ROOT.USER_CONVERSATIONS, loading: false});
      handleError(response?.data?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.USER_CONVERSATIONS,
      //   loading: false,
      //   data: response?.data?.userConversations,
      
    }
    CB && CB(response?.data);
  } catch (error) {
  

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: ROOT.USER_CONVERSATIONS, loading: false});
  }
};

export const getUserConversationslist = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.USER_CONVERSATIONS, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    // let response = await get(GETCONVERSATION(payload));
 
    let response =  await get(GETCONVERSATIONMESSAGE(payload));
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
  

    handleError(error?.data?.error, {autoHide: false});
    dispatch({type: ROOT.USER_CONVERSATIONS, loading: false});
  }
};

export const getConversationMessages = (payload, CB) => async dispatch => {
 
  dispatch({type: ROOT.CONVERSATION_MESSAGES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(CONVERSATIONMESSAGE(payload));
   

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
  // await getTokenAndSetIntoHeaders();
  // console.log("jfdhdhdjhdjh");
  //  console.log(payload);
   
  try {
    let response = await get(ALLBOOKING(payload));
    // console.log(response)

    if (response?.data?.error) {
      console.log(response?.data)
      handleError(response?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.GET_ALL_BOOKING,
      //   loading: false,
      //   data: response?.data?.userBookings,
      // });
      // handleSuccess(response?.data?.message);
      // Alert.alert("success")
      CB && CB(response?.data);
    }
  
  } catch (error) {
   console.log(error.data)
    handleError(error?.data?.error, {autoHide: false});
  } finally {
    // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: false });
  }
};

export const getAllBookingStatus = (payload, CB) => async dispatch => {
  // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: true });
  // await getTokenAndSetIntoHeaders();
  // console.log("jfdhdhdjhdjh");
  //  console.log(payload);
   
  try {
    let response = await get(ALLBOOKINGSTATUS(payload));
    // console.log(response)

    if (response?.data?.error) {
      console.log(response?.data)
      handleError(response?.data?.message || '');
    } else {
      // dispatch({
      //   type: ROOT.GET_ALL_BOOKING,
      //   loading: false,
      //   data: response?.data?.userBookings,
      // });
      // handleSuccess(response?.data?.message);
      // Alert.alert("success")
      CB && CB(response?.data);
    }
  
  } catch (error) {
   console.log(error.data)
    handleError(error?.data?.error, {autoHide: false});
  } finally {
    // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: false });
  }
};

export const getAllBookingupcoming = (payload, CB) => async dispatch => {

   
  try {
    let response = await get(ALLBOOKINGUpcoming(payload));
  
    if (response?.data?.error) {
      console.log(response?.data)
      handleError(response?.data?.message || '');
    } else {
     
      CB && CB(response?.data);
    }
  
  } catch (error) {
   console.log(error.data)
    handleError(error?.data?.error, {autoHide: false});
  } finally {
    // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: false });
  }
};

export const getMonthlyEarning = (payload, CB) => async dispatch => {

   
  try {
    let response = await get(GETEARNING(payload));
  
    if (response?.data?.error) {
      console.log(response?.data)
      handleError(response?.data?.message || '');
    } else {
     
      CB && CB(response?.data);
    }
  
  } catch (error) {
   console.log(error.data)
    handleError(error?.data?.error, {autoHide: false});
  } finally {
    // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: false });
  }
};

export const changeBookingStatus = (payload, CB) => async dispatch => {
  //console.log(payload);
  //return;
   
  try {
    let response = await patch(BOOKINGUPDATE_STATUS(payload) , payload);
  
    if (response?.data?.error) {
      console.log(response?.data)
      handleError(response?.data?.message || '');
    } else {
     
      CB && CB(response?.data);
    }
  
  } catch (error) {
   console.log(error.data)
    handleError(error?.data?.error, {autoHide: false});
  } finally {
    // dispatch({ type: ROOT.GET_ALL_BOOKING, loading: false });
  }
};

export const getSpacsss = (payload, CB) => async dispatch => {

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETUSERSPACES(payload));
   

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
  

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
  }
};

export const get_ownerBooking = (payload, CB) => async dispatch => {


  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(OWNERBOOKING(payload));
  

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
 

    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: ROOT.GET_USER_SPACES, loading: false});
  }
};

export const get_ownerManager = (payload, CB) => async dispatch => {
 
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(OWNERMANAGERS(payload));
  

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
    // console.log('🚀 ~ file: Root.Action.js:454 ~ response:', response);

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      // console.log('');
    }
    CB && CB(response?.data);
  } catch (error) {
   

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const filter_ownerBooking = (payload, CB) => async dispatch => {
  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  const {id, spaceId} = payload;
  try {
    let response = await get(FILTERBOOKING(id, spaceId));
    

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      
    }
    CB && CB(response?.data);
  } catch (error) {
   

    handleError(error?.data?.error, {autoHide: false});
  }
};
export const get_spaceCategory = (payload, CB) => async dispatch => {
  

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  await getTokenAndSetIntoHeaders();
  try {
    let response = await get(GETCATEGORIES(payload));

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      
    }
    CB && CB(response?.data);
  } catch (error) {
   

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const add_newSpace = (payload, CB) => async dispatch => {
  
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
    

    if (response?.data?.error) {
      handleError(response?.data?.message || '');
    } else {
   
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    

    handleError(error?.data?.message, {autoHide: false});
  }
};

export const add_newWarehoue = (payload, CB) => async dispatch => {
  //Alert.alert('call');
  
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
    

    if (response?.data?.error) {
  
      handleError(response?.data?.data?.message || '');
    } else {
   
      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
    // console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const get_CustomerCard = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.GET_CUSTOMER_CARDS, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await get(GETCARDS(payload));
    //  console.log('🚀 ~ file: Root.Action.js:535 ~ response:', response);

    if (response?.data?.error) {
      dispatch({type: ROOT.GET_CUSTOMER_CARDS, loading: false});

      handleError(response?.data?.message || '');
    } else {
    
      dispatch({
        type: ROOT.GET_CUSTOMER_CARDS,
        loading: false,
        data: response?.data?.cards,
      });
    // console.log(JSON.stringify( response?.data?.cards));
      // handleSuccess(response?.data?.message);
    }
    // CB && CB(JSON.stringify( response?.data?.cards?.data));
  } catch (error) {
  
    console.log(error)
    if(error?.data?.message == 'you are not logged in! please login again')
    {
      dispatch(userLogout());
    }
    handleError(error?.data?.message, {autoHide: false});
  }
};

export const add_CustomerCard = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.ADD_CUSTOMER_CARDS, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await post(ADDCARDS, payload);
  

    if (response?.data?.error) {
      dispatch({type: ROOT.ADD_CUSTOMER_CARDS, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
    
      dispatch({
        type: ROOT.ADD_CUSTOMER_CARDS,
        loading: false,
        data: response?.data,
      });

      handleSuccess(response?.data?.message);
    }
    CB && CB(response?.data);
  } catch (error) {
  
    handleError(error?.data?.error, {autoHide: false});
  }
};

export const delete_CustomerCard = (payload, CB) => async dispatch => {
  
  try {
    let response = await post(DELETECARDS, payload);
  

    if (response?.data?.error) {
      handleError(response?.data?.data?.message || '');
    } else {
      handleSuccess(response?.data?.message);
      CB && CB(response?.data);
    }
    
  } catch (error) {
  
    handleError(error?.data?.message, {autoHide: false});
  }
};

export const getAllVechiles = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.GET_VEHICLE, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await get(GETVEHICLES(payload));

    if (response?.data?.error) {
      dispatch({type: ROOT.GET_VEHICLE, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
      dispatch({
        type: ROOT.GET_VEHICLE,
        loading: false,
        data: response?.data,
      });
    }
    CB && CB(response?.data);
  } catch (error) {
  

    handleError(error?.data?.error, {autoHide: false});
  }
};

export const send_messages = (payload, CB) => async dispatch => {
  dispatch({type: ROOT.SEND_MESSAGE, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await post(SENDMESSAGE, payload);

    if (response?.data?.error) {
      dispatch({type: ROOT.SEND_MESSAGE, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
    
      dispatch({
        type: ROOT.SEND_MESSAGE,
        loading: false,
        data: response.data.messages,
      });
    }
    CB && CB(response?.data);
  } catch (error) {
  
    handleError(error?.data?.error, {autoHide: false});
  }
};

export const send_media_messages = (payload, token) => async dispatch => {
 
  // const token = await getValueIntoAsyncStorage(TOKEN);
  // getTokenAndSetIntoHeaders(token);
  // dispatch({type: AUTH.UPDATE_USERPROFILE_API, loading: true});
  console.log(JSON.stringify( payload))
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      //  Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await post(SENDFILEMESSAGE, JSON.stringify(payload));
 

    if (response?.data?.error) {
      // dispatch({type: AUTH.UPDATE_USERPROFILE_API, loading: false});
      handleError(response?.data?.message || '');
    } else {
      dispatch({
        type: ROOT.SEND_MESSAGE,
        loading: false,
        data: response?.data?.messages,
      });
      // handleSuccess(response?.data?.message);
    }
    // CB && CB(response?.data);
  } catch (error) {
   
    console.log("error");
    console.log(error);
    handleError(error?.data?.error, {autoHide: false});
    // dispatch({type: AUTH.UPDATE_USERPROFILE_API, loading: false});
  }
};

export const get_all_category = (payload, CB) => async dispatch => {

  // dispatch({type: ROOT.GET_ALL_CATEGORY, loading: true});

  // dispatch({type: ROOT.GET_USER_SPACES, loading: true});
  try {
    let response = await get(GETALLCATEGORIES);


    if (response?.data?.error) {
      // dispatch({type: ROOT.GET_ALL_CATEGORY, loading: false});

      handleError(response?.data?.data?.message || '');
    } else {
  
      // dispatch({
      //   type: ROOT.GET_ALL_CATEGORY,
      //   loading: false,
      //   data: response.data,
      // });
    }
    CB && CB(response?.data);
  } catch (error) {
   // console.log('🚀 ~ file: Root.Action.js:545 ~ error:', error);
    // dispatch({type: ROOT.GET_ALL_CATEGORY, loading: false});

    handleError(error?.data?.error, {autoHide: false});
  }
};
