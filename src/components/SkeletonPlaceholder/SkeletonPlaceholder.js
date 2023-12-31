/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const SkeletonPlaceholderComponent = ({
  layout,
  isAtom,
  SkelonStyle,
  loading,
  children,
}) => {
 // console.log('children', children);
  //console.log('skeleton', SkelonStyle);
  return (
    //   <View>{loader ? SkelonStyle : children}</View>;
    <SkeletonContent
      isLoading={loading}
      layout={layout}
      containerStyle={[styles.container, isAtom && {flex: undefined}]}>
      {children}
    </SkeletonContent>
  );
};

export default SkeletonPlaceholderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
  },
});
