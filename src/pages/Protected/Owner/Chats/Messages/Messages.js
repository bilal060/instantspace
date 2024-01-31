/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, View, ScrollView, StatusBar , SafeAreaView, Image, Pressable} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Container, PackageCard} from '../../../../../containers';
import {
  CButton,
  CheckBox,
  CIcon,
  CInput,
  CList,
  CPagination,
  CText,
  ProfileCard,
  ProgressiveImage,
  RadioButton,
} from '../../../../../components';
import Styles from '../Chats.style';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  CardIcon,
  CemeraPhoto,
  ManagerIcon,
  Menu,
  Notification,
  Profile,
} from '../../../../../assets/images';
import GlobalStyle from '../../../../../assets/styling/GlobalStyle';
import {themes} from '../../../../../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getConversationMessages,
  send_media_messages,
  send_messages,
} from '../../../../../redux/actions/Root.Action';
import {Socket} from '../../../../../utils/methods';
import moment from 'moment';
import {TextInput} from 'react-native-gesture-handler';
import { BASE_URL_IMG } from '../../../../../config/webservices';
import LinearGradient from 'react-native-linear-gradient';

const Managers = ({route, navigation}) => {
  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: false,

    headerTitle: 'Messages',
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    // rightPress: ()=> navigation.navigate("AddNewManager")
  };

  const data = [
    {
      name: 'Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum ',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      type: 'sender',
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      type: 'sender',
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      type: 'reciver',
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      type: 'sender',
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur. Non dolor sit. Lorem ipsum',
      address: 'Belmont, North Carolina',
      phone: '+1 012 3456 789',
      type: 'sender',
    },
  ];

  const {conversationId, userMessage} = route?.params || {};
  //  console.log(userMessage[0])
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.user._id);
  const [profileImage, updateProfileImage] = useState("");



  useEffect(() => {
    if (conversationId) {
      getMessages();
    }
  }, [conversationId]);




  useEffect(() => {
    Socket.on('getMessage', data => {
      const newmessage = {
        receiverId: data.receiverId,
        sender: data.senderId,
        message: data.message,
      };
      setArrivalMessage(newmessage);
       setMessages(pre => [...pre, newmessage]);
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      messages != undefined &&
      messages[0].conversationId.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, []);

  const getMessages = async () => {
    try {
      dispatch(getConversationMessages(conversationId, callbackFunc));
    } catch (err) {
      console.log(err);
    }
  };
  const callbackFunc = res => {
    setMessages(res.messages);
  };

  const sendMessage = async () => {
    const newmessage = {
      conversationId: conversationId,
      sender: userId,
      message: message,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dispatch(send_messages(newmessage));
    setMessages(pre => [...pre, newmessage]);

    setMessage('');

    const receiverId =
      (await messages) != undefined &&
      messages[0].conversationId.members.find(member => member !== userId);
    Socket.emit('sendMessage', {
      senderId: userId,
      receiverId: receiverId,
      message: message,
      conversationId: conversationId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };


  const SendMediaHandler = async () => {
    if (profileImage !== null || profileImage !== "" ) {
      // var objectUrl = URL.createObjectURL(mediaFile);
      const messageData = {
        conversationId: conversationId,
        sender: userId,
        message: profileImage?.uri,
        createdAt: new Date()
      };
      const sendMedia = new FormData();

      // sendMedia.append('chat_img', {
      //   uri:
      //        profileImage?.uri,
      //   type: 'image/jpeg',
      //   name: 'image.jpg',
      // });
     
      sendMedia.append('conversationId', conversationId);
      sendMedia.append('sender', userId);
      sendMedia.append('createdAt', new Date());
      sendMedia.append('chat_img', {
        uri: profileImage?.uri,
        type: profileImage?.type,
        name: profileImage?.fileName,
      });

      setMessages((pre) => [...pre, messageData]);
      dispatch(send_media_messages(sendMedia, token));
      updateProfileImage("");
    
    }
  };

  const openLibrary = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      updateProfileImage(response?.assets?.[0]);
     // console.log(response);
    });
  };

   
  useEffect(()=>{

    if(profileImage!="")
    {
      console.log(profileImage);
       SendMediaHandler();
    }

  },[profileImage])

  const renderProfile = (item, index) => {
    const isSender = item?.sender === userId;
   


    return (

      <View>

<LinearGradient colors=  {isSender && ['#FB7C5F', '#DF525B']} style={isSender ? Styles.reciverView : Styles.senderView}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
        {item.message?.includes('uploads') || item.message?.includes('file://') ?  
        <Image resizeMode="contain" style={{width:"90%", height:120}}  source={{uri: item?.message?.includes('uploads') ?  BASE_URL_IMG + item?.message : item?.message}}/>:
          <CText
            style={
              isSender ? Styles?.reviverMessageName : Styles.senderMessageName
            }>
            {item?.message}
          </CText>
  }
        </View>
  
        <View>
          <CText style={isSender ? Styles?.reciverDate : Styles.senderDate}>
            {moment(item?.conversationId?.updatedAt).format('L')}
          </CText>
        </View>
        </LinearGradient>
  
      </View>
    
    );
  };

  return (
  
      <View style={Styles.subcontainer}>
        
        <View >
        <LinearGradient colors=  {['#FB7C5F', '#DF525B']} style={{...Styles.messageHeader,width:"100%",  padding:0, margin:0,     paddingHorizontal: 20,
     paddingVertical: 25,}}  >
          <Pressable onPress={()=>navigation.goBack()}>
          <CIcon
            type="AntDesign"
            name="left"
            color={themes.light.colors.tertiary}
            size={25}
          />
          </Pressable>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
              {
                userMessage[0]?. photo == undefined ?
             <ProgressiveImage
              source={Profile}
              resizeMode="contain"
              style={{width: 48, height: 48, borderRadius: 48/2}}
            /> 


                :<Image  resizeMode="contain"  style={{width: 50, height: 50, borderRadius:50/2}} source={{uri: BASE_URL_IMG + userMessage[0]?. photo}} />

          }
            
            <View style={{flex: 1, paddingHorizontal: 10, paddingLeft: 20}}>
              <>
                <CText style={Styles.profileName}>{userMessage[0]?.fullName ? userMessage[0]?.fullName : userMessage[0]?.firstName}</CText>
              </>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={Styles.onlineView} />
                <CText style={Styles.online}>{`Available`}</CText>
              </View>
            </View>
          </View>
          <View>
            <ProgressiveImage
              source={Menu}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
          </View>
          </LinearGradient>
        </View>
       


        
        {
          messages != undefined && messages.length >= 0 && (
            <FlatList
              style={{height: 550}}
              nestedScrollEnabled
              data={messages}
              renderItem={({item}) => renderProfile(item)}
            />
          )
          // messages.map(item => renderProfile(item))
        }

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            // position:"absolute",
             
            // top:200,
            // alignItems:"center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            // backgroundColor:"yellow"
          }}>
          <View
            style={{
              backgroundColor: themes.light.colors.primary,
              padding: 5,
              width: 45,
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              borderRadius: 10,
            }}>
              <Pressable onPress={()=>openLibrary()}>
            <ProgressiveImage
              source={CemeraPhoto}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
            </Pressable>
          </View>


          <View style={{flex: 1, marginLeft: 20, marginTop: 5}}>
            <CInput
              placeholder={'Send Messgae'}
              value={message}
              toggleRightIconFunc={sendMessage}
              styles={{flex: 1}}
              onChangeText={setMessage}
              inputInnerContainerStyle={Styles.inputInnerContainerStyle}
              sec
              // rightIconName={CardIcon}
              rightIconType="Feather"
              rightIconName="send"
              rightIconeSize={20}
              rightIconeColor={themes.light.colors.primary}
              returnKeyType="done"
              onSubmitEditing={() => sendMessage()}
            />
          </View>
        </View>
        {/* <CList
            style={}
            // numColumns={2}
            //   horizontal
            // contentContainerStyle={[GlobalStyle.list, ]}
            data={data}
            // loading={reduxState.loading}
            renderItem={renderProfile}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              // icon: require('../../assets/images/empty.png'), 
              text: 'Store not found',
            }}
            // onRefreshLoading={reduxState.loading}
            // onRefreshHandler={() => onRefreshHandler()}
            // onEndReached={onEndReached}
            // onEndReachedThreshold={0.1}
            // maxToRenderPerBatch={10}
            // windowSize={10}
          /> */}
        {/* </ScrollView> */}
      </View>


    // </Container>
    
  );
};

export default Managers;
const styles = StyleSheet.create({});
