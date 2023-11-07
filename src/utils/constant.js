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

// export const customerRoutes = [
//   {
//     name: 'Home',
//     key: 'home',
//     icon: 'home',
//     onPress: () => navigation.navigate('Explore'),
//     fontSize: 32,
//     marginTop: -40,
//     type: 'antdesign',
//     img: Home,
//     img2: FocusedHome,
//   },
//   {
//     name: 'Cart',
//     key: 'cart',
//     icon: 'shopping-basket',
//     onPress: () =>
//       navigation.navigate('Booking', {
//         screen: 'Booking',
//         initial: false,
//       }),
//     // onPress: () =>  navigation.navigate('Cart'),
//     fontSize: 30,
//     type: 'fontisto',
//     img: Booking,
//     img2: FocusedBooking,
//   },
//   {
//     name: 'Search',
//     key: 'store',
//     icon: 'search1',
//     onPress: () =>
//       navigation.navigate('Payment', {
//         screen: 'Payment',
//         initial: false,
//       }),
//     fontSize: 30,
//     type: 'antdesign',
//     img: PaymentHistory,
//     img2: FPaymentHistory,
//   },
//   {
//     name: 'Location',
//     key: 'location',
//     icon: 'location-outline',
//     onPress: () => navigation.navigate('Chats'),
//     fontSize: 30,
//     type: 'ionicon',
//     img: Message,
//     img2: FocusedMessage,
//   },
//   {
//     name: 'Profile',
//     key: 'profile',
//     icon: 'user',
//     onPress: () => navigation.navigate('Profile'),
//     fontSize: 30,
//     type: 'antdesign',
//     img: Setting,
//     img2: FocusedSetting,
//   },
// ];

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
