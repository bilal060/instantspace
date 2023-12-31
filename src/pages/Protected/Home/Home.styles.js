import {Dimensions, StyleSheet} from 'react-native';
import {themes as theme, themes} from '../../../theme/colors';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    backgroundColor: theme['light'].colors.tertiary,
  },
  headerContainer: {
    marginVertical: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeading: {
    color: theme.light.colors.fontLowColor,
    fontSize: 24,
    fontFamily: theme.font.regular,
    fontWeight: '600',
  },
  subHeading: {
    color: theme.light.colors.secondary2dark,
    fontSize: 19,
    fontFamily: theme.font.regular,
    fontWeight: '600',  
  },
  list: {
    alignSelf:'center',
    marginVertical: 30,
    flexDirection: 'row',
  },
  menu: {
    backgroundColor: 'rgba(188,217,174,0.3)',
    alignItems:'center',
    height: 90,  
    width: 90,
    justifyContent: 'center',
    borderRadius: 32,
    marginTop: 40,
    marginHorizontal: 30,
  },
  menuName:{
    color: theme.light.colors.secondary2dark,
    fontSize: 16,
    fontFamily: theme.font.regular,
    fontWeight: '400',
    marginBottom:40,
  }
});
