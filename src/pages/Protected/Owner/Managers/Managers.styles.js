import {Dimensions, StyleSheet} from 'react-native';
import {themes as theme, themes} from '../../../../theme/colors';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    // flexGrow: 1,
    // paddingHorizontal: 0,
    backgroundColor: theme['light'].colors.backgroundColor,
    height: '100%',
    backgroundColor: 'red',
  },
  memberCard: {
    width: width * 0.42,
    flex: 1,
    backgroundColor: theme['light'].colors.lightenGray,
    marginRight: 12,
    paddingHorizontal: 5,
    height: 90,
  },
  activeMember: {
    fontSize: 32,
    color: theme['light'].colors.iconColor,
    fontFamily: theme.font.semiBold,
    marginTop: 12,
    paddingLeft: 5,
  },
  inputInnerContainerStyle: {
    backgroundColor: 'transparent',
    border: 0,
    width: width * 0.9,
    marginTop: 10,
    marginLeft: -10,
  },
  mainHeading: {
    color: theme.light.colors.iconColor,
    fontSize: 24,
    fontFamily: theme.font.semiBold,
    fontWeight: '600',
    marginTop: 10,
  },
  manager: {
    fontSize: 13,
    color: theme['light'].colors.grey4,
    fontFamily: theme.font.regular,
    paddingTop: 10,
    paddingLeft: 5,
  },
  ProfileCard: {
    flex: 1,
    marginVertical: 10,
    height: 90,
  },
  listHeader: {
    marginVertical: 20,
  },
  buttonStyle: {
    marginTop: height * 0.1,
  },
  modalInnerContainer: {
    flex: 1,
    backgroundColor: theme['light'].colors.tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(124, 128, 97, 0.7)',
    paddingTop: 200,
    paddingHorizontal: 20,
  },
});
