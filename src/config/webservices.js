/* eslint-disable prettier/prettier */
// export const BASE_URL = 'https://api.instantspace.app/api/v1/';
// export const BASE_URL_IMG = 'https://api.instantspace.app/';

export const BASE_URL = 'http://192.168.0.107:5001/api/v1/';
export const BASE_URL_IMG = 'http://192.168.0.107:5001/';

export const SCOKET_URL = 'ws://localhost:8900';

export const LOGIN = `${BASE_URL}users/login`;
export const REGISTER = `${BASE_URL}users/signup`;
export const OTPVERIFY = `${BASE_URL}users/verifyotp`;
export const UPDATEPROFILE = `${BASE_URL}users/UpdateUserProfile`;
export const UPDATECOMPANYPROFILE = `${BASE_URL}users/UpdateCompanyProfile`;
export const FORGOTPASSWORD = `${BASE_URL}users/forgotpassword`;
export const GETALLSPACES = `${BASE_URL}spaces`;

export const GETSPACESBYCATORGY = catId =>
  `${BASE_URL}spaces/cat-spaces/${catId}`;

export const GETWAREHOUSEBYCATORGY = catId =>
  `${BASE_URL}warehouses/cat-warehouses/${catId}`;

export const INVITEMANAGER = `${BASE_URL}users/manager-invitation`;
export const ADDMEWSPACE = `${BASE_URL}spaces/add_space`;
export const ADDNEWAREHOUSESPACE = `${BASE_URL}warehouses/add_warehouse`;

export const GETUSERSPACES = id => `${BASE_URL}spaces/?page=${id}`;

export const CREATEBOOKING = `${BASE_URL}bookings/create_booking`;
export const ALLBOOKING = id => `${BASE_URL}bookings/user_bookings/${id}`;
export const OWNERBOOKING = id => `${BASE_URL}bookings/owner_bookings/${id}`;
export const OWNERMANAGERS = id => `${BASE_URL}users/owner-managers`;
// export const OWNERMANAGERS = id => `${BASE_URL}users/owner-managers/${id}`;

export const FILTERMANAGERS = (ownerId, spaceId) =>
  `${BASE_URL}users/owner-managers/${ownerId}?page=1&filterBy=${spaceId}`;
export const FILTERBOOKING = (ownerId, spaceId) =>
  `${BASE_URL}users/owner-managers/${ownerId}?page=1&filterBy=${spaceId}`;

export const GETCATEGORIES = user_role =>
  `${BASE_URL}category/specific?role=${user_role}`;

export const GETALLCATEGORIES = `${BASE_URL}category`;

export const GETCARDS = user_id => `${BASE_URL}users/user-cards/${user_id}`;
export const GETVEHICLES = user_id => `${BASE_URL}vehicle/user/${user_id}`;

export const ADDCARDS = `${BASE_URL}users/add_card`;

export const GETCONVERSATION = id => `${BASE_URL}conversations/${id}`;
export const CONVERSATIONMESSAGE = id => `${BASE_URL}messages/${id}`;
export const SENDMESSAGE = `${BASE_URL}messages`;

// export const ADDVEHICLE =  `${BASE_URL}vehicle/add_vehicle`;
// export const ADDVEHICLE =  `${BASE_URL}vehicle/add_vehicle`;

export const UPLOAD_IMAGE = userId => `${BASE_URL}students/${userId}/image`;

export const GET_STATE = country => `${BASE_URL}country?country=${country}`;
export const GET_CITY = state => `${BASE_URL}country?state=${state}`;
