import Auth from '../constants/Auth.constant';
import ROOT from '../constants/Root.constant';

const initialState = {
  spacesLoading: false,
  bookingLoading: false,
  spaces: {},
  conversations: {},
  messages: {},
  booking: {},
  cards: [],
};

export default (state = initialState, action = {}) => {
  console.log('🚀 ~ file: Root.reducer.js:13 ~ action:', action);
  switch (action.type) {
    case ROOT.GET_SPACES:
      return {
        ...state,
        spacesLoading: action.loading,
        spaces: action.allSpace,
      };

    case ROOT.CREATE_BOOKING:
      return {
        ...state,
        bookingLoading: action.loading,
      };
    case ROOT.ADD_VEHICLE:
      return {
        ...state,
        vehicleLoading: action.loading,
      };
    case ROOT.USER_CONVERSATIONS:
      return {
        ...state,
        conversationsLoading: action.loading,
        conversations: action.data,
      };
    case ROOT.CONVERSATION_MESSAGES:
      return {
        ...state,
        conversationsLoading: action.loading,
        messages: action.data,
      };
    case ROOT.USER_SPACESES:
      return {
        ...state,
        userspacesLoading: action.loading,
        userSpace: action.data,
      };
    case ROOT.GET_ALL_BOOKING:
      return {
        ...state,
        bookingLoading: action.loading,
        booking: action.data,
      };
    case ROOT.GET_USER_SPACES:
      return {
        ...state,
        spLoad: action.loading,
        userspaces: action.data,
      };
    case ROOT.GET_CUSTOMER_CARDS:
      return {
        ...state,
        carsLaoding: action.loading,
        cards: action.data,
      };
    case ROOT.ADD_CUSTOMER_CARDS:
      return {
        ...state,
        addcarsLaoding: action.loading,
      };
    case 'ALLSPACE':
      return {
        ...state,
        spaceData: action.data,
      };

    case ROOT.SEND_MESSAGE:
      return {
        ...state,
        messages: action.data,
      };
      case ROOT.GET_ALL_CATEGORY:
        return {
          ...state,
          category: action.data,
        };
    default:
      return {...state};
  }
};
