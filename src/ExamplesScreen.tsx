import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {DebugButton} from './Debug';
import {RootStackParamList} from './constants';

import 'react-native/tvos-types.d';

interface ExampleItem {
  title: string;
  destination: keyof RootStackParamList;
  tv?: boolean;
}

export const ExamplesScreen = () => {
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamList, 'Examples'>>();

  const onDebugButton = () => {
    navigate('Debug');
  };

  const data: ExampleItem[] = [
    {title: 'List', destination: 'List', tv: true},
    {title: 'PaginatedList', destination: 'PaginatedList', tv: true},
    {title: 'Reminders', destination: 'Reminders'},
    {title: 'Twitter Timeline', destination: 'Twitter', tv: true},
    {
      title: 'Twitter FlatList Timeline',
      destination: 'TwitterFlatList',
      tv: true,
    },
    {
      title: 'Contacts',
      destination: 'Contacts',
    },
    {
      title: 'Contacts SectionList',
      destination: 'ContactsSectionList',
    },
    {
      title: 'Messages',
      destination: 'Messages',
    },
    {
      title: 'Messages FlatList',
      destination: 'MessagesFlatList',
    },
    {
      title: 'Twitter Benchmark',
      destination: 'TwitterBenchmark',
      tv: true,
    },
    {
      title: 'Twitter Custom Cell Container',
      destination: 'TwitterCustomCellContainer',
      tv: true,
    },
  ];
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlatList
        testID="ExamplesFlatList"
        keyExtractor={(item: {destination: any}) => item.destination}
        data={data.filter(item => item.tv || !Platform.isTV)}
        renderItem={(x: {item: any}) => (
          <Pressable
            style={(s: {pressed: boolean; focused: boolean}) =>
              s.pressed || s.focused
                ? [styles.row, styles.rowHighlighted]
                : styles.row
            }
            onPress={() => {
              navigate(x.item.destination);
            }}
            testID={x.item.title}>
            <Text style={styles.rowTitle}>{x.item.title}</Text>
          </Pressable>
        )}
      />
      <DebugButton onPress={onDebugButton} />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowHighlighted: {
    backgroundColor: '#ddd',
  },
  rowTitle: {
    fontSize: 18,
  },
});
