/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
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
    fontSize: 22,
    fontFamily: theme.font.bold,
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
  mainPlaceContainer: {
    width: width * 0.9,
    marginLeft: -5,
    // height: height * 0.56,
  },
  inputStyles: {
    marginHorizontal: 10,
  },
  profileCard: {
    marginHorizontal: 10,
    marginTop: 20,
    width: width * 0.9,
  },
  profieContainer: {
    backgroundColor: theme.light.colors.tertiary,
  },
  reviewDate: {
    color: theme.light.colors.gray4,
    fontSize: 10,
    fontFamily: theme.font.regular,
    fontWeight: '400',
  },
  reviews: {
    width: '31%',
    marginVertical: 10,
    marginHorizontal: 20,
    color: theme.light.colors.iconColor,
    fontSize: 12,
    fontFamily: theme.font.medium,
    fontWeight: '400',
    color: theme.light.colors.gray4,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    height: 1,
    backgroundColor: theme.light.colors.gray3,
    marginHorizontal: 20,
    flex: 1,
    width: '31%',
  },
  rating: {
    marginRight: 5,
    color: theme.light.colors.gray4,
    fontSize: 14,
    fontFamily: theme.font.medium,
    fontWeight: '400',
  },
  typesView: {
    // paddingVertical: 5,
    // paddingHorizontal: 20,
    marginVertical: 10,
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf: 'center',
  },
  activeUser: {
    // backgroundColor: themes['light'].colors.primary,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

    borderRadius: 10,
    width: width * 0.42,
    height: 50,
    // marginVertical: 10,
    // marginHorizontal: 10,
    padding: 10,
  },
  unactiveUser: {
    backgroundColor: themes['light'].colors.tertiary,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    width: width * 0.42,
    height: 50,
    // marginVertical: 10,
    // marginHorizontal: 15,
    padding: 5,
  },
  activeText: {
    color: themes['light'].colors.tertiary,
    fontFamily: themes.font.medium,
    fontSize: 15,
    paddingLeft: 5,

    fontWeight: '600',
    textAlign: 'center',
  },
  unActiveText: {
    paddingLeft: 5,
    color: themes['light'].colors.gray4,
    fontFamily: themes.font.medium,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  reverseSlot: {
    backgroundColor: themes['light'].colors.tertiary,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  selectTime: {
    color: theme.light.colors.iconColor,
    fontSize: 16,
    fontFamily: theme.font.semiBold,
    fontWeight: '600',
    marginLeft:4
  },
  timevIew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    width: width * 0.38,
    height: 50,
  },
  inputDateContainer: {
    width: width * 0.8,
    height: 50,
  },
  selectButtonText: {
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  selectContainer: {
    backgroundColor: themes['light'].colors.lightenGray,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 0,
  },
  spaceCancelBtn: {
    backgroundColor: themes['light'].colors.secondary3,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  spaceSaveBtn: {
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(37,99,235, 0.5)',
    paddingTop: 200,
    paddingHorizontal: 20,
  },
  modalInnerContainer: {
    flex: 1,
    backgroundColor: theme['light'].colors.tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addCard: {
    alignItems: 'center',
    backgroundColor: themes['light'].colors.tertiary,
    elevation: 1,
    borderRadius: 10,
    padding: 15,
    //  marginBottom:50
  },
  multplyCard: {
    alignItems: 'flex-start',
    backgroundColor: themes['light'].colors.tertiary,
    elevation: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  selectedMultplyCard: {
    alignItems: 'flex-start',
    backgroundColor: themes['light'].colors.tertiary,
    elevation: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: themes['light'].colors.primaryb,
  },
  img: {
    width: 25,
    height: 25,
    justifyContent: 'center',
  },
  cardText: {
    color: theme.light.colors.iconColor,
    fontSize: 14,
    fontFamily: theme.font.semiBold,
  },
  addCardText: {
    color: theme.light.colors.primary,
    fontSize: 13,
    fontFamily: theme.font.semiBold,
  },
  inputView: {
    width: width * 0.45,
  },
  memberCard: {
    // flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: theme['light'].colors.primary,
    borderRadius: 7,
  },
  unActiveMember: {
    // flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: theme['light'].colors.lightenGray,
    borderRadius: 7,
  },

  manager: {
    fontSize: 12,
    color: theme['light'].colors.tertiary,
    fontFamily: theme.font.semiBold,
  },
  unActivemanager: {
    fontSize: 12,
    color: theme['light'].colors.gray4,
    fontFamily: theme.font.medium,
  },
});
