/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
import {themes as theme, themes} from '../../../../theme/colors';

const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    
  },
  headerContainer: {
    marginVertical: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.light.colors.primary,
  },
  headerView: {
    alignItems: 'center',

  },
  inputInnerContainerStyle: {
    backgroundColor: 'white',
    border: 0,
    width: width * 0.72,
    marginTop: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
  },
  mainHeading: {
    color: theme.light.colors.iconColor,
    fontSize: 20,
    fontFamily: theme.font.bold,
    fontWeight: '900',
    marginTop: 10,
  },
  subHeading: {
    color: theme.light.colors.gray4,
    fontSize: 16,
    fontFamily: theme.font.regular,
    fontWeight: '600',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginLeft: 12,

  },
  view: {
    color: "#DF525B",
    fontSize: 16,
    fontFamily: theme.font.semiBold,
    fontWeight: '900',

  },
  spaceTotal: {
    color: theme.light.colors.iconColor,
    fontSize: 16,
    fontFamily: theme.font.semiBold,
    fontWeight: '600',
  },
  list: {
    // flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
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
    backgroundColor: '#FFF',
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  Calender: {
    backgroundColor: '#FFF',
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
    marginBottom: 20,
  },
  icon: {
    width: 45,
    height: 45,
    alignSelf: 'center',
    
  },
  iconView: {
    marginHorizontal: 10,
    width: 62,
    height: 100,
    alignSelf: 'center',
    alignContent: 'center',
  },
  iconTitle: {
    color: theme.light.colors.dark,
    fontSize: 14,
    fontFamily: theme.font.semiBold,
    fontWeight: '600',
    textAlign: 'center',
  },
});
