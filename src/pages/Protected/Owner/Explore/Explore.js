/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
  Alert,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Container} from '../../../../containers';
import {
  BookingCard,
  CInput,
  CList,
  CText,
  ProgressiveImage,
  SpaceCard,
} from '../../../../components';
import {
  Banner,
  Car,
  Carrier,
  ChargingStation,
  Crane,
  Forklift,
  GasStation,
  Inventory,
  PitStop,
  Profile,
  Towtruck,
  Van,
  Warehouse,
  Wrench,
  HowItworks,
} from '../../../../assets/images';
import Styles from './Explore.style';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';

import {SliderBox} from 'react-native-image-slider-box';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL_IMG} from '../../../../config/webservices';
import LinearGradient from 'react-native-linear-gradient';
import {
  getSpacsss,
  get_all_category,
} from '../../../../redux/actions/Root.Action';
import SkeletonPlaceholderComponent from '../../../../components/SkeletonPlaceholder/SkeletonPlaceholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {themes} from '../../../../theme/colors';
const width = Dimensions.get('screen').width;
const Explore = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeImg, setActiveImg] = useState(0);
  const [categories, setCategories] = useState([]);
  const [spaces, setSpaces] = useState([]);

  var isActive;

  const reduxState = useSelector(({auth, language, root}) => {

    return {
      userRole: auth?.user?.role,
      user: auth?.user,
    };
  });
  var convertedFilePath = `${BASE_URL_IMG}${reduxState?.user?.photo}`.replace(
    /\\/g,
    '/',
  );

  const images = [
    Banner,
    Banner,
    
  
  ];
  const listData = [
    {
      img: Van,
      title: 'Truck Parking',
    },
    {
      img: Car,
      title: 'Car Parking',
    },
    {
      img: Warehouse,
      title: 'Warehouse',
    },
    // {
    //   img: Inventory,
    //   title: 'Temporary Storage',
    // },
    {
      img: Inventory,
      title: 'Storage Unit',
    },

    // {
    //   img: Carrier,
    //   title: 'Container Storage',
    // },
    {
      img: Wrench,
      title: 'Mechanic',
    },
    {
      img: Towtruck,
      title: 'Tow Truck',
    },
    {
      img: Forklift,
      title: 'Lifter Service',
    },
    {
      img: Crane,
      title: 'Crane Service',
    },
    {
      img: GasStation,
      title: 'Fuel Station',
    },
    {
      img: ChargingStation,
      title: 'EV Charging Station',
    },
    // {
    //     img: PitStop,
    //     title: 'Tyre Shop',
    //   },
  ];
  const renderItem = ({item}) => {
    

    //  return;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MySpace', item)}
        style={{
          ...Styles.iconView,
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.15,
          // shadowRadius: 3,

          // elevation: 3,

          width: 98,
          backgroundColor: 'white',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          height: 140,
          borderRadius: 7,
          marginLeft: 13,
        }}>
        <View
          style={{backgroundColor: '#EEF3F4', padding: 12, borderRadius: 7}}>
          <ProgressiveImage
            style={Styles.icon}
            source={item?.img}
            z
            resizeMode="contain"
          />
        </View>
        <CText style={{...Styles.iconTitle, marginTop: 7}}>{item?.title}</CText>
      </TouchableOpacity>
    );
  };

  const renderSpaceItem = ({item}) => {
    const data = item?.images?.[0]?.replace(/\\/g, '/');
    // console.log(
    //   '🚀 ~ file: Home.js:76 ~ renderItem ~ data:',
    //   data,
    //   item?.images,
    // );
    // Alert.alert(data);
    // console.log('itemmm');

    return (
      <SpaceCard
        mainContainer={{
          width: spaces?.length > 1 ? width * 0.68 : width * 0.68,
          alignSelf: 'center',
        }}
        name={item?.description}
        phone={item?.contact}
        ratePrize={item?.rate_day}
        address={item?.address}
        capacity={item?.capacity}
        img={data == undefined ? undefined : `${BASE_URL_IMG}${data}`}
         onPress={() => navigation.navigate('SpaceDetails', {item})}
      
      />
    );
  };

  const renderBooking = ({item}) => {
    return <BookingCard />;
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = () => {
    dispatch(get_all_category('', callBack));
  };
  const callBack = res => {
    console.log('🚀 ~ file: Explore.js:148 ~ callBack ~ res:', res?.data);
    const subcategories = res?.data.docs.flatMap(doc => doc.subcategories);
    const categories = [
      {
        img: Van,
        title: 'Truck Parking',
      },
      {
        img: Car,
        title: 'Car Parking',
      },
      {
        img: Warehouse,
        title: 'Warehouse',
      },
    ];
    // here i change subcategories to categories
    const combinedArray = subcategories.map(costItem => {
      const match = listData.find(listItem => listItem.title === costItem.name);
      return {
        name: costItem.name,
        _id: costItem?._id,
        title: match ? match.title : '',
        img: match ? match.img : '',
      };
    });
    //console.log(combinedArray);

    let FinalArray = [];

    for (let index = 0; index < combinedArray.length; index++) {
      const element = combinedArray[index];
      for (let j = 0; j < categories.length; j++) {
        const cat = categories[j];
        if (cat.title == element.title) {
          FinalArray.push(element);
        }
      }
    }

    // setCategories(combinedArray); // usama commit this for show all categories
    setCategories(FinalArray);
  };
  const headerProps = {
    headerTitle: 'Home',
    backButtonIcon: false,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Profile,
    backGroundColor: 'red',
    isShowLinerar: true,
    rightPress: () => navigation.navigate('Profile'),
  };

  useEffect(() => {
   
   StatusBar.setHidden(true)
    dispatch(getSpacsss(1, callBacks));
  
  
    
  }, []);

  const callBacks = res => {
    // Alert.alert("call")
    // console.log('🚀 ~ file: Home.js:276 ~ callBack ~ res:', res);
    if (res && res?.length >= 3) {
       const data = res?.filter((data, idx) => idx < 3);
       setSpaces(data);
    } else {
         setSpaces(res);
    }
  };

  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      scrollView
      // scrollViewProps={{
      //   contentContainerStyle: {
      //     flexGrow: 1,

      //     paddingHorizontal: 0,
      //   },
      // }}
      >
      
       <SafeAreaView
        style={{
          // paddingTop: StatusBar.currentHeight
        }}>
        <LinearGradient colors=  {['#FB7C5F', '#DF525B']}  style={[
          GlobalStyle.row,
          Styles.headerView,
          {
            paddingVertical: '3.5%',
            justifyContent: 'center',
            alignItems: 'center',
        
            
          },
        ]} > 
          {/* <StatusBar setHidden={true} translucent={true} backgroundColor={'#FB7C5F'}/> */}
        <CInput
          placeholder={'Search'}
       
          inputInnerContainerStyle={{...Styles.inputInnerContainerStyle , top:12}}
         
   
          returnKeyType="next"
      
          style={{
            backgroundColor: 'white',
            marginLeft: 10,
            borderRadius: 20,
           
       
           
          }}
          parentStyle={{backgroundColor: 'white', borderRadius: 20, }}
       
        />
        <ProgressiveImage
          style={Styles.profileImage}
          source={!reduxState?.user ? Profile : {uri: convertedFilePath}}
          resizeMode="contain"
        />
        </LinearGradient>
      </SafeAreaView>
       <View style={{backgroundColor: '#f1f6f7', height: '100%', width: '100%'}}>
        <View style={Styles.container}>
          <View style={GlobalStyle.row}>
            <View style={[GlobalStyle.row]}>
              <CText style={{...Styles.mainHeading, marginTop: 0}}>
                Categories
              </CText>
            </View>
            <View>
              {/* <Pressable onPress={()=>navigation.navigate('MySpace')}> */}
              <CText style={Styles.view}>View All</CText>
              {/* </Pressable> */}
            </View>
          </View>

          <CList
            style={Styles.list}
            numColumns={3}
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              text: 'Store not found',
            }}
          />

          <CText style={Styles.mainHeading}>My Spaces</CText>
          <View style={GlobalStyle.row}>
            <View style={[GlobalStyle.row]}>
              <CText style={Styles.subHeading}>Total Spaces:</CText>
              <CText style={Styles.spaceTotal}>{spaces?.length}</CText>
            </View>
            <View>
            <Pressable onPress={()=>navigation.navigate('MySpace')}>
              <CText style={Styles.view}>View All</CText>
              </Pressable>
            </View>
          </View>
           <CList
           
            horizontal
            data={spaces}
            extraData={spaces}
            renderItem={renderSpaceItem}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              text: 'Spaces not found',
            }}
          /> 
             <SliderBox
            images={images}
            onCurrentImagePressed={index => {
              
              isActive = activeImg === index;
            }}
            currentImageEmitter={index => {
              setActiveImg(index);
              isActive = activeImg - 1 === index;
              // console.log(
              //   '🚀 ~ file: Explore.js:134 ~ Explore ~ isActive:',
              //   isActive,
              //   index,
              //   activeImg - 1,
              // );

              // console.warn(`current pos is: ${index}`);
            }}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            dotColor="rgba(255,255,225,1)"
            inactiveDotColor="rgba(63,128,225,1)"
            activeDotColor="rgba(255,255,225,1)"
            paginationBoxVerticalPadding={0}
            paginationBoxStyle={{
              position: 'absolute',
              left: 0,
              bottom: 5,
              padding: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
            // dotStyle={{
            //   width: isActive ? 25 : 10,
            //   height: 10,
            //   borderRadius: 5,
            //   marginHorizontal: -5,
            //   padding: 0,
            //   margin: 0,
            //   backgroundColor: '#000',
            // }}
            dotStyle={{ display: 'none' }}
            ImageComponentStyle={{
              borderRadius: 15,
              width: '90%',
              marginTop: 12,
              alignSelf: 'flex-start',
            }}
            imageLoadingColor="#2196F3"
          />    

          <CText style={{...Styles.mainHeading, marginTop: 17}}>
            How it Works
          </CText>
          <Image
            style={{
              width: Dimensions.get('window').width * 0.96,
              height: Dimensions.get('window').height * 0.9,
              marginTop: 12,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            source={require('../../../../assets/images/howitworks.png')}
          />
        </View>
      </View>  
    </Container>
  );
};

export default Explore;

const styles = StyleSheet.create({});
