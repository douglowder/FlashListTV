import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {DebugContext} from '../Debug';
import useBackNavigation from '../useBackNavigation';

import {tweets} from './data/tweets';
import TweetCell from './TweetCell';
import {Header, Footer, Divider, Empty} from './Twitter';

const TwitterFlatList = ({navigation}: {navigation: any}) => {
  const debugContext = useContext(DebugContext);
  useBackNavigation(navigation);
  return (
    <View style={styles.container}>
      <FlatList
        testID="FlatList"
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return <TweetCell tweet={item} />;
        }}
        ListHeaderComponent={Header}
        ListHeaderComponentStyle={styles.header}
        ListFooterComponent={Footer}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={Empty()}
        data={debugContext.emptyListEnabled ? [] : tweets}
        initialScrollIndex={debugContext.initialScrollIndex}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 1000,
        }}
        onViewableItemsChanged={(info) => {
          console.log(info);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ccc',
  },
});

export default TwitterFlatList;
