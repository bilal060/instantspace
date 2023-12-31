import {Dimensions, StyleSheet} from 'react-native';
import {themes as theme, themes} from '../../../../theme/colors';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme['light'].colors.tertiary,
  },
  headerContainer: {
    marginVertical: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeading: {
    color: theme.light.colors.iconColor,
    fontSize: 24,
    fontFamily: theme.font.semiBold,
    fontWeight: '600',
    marginTop: 10,
  },
  subHeading: {
    color: theme.light.colors.iconColor,
    fontSize: 13,
    fontFamily: theme.font.regular,
    fontWeight: '600',
  },
  view: {
    color: theme.light.colors.primary,
    fontSize: 2,
    fontFamily: theme.font.semiBold,
    fontWeight: '600',
  },
  spaceTotal: {
    color: theme.light.colors.iconColor,
    fontSize: 13,
    fontFamily: theme.font.semiBold,
    fontWeight: '600',
  },
  list: {
    alignSelf: 'center',

    // marginBottom:-40,
    // marginVertical: 10,
    flexDirection: 'row',
    marginLeft: -5,
  },
  spacelist: {
    marginHorizontal: -10,
  },
  menu: {
    backgroundColor: 'rgba(188,217,174,0.3)',
    alignItems: 'center',
    height: 90,
    width: 90,
    justifyContent: 'center',
    borderRadius: 32,
    marginTop: 40,
    marginHorizontal: 30,
  },
  menuName: {
    color: theme.light.colors.secondary2dark,
    fontSize: 16,
    fontFamily: theme.font.regular,
    fontWeight: '400',
    marginBottom: 40,
  },
  BarChart: {
    backgroundColor: theme.light.colors.tertiary,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  Calender: {
    backgroundColor: theme.light.colors.tertiary,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
    marginBottom: 20,
  },
  mainContainer: {
    width: width * 0.88,
    // margin:2
  },
  mainContainer2: {
    width: width * 0.88,
    height: 150,
    flexDirection: 'row',
    // margin:2
  },
})
