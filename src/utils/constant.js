/* eslint-disable prettier/prettier */
import {
  Booking,
  Explore,
  FPaymentHistory,
  TruckIcon,
  FocusedBooking,
  FocusedExplore,
  FocusedHome,
  FocusedMessage,
  FocusedSetting,
  Home,
  Message,
  PaymentHistory,
  Setting,
  Truck,
  FTruckIcon,
  FocusedSpace,
  MySpace,
  Managers,
  FocusedManager,
} from '../assets/images';

export const customerRoutes = [
  {
    id: 1,
    img: Home,
    img2: FocusedHome,
    navigate: 'Explore',
  },
  {
    id: 2,

    img: Booking,
    img2: FocusedBooking,
    navigate: 'Booking',
  },
  {
    id: 3,
    img: PaymentHistory,
    img2: FPaymentHistory,
    navigate: 'Payment',
  },

  {
    id: 4,
    img: Message,
    img2: FocusedMessage,
    navigate: 'Chats',
  },
  {
    id: 5,
    img: Setting,
    img2: FocusedSetting,
    navigate: 'Profile',
  },
];

export const ManagerRoutes = [
 
  {
    id: 1,

    img: Booking,
    img2: FocusedBooking,
    navigate: 'Booking',
  },
  // {
  //   id: 2,
  //   img: PaymentHistory,
  //   img2: FPaymentHistory,
  //   navigate: 'Payment',
  // },

  {
    id: 2,
    img: Message,
    img2: FocusedMessage,
    navigate: 'Chats',
  },
  {
    id: 3,
    img: Setting,
    img2: FocusedSetting,
    navigate: 'Profile',
  },
];


export const truckDriverRoutes = [
  {
    id: 1,
    img: Home,
    img2: FocusedHome,
    navigate: 'Booking',
  },
  {
    id: 2,

    img: Booking,
    img2: FocusedBooking,
    navigate: 'Explore',
  },
  {
    id: 3,
    img: TruckIcon,
    img2: FTruckIcon,
    navigate: 'MyVechiles',
  },
  {
    id: 4,
    img: Explore,
    img2: FocusedExplore,
    navigate: 'Payment',
  },
  {
    id: 5,
    img: Message,
    img2: FocusedMessage,
    navigate: 'Chats',
  },
  {
    id: 6,
    img: Setting,
    img2: FocusedSetting,
    navigate: 'profile',
  },
];

export const storageOwnerRoutes = [
  {
    id: 1,
    img: Home,
    img2: FocusedHome,
    navigate: 'Home',
  },
  {
    id: 2,

    img: Booking,
    img2: FocusedBooking,
    navigate: 'Explore',
  },
  {
    id: 3,
    img: MySpace,
    img2: FocusedSpace,
    navigate: 'MySpace',
  },
  {
    id: 4,
    img: Managers,
    img2: FocusedManager,
    navigate: 'Managers',
  },
  {
    id: 5,
    img: Message,
    img2: FocusedMessage,
    navigate: 'Chats',
  },
  {
    id: 6,
    img: Setting,
    img2: FocusedSetting,
    navigate: 'Profile',
  },
];
