import {StyleSheet} from 'react-native';
import {themes as theme, themes} from '../../theme/colors';

const Styles = StyleSheet.create({
  packageName: {
    color: theme['light'].colors.dark,
    fontSize: 15,
    fontFamily: theme.font.semiBold,
  },
  packageDetails: {
    color: theme['light'].colors.shadow,
    fontSize: 12,
    fontFamily: theme.font.regular,
  },
  selectPackage: {
    color: theme['light'].colors.dark,
    paddingVertical: 4,
    fontSize: 13,
    fontFamily: theme.font.medium,
  },
  prizeCard: {
    borderWidth: 1,
    borderRadius:10,
    width:100,
    padding: 10,
    paddingVertical:10,
    marginBottom:20,
    margin: 5,
    borderColor: theme['light'].colors.fontColor,

  },
  packageSubName: {
    color: theme['light'].colors.dark,
    fontSize: 12,
    fontFamily: theme.font.medium,
  },
  packageprize: {
    color: theme['light'].colors.lightenGray,
    fontSize: 11,
    fontFamily: theme.font.medium,
    fontWeight:"600"
  },
});

export default Styles;
