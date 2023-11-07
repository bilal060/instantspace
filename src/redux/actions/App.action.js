import { GETUSERSPACES } from "../../config/webservices";
import { getTokenAndSetIntoHeaders } from "../../utils/asyncStorage/Functions";
import { get, handleError } from "../../utils/methods";
import APP from '../constants/App.constant'





  export const get_spaces = (payload, CB) => async dispatch => {
    console.log("🚀 ~ file: Root.Action.js:141 ~ getConversationMessages ~ payload:", payload)
    dispatch({type: APP.ALL_SPACES, loading: true});
     await  getTokenAndSetIntoHeaders()
    try {
      let response = await get(GETUSERSPACES(payload));
      console.log("🚀 ~ file: Root.Action.js:145 ~ getConversationMessages ~ response:", response?.data?.messages)
     
      if (response?.data?.error) {
        dispatch({type: APP.ALL_SPACES, loading: false});
        handleError(response?.data?.data?.message || '');
      } else {
        dispatch({
          type: APP.ALL_SPACES,
          loading: false,
          data:response?.data?.messages
        }); 
        // handleSuccess(response?.data?.message);
      }
      CB && CB(response?.data);
    } catch (error) {
    console.log("🚀 ~ file: Root.Action.js:160 ~ getConversationMessages ~ error:", error)
  
      handleError(error?.data?.error, {autoHide: false});
      dispatch({type: APP.ALL_SPACES, loading: false});
    }
  }; 

  