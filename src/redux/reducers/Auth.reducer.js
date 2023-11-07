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
    case AUTH.LOGIN_USER_API:
      return {
        ...state,
        loginLoading: action.loading,
        isLoggedIn: action.isLoggedIn,
        user: action.user,
      };
    case AUTH.REGISTER_OWNER_API:
      return {
        ...state,
        registerLoading: action.loading,
      };
    case AUTH.UPDATE_USERPROFILE_API:
      return {
        ...state,
        updateUserLoading: action.loading,
        user:action?.user
      };
    case AUTH.LOGOUT_USER_API:
      return {...state, isLoggedIn: action.isLoggedIn, user: action.user};
    case AUTH.VERIFY_OWNER_API:
      return {
        ...state,
        verifyLoading: action.loading,
        user: action.user,
      };
    case AUTH.FORGOT_PASS:
      return {
        ...state,
        forgitPassLoading: action.loading,
      };
      case "ALLSPACE":
      return {
        ...state,
        spaceData: action.data,
      }; 
    default:
      return state
  }
};
  