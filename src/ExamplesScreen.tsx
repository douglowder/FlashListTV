import React from 'react';
import {StatusBar, StyleSheet, FlatList, Text, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useTheme} from '@react-navigation/native';

import {DebugButton} from './Debug';
import {RootStackParamList} from './constants';

import 'react-native/tvos-types.d';

interface ExampleItem {
  title: string;
  destination: keyof RootStackParamList;
}

export const ExamplesScreen = () => {
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamList, 'Examples'>>();

  const onDebugButton = () => {
    navigate('Debug');
  };

  const {colors} = useTheme();

  const styles = StyleSheet.create({
    row: {
      padding: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowHighlighted: {
      backgroundColor: colors.border,
    },
    rowTitle: {
      fontSize: 18,
      color: colors.primary,
    },
  });

  const data: ExampleItem[] = [
    {title: 'List', destination: 'List'},
    {title: 'PaginatedList', destination: 'PaginatedList'},
    {title: 'Reminders', destination: 'Reminders'},
    {title: 'Twitter Timeline', destination: 'Twitter'},
    {
      title: 'Twitter FlatList Timeline',
      destination: 'TwitterFlatList',
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
    },
    {
      title: 'Twitter Custom Cell Container',
      destination: 'TwitterCustomCellContainer',
    },
  ];
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlatList
        testID="ExamplesFlatList"
        keyExtractor={(item: {destination: any}) => item.destination}
        data={data}
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
            testID={x.item.title}
          >
            <Text style={styles.rowTitle}>{x.item.title}</Text>
          </Pressable>
        )}
      />
      <DebugButton onPress={onDebugButton} />
    </>
  );
};
