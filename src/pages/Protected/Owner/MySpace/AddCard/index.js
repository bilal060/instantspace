/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Container, CountriesModal} from '../../../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Dimensions, Modal, View} from 'react-native';
import AuthStyle from '../MySpace.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {
  //   AddCard,
  Facebook,
  Google,
  LoginImg,
  Profile,
} from '../../../../../assets/images';
import {BASE_URL_IMG} from '../../../../../config/webservices';
import {
  add_CustomerCard,
  add_vehicle,
  get_CustomerCard,
} from '../../../../../redux/actions/Root.Action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalStyle from '../../../../../assets/styling/GlobalStyle';
const {width, height} = Dimensions.get('screen');

function AddCard({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, selectValue] = useState(false);

  const reduxState = useSelector(({auth, language, root}) => {
     console.log("-----cards---")
     console.log(root?.cards)
  //  Alert.alert(root?.card)
    return {
      spaces: root?.spaces,
      userRole: auth?.user?.role,
      loading: root?.vehicleLoading,
      userId: auth?.user?._id,
    };
  });
  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: true,

    headerTitle: 'Add Card',
    headerRight: false,
    backGroundColor: 'red',
    isShowLinerar: true,
  };
  useEffect(() => {
    getCard();
  }, []);

  const getCard = () => {
    // Alert.alert(reduxState?.userId);
     dispatch(get_CustomerCard(reduxState?.userId ));
  };

  const submit = values => {
    const payload = {
      userId: reduxState?.userId,
      cardNo: values?.cardNo?.trim(),
      expMonth: values?.expMonth?.split('/')[0],
      expYear: values?.expMonth?.split('/')[1],
      cvc: values?.cvc,
      name: values?.fullName,
     
    };
    dispatch(add_CustomerCard(payload, cardsCallBack));
  
  };
  const cardsCallBack = res => {
    if (res) {
      getCard ();
      navigation.goBack();
    }
  };
  const data = [
    {name: 'Kenworth'},
    {name: 'Peterbilt'},
    {name: 'Toyata'},
    {name: 'Suzuki'},
    {name: 'Mack Trucks'},
    {name: 'Honda'},
  ];
  const dataYear = [
    {name: '2023'},
    {name: '2022'},
    {name: '2021'},
    {name: '2020'},
    {name: '2019'},
    {name: '2018'},
    {name: '2017'},
    {name: '2016'},
    {name: '2015'},
    {name: '2014'},
    {name: '2013'},
    {name: '2012'},
    {name: '2011'},
    {name: '2010'},
  ];
  const dataTypes = [
    {name: 'Dump'},
    {name: 'Water'},
    {name: 'Bulldozers'},
    {name: 'Front Loaders'},
    {name: 'Grader'},
    {name: 'Cranes'},
    {name: 'Loaders'},
    {name: 'Compactors'},
  ];

  return (
    <Container
      backgroundColor={'theme-color'}
      showPattern={true}
      scrollView={true}
      style={AuthStyle.style}
      headerProps={headerProps}
      loading={reduxState?.loading}
      scrollViewProps={{
        contentContainerStyle: AuthStyle.container,
      }}>
      {/* <CPagination /> */}
      <CForm
        user={reduxState?.user}
        submit={submit}
        loading={reduxState?.loading}
        onForgotPress={() => navigation.navigate('Forgot')}
        onCancelPress={() => navigation.goBack()}
      />
    </Container>
  );
}
export default AddCard;
