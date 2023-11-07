import {
    Dimensions,
    Linking,
    PixelRatio,
    Platform,
    StatusBar,
  } from 'react-native';
  import {RFValue} from 'react-native-responsive-fontsize';
  import {
    heightPercentageToDP,
    widthPercentageToDP,
  } from 'react-native-responsive-screen';

  import {getStatusBarHeight} from 'react-native-status-bar-height';
 
  export const headerHeight = Platform.OS === 'ios' ? 80 : 50;
  export const SCREEN_WIDTH = Dimensions.get('window').width;
  export const SCREEN_HEIGHT = Dimensions.get('window').height;
  export const IS_IOS = Platform.OS === 'ios';
  export const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;
  
  export const RF = (size , scale) => {
    return RFValue(scale ? size - scale : size, SCREEN_HEIGHT);
  }
  
  export const WP = (size) => {
    return widthPercentageToDP(size);
  }
  
  export const HP =(size) =>{
    return heightPercentageToDP(size);
  }

  export const HDP =(size) =>{
    return PixelRatio.roundToNearestPixel(size);
  }
  
  export const CFL =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  export const floatPad = (num)=> {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  