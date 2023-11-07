/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import Styles from './Container.style';
import {ProgressiveImage, CLoading} from '../../components';
import {Header, SafeAreaView, TabBar, ViewContainer} from '../../containers';
import {themes as theme} from '../../theme/colors';
import {HeaderImg} from '../../assets/images';
import {truckDriverRoutes} from '../../utils/constant';
import {useSelector} from 'react-redux';

function Container(props) {
  const {
    children,
    headerProps = {},
    bottomProps = {},
    messagesScreen,
    scrollView = false,
    scrollViewProps,
    bottomSpace = false,
    edges = [],
    style,
    SafeAreaViewStyle,
    loading,
    showPattern = false,
    backgroundColor,
  } = props;
  const reduxState = useSelector(({auth, language}) => {
    return {
      isLoggedin: auth?.isLoggedIn,
      language: language?.language?.lan,
      userRole: auth?.user?.role,
      user: auth?.user,
    };
  });

  const renderHeader = () => {
    if (Object.keys(headerProps).length) {
      return <Header {...headerProps} />;
    } else {
      return null;
    }
  };
  const renderBottomBar = () => {
    if (Object.keys(truckDriverRoutes).length) {
      return <TabBar {...props} customerRoutes={truckDriverRoutes} />;
    } else {
      return null;
    }
  };
  const getEdges = () => {
    if (Object.keys(headerProps).length) {
      return edges?.length ? edges : ['left', 'right', 'bottom'];
    } else {
      return edges?.length ? edges : ['top', 'left', 'right', 'bottom'];
    }
  };

  const getBackgroundColor = () => {
    if (backgroundColor === 'theme-color') {
      return theme['light'].colors.tertiary;
    } else {
      return theme['light'].colors.tertiary;
    }
  };

  return (
    <ViewContainer
      style={[
        Styles.background,
        {
          backgroundColor: getBackgroundColor(),
          // backgroundColor: 'red',

          ...(bottomSpace && {paddingBottom: 40}),
        },
        style,
      ]}>
      {renderHeader()}
      <SafeAreaView
        edges={getEdges()}
        style={[Styles.backgroundContainer, SafeAreaViewStyle]}>
        <CLoading loading={loading} />
        <View style={{flex: 1}}>
          {scrollView ? (
            <ScrollView
              {...scrollViewProps}
              nestedScrollEnabled
              scrollEventThrottle={16}
              keyboardShouldPersistTaps="handled">
              {children}
            </ScrollView>
          ) : (
            children
          )}
          {reduxState?.isLoggedin && !messagesScreen && renderBottomBar()}
        </View>
      </SafeAreaView>
    </ViewContainer>
  );
}
export default memo(Container);
