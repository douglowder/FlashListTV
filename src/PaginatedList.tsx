/** *
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import useBackNavigation from './useBackNavigation';

/** *
 * To test out just copy this component and render in you root component
 */
const PaginatedList = ({navigation}: {navigation: any}) => {
  const _generateArray = (start: number, size: number) => {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
      arr[i] = start + i;
    }
    return arr;
  };

  const [elems, setElems] = React.useState(_generateArray(0, 20));

  useBackNavigation(navigation);

  return (
    <FlashList
      keyExtractor={(item: number) => {
        return item.toString();
      }}
      renderItem={({item}: {item: number}) => {
        const backgroundColor = item % 2 === 0 ? '#00a1f1' : '#ffbb00';
        return (
          <Pressable onPress={() => {}}>
            <View style={{...styles.container, backgroundColor}}>
              <Text>Cell Id: {item}</Text>
            </View>
          </Pressable>
        );
      }}
      estimatedItemSize={100}
      onEndReached={() => {
        // Since FlatList is a pure component, data reference should change for a render
        setElems([...elems, ..._generateArray(elems.length, 20)]);
      }}
      onEndReachedThreshold={0.2}
      data={elems}
    />
  );
};

export default PaginatedList;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#00a1f1',
  },
});
