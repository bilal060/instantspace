/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
import {themes as theme, themes} from '../../theme/colors';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flexGrow: 1,

    paddingHorizontal: 0,
    // backgroundColor: theme['light'].colors.backgroundColor,
    // backgroundColor: 'red',
    // textAlign:'right'
  },

  header: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  headerLogo: {
    width: 200,
    height: 53,
  },

  style: {
    flex: 1,
    // backgroundColor: 'red',
    // height: '60%',
  },
  forgot: {
    marginTop: -30,
    paddingBottom: 20,
    alignSelf: 'flex-end',
    color: theme['light'].colors.fontColor,
  },
  card: {
    // borderRadius: 20,
    // backgroundColor: theme['light'].colors.backgroundColor,
    paddingHorizontal: 20,
    paddingVertical: 30,
    // backgroundColor: 'red',
    // backgroundColor: 'red',
  },
  uploadProfile: {
    fontSize: 10,
    fontFamily: theme.font.light,
    textAlign: 'center',
    color: theme['light'].colors.gray4,
  },
  cardHeader: {
    alignSelf: 'center',
    marginBottom: 30,
    alignItems: 'center',
    marginTop: -30,
  },
  cardHeaderTitle: {
    fontSize: 35,
    fontFamily: theme.font.bold,
    textAlign: 'center',
    color: theme['light'].colors.dark,
    // marginBottom: 10,
  },
  cardHeaderSubTitle: {
    fontSize: 16,
    fontFamily: theme.font.light,
    color: theme['light'].colors.fontLowColor,
    marginBottom: 10,
    textAlign: 'center',
  },

  cardBody: {
    marginBottom: 15,
  },

  cardBottomText: {
    fontSize: 14,
    fontFamily: theme.font.semiBold,
    color: theme['light'].colors.dark,
    textAlign: 'center',
    // marginTop: 12,
  },
  googleAccount: {
    fontSize: 16,
    fontFamily: theme.font.bold,
    color: theme['light'].colors.dark,
  },
  cardBottomText2: {
    fontSize: 14,
    paddingLeft: 5,
    fontFamily: theme.font.semiBold,
    color: '#DF525B',
  },

  profileView: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    marginBottom: 10,
    backgroundColor: theme['light'].colors.lightenGray,
    borderWidth: 2,
    borderColor: '#C3D6DA',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },

  orContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 2,
    // marginVertical: 10,
  },
  regesiterProvider: {
    fontFamily: themes.font.bold,
    // fontWeight: '700',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    //marginTop: 1.2,
  },
  googleContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 13.6,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2.4,
  },
  orContainerText: {
    fontSize: 20,
    fontFamily: theme.font.regular,
    color: theme['light'].colors.fontColor,
  },
  inputIcon: {
    // marginRight: 10,
    height: 28,
    width: 28,
    alignSelf: 'center',
  },

  bottomButton: {
    marginBottom: 20,
  },

  otpContainer: {
    alignItems: 'stretch',
    marginBottom: 30,
  },
  IconImage: {
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },

  otpInputView: {
    height: 62,
    marginBottom: 10,
    alignItems: 'stretch',
  },
  inputLeftIconButton: {
    widht: 20,
    height: 20,
  },

  codeInputFieldStyle: {
    borderWidth: 1,
    borderColor: themes['light'].colors.secondary3,
    position: 'relative',
    fontSize: 20,
    fontFamily: themes.font.regular,
    color: themes['light'].colors.primary,
    borderRadius: 10,
    backgroundColor: themes['light'].colors.secondary3,
    height: 62,
    // marginHorizontal: 5,
    minWidth: 62,
    maxWidth: 62,
    width: 'auto',
    flex: 1,
  },
  continueText: {
    color: themes['light'].colors.gray3,
    alignSelf: 'center',
    marginTop: 10,
  },
  changePassText: {
    color: themes['light'].colors.shadow,
    alignSelf: 'center',
    marginTop: -30,
    marginBottom: 10,
    fontSize: 10,
  },
  forgotText: {
    // color: themes['light'].colors.primary,
    // marginTop: -10,
    fontFamily: themes.font.bold,
    // fontWeight: '700',
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 1.2,
  },

  codeInputHighlightStyle: {
    borderColor: themes['light'].colors.secondary,
    borderWidth: 2,
    color: themes['light'].colors.fontColor,
  },

  linkButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },

  linkButtonWithIcon: {
    flexDirection: 'row',
  },
  linkButtonText: {
    fontSize: 14,
    color: themes['light'].colors.lightGray,
    fontFamily: themes.font.regular,
    marginRight: 5,
  },
  linkButtonOtherText: {
    color: themes['light'].colors.fontColor,
    fontFamily: themes.font.medium,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(124, 128, 97, 0.7)',
    paddingTop: 200,
    paddingHorizontal: 20,
  },
  modalInnerContainer: {
    flex: 1,
    backgroundColor: theme['light'].colors.tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  selectFileView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#F1F6F7',
    borderStyle: 'dashed',

    borderWidth: 2,

    borderRadius: 15,
    borderColor: theme['light'].colors.borderColor,
  },
  selectFile: {
    color: themes['light'].colors.gray4,
    fontFamily: themes.font.regular,
    fontWeight: '400',
  },
  uploadText: {
    color: themes['light'].colors.iconColor,
    fontFamily: themes.font.medium,
    fontSize: 16,
    fontWeight: '600',
  },

  bgHeadeStyle: {
    width: width * 1,
    height: height * 0.45,
    marginTop: -30,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  activeUser: {
    backgroundColor: themes['light'].colors.primary,
    alignItems: 'center',
    // flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 9,
    width: width * 0.42,
    height: 44,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row',
  },
  unactiveUser: {
    backgroundColor: themes['light'].colors.backgroundColor,
    alignItems: 'center',
    // flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    width: width * 0.42,
    height: 44,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row',
  },
  typesView: {
    paddingVertical: 5,
    // paddingHorizontal: 20,
    marginVertical: 10,
    marginTop: -10,
    //  backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignSelf: 'center',
  },

  activeText: {
    color: themes['light'].colors.tertiary,
    fontFamily: themes.font.medium,
    fontSize: 13,
    paddingTop: 5,
    fontWeight: '800',
    textAlign: 'center',
    marginLeft: 6,
  },
  unActiveText: {
    paddingTop: 5,
    color: themes['light'].colors.gray4,
    fontFamily: themes.font.medium,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '800',
    textAlign: 'center',
  },

  unactiveText: {
    color: themes['light'].colors.primary,
    fontFamily: themes.font.medium,
    fontSize: 16,
    fontWeight: '600',
  },
  timeCountDown: {
    color: themes['light'].colors.primary,
    fontFamily: themes.font.medium,
    fontSize: 13,
    marginLeft: 5,
  },
  timeView: {
    color: themes['light'].colors.tertiary,
    borderWidth: 0,
    marginHorizontal: -10,
  },
  seconTime: {
    color: themes['light'].colors.iconColor,
    fontFamily: themes.font.medium,
    fontSize: 13,
  },
});
