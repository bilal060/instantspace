import AUTH from '../constants/Auth.constant';

const initialState = {
  isLoggedIn: false,
  registerLoading: false,
  verifyLoading: false,
  forgitPassLoading: false,
  updateUserLoading: false,
  user: {},
};
export default (state = initialState, action = {}) => {
    switch (action.type) {
      case "spcde":
        return {
          ...state,
          
        };
      
      default:
        return state
    }
  };
   