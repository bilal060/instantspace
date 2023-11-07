/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SafeAreaView from '../safeAreaView/SafeAreaView';
import {CText, CIcon, ProgressiveImage, CInput} from '../../components';
import {CFilter, HeaderImg, LoginImg, Logo, Profile} from '../../assets/images';
import {themes as theme} from '../../theme/colors';
import GlobalStyle from '../../assets/styling/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BASE_URL_IMG} from '../../config/webservices';
const {width, height} = Dimensions.get('screen');
import {useTranslation} from 'react-i18next';

const Header = props => {
  const {t} = useTranslation();
  const {
    headerLeft = true,
    headerTitle = '',
    headerTitleElement,
    headerTile,
    headerRight = false,
    ProgressiveImageHeader,
    backOnPress,
    style,
    showCart = false,
    hideBackButton = true,
    backButtonIcon = true,
    showCenterLogo,
    headerTitleStyle,
    goBackWithRoute,
    headerTransparentStyle,
    bgHeadeStyle,
    transparent,
    centerImage,
    headerRightImg,
    rightPress,
    backGroundColor,
  } = props;
  const navigation = useNavigation();
  const reduxState = useSelector(({auth, language}) => {
    return {
      userRole: auth?.user?.role,
      user: auth?.user,
    };
  });
  var convertedFilePath = `${BASE_URL_IMG}${reduxState?.user?.photo}`.replace(
    /\\/g,
    '/',
  );

  console.log(
    '🚀 ~ file: Header.js:52 ~ convertedFilePath:',
    convertedFilePath,
  );
  const backPress = () => {
    if (backOnPress) {
      backOnPress();
    } else {
      navigation.goBack();
    }
  };

  const backButton = () => {
    return (
      <TouchableOpacity
        style={GlobalStyle.logostyles}
        onPress={() => backPress()}>
        <CIcon
          type="AntDesign"
          name="left"
          color={
            !ProgressiveImageHeader
              ? theme.light.colors.dark
              : theme.light.colors.tertiary
          }
          size={20}
        />
      </TouchableOpacity>
    );
  };

  const centerLogo = () => {
    return (
      <View style={styles.headerLogo}>
        <ProgressiveImage
          style={styles.headerLogoImage}
          source={require('../../assets/images/newlock.png')}
          resizeMode="contain"
        />
      </View>
    );
  };
  const menuButton = () => {
    return (
      <View>
        <ProgressiveImage
          style={styles.profileImage}
          source={Profile}
          resizeMode="contain"
        />
      </View>
    );
  };
  const cartButton = () => {
    return (
      <TouchableOpacity
        style={[
          styles.headerCartButton,
          theme === 'light' && styles.headerCartLight,
        ]}
        // onPress={() => navigation.navigate('Cart')}
      >
        {true > 0 && <View style={styles.headerCartBadge}></View>}
        <CIcon
          type="AntDesign"
          name="shoppingcart"
          size={25}
          style={[styles.headerCartButtonIcon]}
        />
      </TouchableOpacity>
    );
  };

  const rightButton = () => {
    return (
      <TouchableOpacity style={GlobalStyle.logostyles} onPress={rightPress}>
        {!headerRightImg ? (
          <CIcon
            type="MaterialIcons"
            name="add"
            color={theme.light.colors.backgroundColor}
            size={35}
          />
        ) : (
          <ProgressiveImage
            style={styles.profileImage}
            source={
              !reduxState?.user ? headerRightImg : {uri: convertedFilePath}
            }
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  };

  const getBackgroundColor = () => {
    if (!ProgressiveImageHeader === true) {
      return theme['light'].colors.tertiary;
    } else {
      return theme['light'].colors.primary;
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.headerStyle,
        transparent,
        headerTransparentStyle,
        {
          backgroundColor: backGroundColor
            ? theme['light'].colors.primary
            : '#f1f6f7',
        },
      ]}
      edges={['top']}>
      <View>
        {/* {reduxState?.userRole === 'Customer' ? ( */}

        {true ? (
          <>
            <View style={[GlobalStyle.listItemActions]}>
              {backButtonIcon ? backButton() : null}
              {ProgressiveImageHeader && (
                <CText style={[GlobalStyle.toggleViewText, headerTile]}>
                  {t(headerTitle)}
                </CText>
              )}
              {headerTile && (
                <CText style={[GlobalStyle.toggleView2Text, headerTile]}>
                  {t(headerTile)}
                </CText>
              )}

              {headerRight && rightButton()}
            </View>
            <View>{showCenterLogo && centerLogo()}</View>
          </>
        ) : (
          <>
            {/* <View style={[GlobalStyle.row, styles.headerView]}>
              <CInput
                placeholder={'Sort By'}
                // value={values.fuel}
                // onChangeText={handleChange('fuel')}
                // error={errors.fuel}
                sec
                inputInnerContainerStyle={styles.inputInnerContainerStyle}
                //   type="view"
                //   leftIconNAme={FuelIcon}
                returnKeyType="next"
              />
              <View style={{backgroundColor:"#FFF" , width:40, height:40, padding:2 , borderRadius:100 , justifyContent:"center", alignItems:"center"}}>
 
              <ProgressiveImage
                style={[styles.profileImage2]}
                source={CFilter}
                resizeMode="contain"
                />
                </View>
              <ProgressiveImage
                style={styles.profileImage}
                source={Profile}
                resizeMode="contain"
              />
            </View> */}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.light.colors.backgroundColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
    // height:170,
  },
  headerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  headerView: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  headerLogoImage: {
    width: 130,
    height: 250,
    // marginTop: -50,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  profileImage2: {
    width: 25,
    height: 25,
    justifyContent: 'center',
  },
  subheaderView: {
    marginTop: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
  },
  bgHeadeStyle: {
    width: width * 1,
    height: height * 0.45,
    marginTop: -30,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  headerCartButton: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderColor: theme['light'].colors.lightBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -25,
  },
  headerCartBadge: {
    backgroundColor: theme['light'].colors.primary,
    minWidth: 10,
    minHeight: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    right: 5,
    zIndex: 1,
    padding: 3,
  },
  inputInnerContainerStyle: {
    backgroundColor: '#FFF',
    borderBottomWidth: 0,
    width: width * 0.63,
    marginTop: 10,
    borderRadius: 50,
  },
  headerCartBadgeText: {
    fontSize: 8,
    color: theme['light'].colors.tertiary,
    borderRadius: 10,
    fontFamily: theme.font.regular,
  },
  headerCartButtonIcon: {
    marginTop: 6,
    marginLeft: -5,
    fontSize: 35,
    color: theme['light'].colors.primary,
  },
});
