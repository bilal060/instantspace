import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CButton, CText, RadioButton} from '../../components';
import Styles from './PackageCard.style';
import {FlatList} from 'react-native-gesture-handler';
const PackageCard = ({name = '', data, onBtnPress}) => {
  const renderFeatures = title => {
    return (
      <CText style={Styles.packageDetails}>
        {'-'} {title}
      </CText>
    );
  };
  const renderPrizeBox = () => (
    <View style={Styles.prizeCard}>
      <CText style={Styles.packageSubName}>Full Time</CText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <CText style={Styles.packageprize}>$25</CText>
        <RadioButton value={false} />

        {/* <Rad */}
      </View>
    </View>
  );
  return (
    <View style={{paddingVertical: 10}}>
      <CText style={Styles.packageName}>{name}</CText>
      {data && data.map(({title}) => renderFeatures(title))}

      <CText style={Styles.selectPackage}>{'Select Package'}</CText>
      <FlatList
        data={data}
        renderItem={renderPrizeBox}
        horizontal
        nestedScrollEnabled
      />
      <CButton
        title="Next"
        iconType="left"
        iconStyle={{}}
        onPress={onBtnPress}
      />
    </View>
  );
};

export default PackageCard;

const styles = StyleSheet.create({});
