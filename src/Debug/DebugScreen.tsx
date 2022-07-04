import React, {useContext} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {TextInput} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';

import {DebugContext, DebugContextInterface} from './DebugContext';
import {getDebugItems, DebugItem, DebugOptionType} from './DebugOptions';
import useBackNavigation from '../useBackNavigation';

const DebugScreen = ({navigation}: {navigation: any}) => {
  useBackNavigation(navigation);
  const debugContext = useContext<DebugContextInterface>(DebugContext);
  const debugItems = getDebugItems(debugContext);
  const {colors} = useTheme();

  const styles = themedStyles(colors);

  const renderItem = ({item}: {item: DebugItem}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowTitle}>{item.name}</Text>
        {renderInput(item)}
      </View>
    );
  };

  return (
    <FlashList
      keyExtractor={(item: DebugItem) => {
        return item.name;
      }}
      renderItem={renderItem}
      estimatedItemSize={44}
      ItemSeparatorComponent={Divider}
      data={debugItems}
    />
  );
};

const Divider = () => {
  const {colors} = useTheme();
  const styles = themedStyles(colors);
  return <View style={styles.divider} />;
};

const renderInput = (item: DebugItem) => {
  if (item.type === DebugOptionType.Switch) {
    return (
      <Switch
        onValueChange={value => {
          item.onValue(value);
        }}
        value={item.value}
        testID={item.testID}
      />
    );
  } else if (item.type === DebugOptionType.Input) {
    return (
      <TextInput
        onChangeText={value => {
          item.onValue(Number(value));
        }}
        placeholder="Set value"
        value={item.value?.toString()}
        keyboardType="number-pad"
      />
    );
  }
};

export default DebugScreen;

const themedStyles = (colors: {
  primary: any;
  background?: string;
  card: any;
  text?: string;
  border: any;
  notification?: string;
}) =>
  StyleSheet.create({
    row: {
      flex: 1,
      backgroundColor: colors.card,
      height: 44,
      paddingLeft: 16,
      paddingRight: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowTitle: {
      fontSize: 18,
      color: colors.primary,
    },
    divider: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    },
  });
