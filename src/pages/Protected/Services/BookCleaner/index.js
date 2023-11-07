import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container, PackageCard} from '../../../../containers';
import {
  CButton,
  CheckBox,
  CList,
  CPagination,
  CText,
  ProgressiveImage,
  RadioButton,
} from '../../../../components';
import Styles from '../Service.style';
import {themes} from '../../../../theme/colors';
import {
  featureData,
  serviceData,
} from '../../../../utils/asyncStorage/Constants';
import {ServiceImg} from '../../../../assets/images';
import {ScrollView} from 'react-native-gesture-handler';

const Service = ({navigation}) => {
  const headerProps = {
    ProgressiveImageHeader: true,
    headerLeft: true,
    backBtnColor: themes.light.colors.fontLowColor,
    headerTransparentStyle: Styles.headerTransparentStyle,
    headerTitleStyle: Styles.headerTitleStyle,
    headerTitle: 'Book a Service',
    headerRight: true,
  };

  return (
    <Container scrollView bottomSpace edges={['left', 'right']} headerProps={headerProps}>
        <View style={Styles.container}>
          <CPagination />
          <View style={{paddingHorizontal: 30, paddingVertical: 25}}>
            <CText style={Styles.heading}>Book a Cleaner</CText>
            <ProgressiveImage
              source={ServiceImg}
              resizeMode="contain"
              style={Styles.cardImg}
            />
            <PackageCard name="Basic" data={featureData}  onBtnPress={()=> navigation.navigate('BookDetails')}/>
            <PackageCard name="Basic" data={featureData} />
          </View>

        </View>
    </Container>
  );
};

export default Service;

const styles = StyleSheet.create({});
