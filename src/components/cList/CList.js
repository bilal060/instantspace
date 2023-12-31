/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, RefreshControl, View, ActivityIndicator} from 'react-native';
import {CEmpty, CLoading} from '../../components';
import styles from './CListStyle';
import {themes as Theme} from '../../theme/colors';

function CList(props) {
  const {
    data,
    loading,
    contentContainerStyle,
    onRefreshLoading,
    onRefreshHandler,
    isShowFooter,
    onEndReached,
    scrollEventThrottle,
    onEndThreshold,
    emptyOptions,
    numColumns,
    emptycomponent
  } = props;
  const renderFooterFunc = () => {
    if (isShowFooter) {
      return (
        <View style={styles.listFooter}>
          <ActivityIndicator
            size="large"
            color={Theme['light'].colors.primary}
          />
        </View>
      );
    }
    return null;
  };
  return (
    <View style={styles.listContainer}>
      {loading ? (
        <CLoading transparent={true} loading={true} />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          {...props}
          data={data}
          nestedScrollEnabled
          extraData={data}
          refreshControl={
            onRefreshHandler ? (
              <RefreshControl
                color={Theme['light'].colors.primary}
                tintColor={Theme['light'].colors.primary}
                refreshing={onRefreshLoading}
                onRefresh={onRefreshHandler}
              />
            ) : null
          }
          ListFooterComponent={renderFooterFunc}
          contentContainerStyle={[
            contentContainerStyle,
            {flexGrow: data && data.length ? null : 1, position: 'relative'},
          ]}
           onEndReached={onEndReached}
         
          onEndReachedThreshold={onEndThreshold}
          scrollEventThrottle={scrollEventThrottle}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={
          <CEmpty {...emptyOptions}>
           {emptycomponent && emptycomponent()}
         </CEmpty>
            }
          numColumns={numColumns}
        />
      )}
    </View>
  );
}

CList.defaultProps = {
  style: {},
  contentContainerStyle: {},
  data: [],
  loading: false,
  onRefreshLoading: false,
  onRefreshHandler: null,
};

export default CList;
