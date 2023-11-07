import {StyleSheet} from 'react-native';
import {themes} from '../../theme/colors';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flex: 1,
    width: width * 0.9,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    // width:300,
    // marginHorizontal:20,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  nameHeaindg: {
    fontFamily: themes.font.medium,
    color: themes['light'].colors.iconColor,
    paddingVertical: 5,
    fontSize: 13,
    fontWeight: '600',
    // lineHeight: 14,
    // letterSpacing: 0.5,
  },
  titleHeaindg: {
    fontFamily: themes.font.regular,
    color: themes['light'].colors.gray4,
    paddingVertical: 5,
    fontSize: 13,
    fontWeight: '500',
    // fontWeight: '700',
    // lineHeight: 14,
    // letterSpacing: 0.5,
  },
});
