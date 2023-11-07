import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Container, PackageCard} from '../../../../containers';
import {
  CButton,
  CheckBox,
  CList,
  CPagination,
  CText,
  ProfileCard,
  ProgressiveImage,
  RadioButton,
} from '../../../../components';
import Styles from './Chats.style';
import {themes} from '../../../../theme/colors';
import {ManagerIcon, Notification, Profile} from '../../../../assets/images';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import io from 'socket.io-client';
import {SCOKET_URL} from '../../../../config/webservices';
import {useSelector, useDispatch} from 'react-redux';
import {
  getConversationMessages,
  getUserConversations,
} from '../../../../redux/actions/Root.Action';

import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

const Chats = ({}) => {
  const navigation = useNavigation();

  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: false,

    headerTitle: 'Messages',
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    backGroundColor: 'red',
    // rightPress: ()=> navigation.navigate("AddNewManager")
  };
  const reduxState = useSelector(({auth, language, root}) => {
    return {
      conversation: root?.conversations,
      userRole: auth?.user?.role,
      loading: root?.conversationsLoading,
      userId: auth?.user?._id,
    };
  });

  const dispatch = useDispatch();

  const data = [
    {
      _id: '646253ebeab5392df8b507f1',
      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: true,
    },
    {
      _id: '6462552aeab5392df8b507fc',

      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: true,
    },
    {
      _id: '64774d6121738d1cb4a4975d',

      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: true,
    },
    {
      _id: '646253ebeab5392df8b507f1',

      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: false,
    },
    {
      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: true,
    },
    {
      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: false,
    },
    {
      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: false,
    },
    {
      name: 'Tony Stark',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      active: false,
    },
  ];

  useEffect(() => {
    dispatch(getUserConversations(reduxState?.userId, callBack));
  }, []);
  const callBack = () => {
    console.log('🚀 ~ file: Chats.js:106 ~ callBack ~ callBack:', callBack);
  };

  const renderTimeSlot = ({item, index}) => {
    return (
      <View style={Styles.memberCard}>
        <View style={GlobalStyle.row}>
          <CText style={Styles.manager}>{`Total Managers`}</CText>
          <ProgressiveImage
            source={ManagerIcon}
            resizeMode="contain"
            style={{width: 25, height: 25, marginTop: 10}}
          />
        </View>

        <View>
          <CText style={Styles.activeMember}>{`14`}</CText>
        </View>
      </View>
    );
  };

  const onSocket = item => {
    dispatch(getConversationMessages(item?._id));
    navigation.navigate('Messages', {conversationId: item?._id});
  };

  const renderProfile = ({item, index}) => {
    const user = item?.members?.filter(e => e?._id !== reduxState?.userId);
    return (
      <TouchableOpacity onPress={() => onSocket(item)}>
        <View style={Styles.ProfileCard}>
          <ProgressiveImage
            source={Profile}
            resizeMode="contain"
            style={{width: 60, height: 60, borderRadius: 100}}
          />
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <CText style={Styles.messageName}>{user?.[0]?.fullName}</CText>
            <CText style={Styles.message}>{`Your reservation is done.`}</CText>
          </View>
          <View>
            <CText style={Styles.message}>{`4/27/23`}</CText>
            <CText style={Styles.manager}></CText>
          </View>
        </View>
        <View style={Styles.bottomView} />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      scrollView
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}>
      <View style={Styles.container}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 25,
            backgroundColor: '#FFF',
          }}>
          {reduxState?.loading ? (
            <ContentLoader
              speed={2}
              width={400}
              height={160}
              viewBox="0 0 400 160"
              backgroundColor="#d9d9d9"
              foregroundColor="#ededed">
              <Rect x="50" y="10" rx="4" ry="4" width="250" height="45" />
              <Rect x="8" y="10" rx="4" ry="4" width="35" height="45" />
              <Rect x="50" y="65" rx="4" ry="4" width="250" height="45" />
              <Rect x="8" y="65" rx="4" ry="4" width="35" height="45" />
              <Rect x="50" y="124" rx="4" ry="4" width="250" height="45" />
              <Rect x="8" y="124" rx="4" ry="4" width="35" heigh t="45" />
            </ContentLoader>
          ) : (
            <CList
              style={Styles.spacelist}
              // numColumns={2}
              //   horizontal
              // contentContainerStyle={[GlobalStyle.list, ]}
              data={reduxState?.conversation}
              // loading={reduxState.loading}
              renderItem={renderProfile}
              keyExtractor={(item, index) => index.toString()}
              emptyOptions={{
                // icon: require('../../assets/images/empty.png'),
                text: 'No Any Messgaes',
              }}
              // onRefreshLoading={reduxState.loading}
              // onRefreshHandler={() => onRefreshHandler()}
              // onEndReached={onEndReached}
              // onEndReachedThreshold={0.1}
              // maxToRenderPerBatch={10}
              // windowSize={10}
            />
          )}
        </View>
      </View>
    </Container>
  );
};

export default Chats;

const styles = StyleSheet.create({});
