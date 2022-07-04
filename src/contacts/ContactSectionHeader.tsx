import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';

interface ContactSectionHeaderProps {
  title: string;
}

const ContactSectionHeader = ({title}: ContactSectionHeaderProps) => {
  return (
    <Pressable onPress={() => {}}>
      {({focused}: {focused: boolean}) => (
        <View style={focused ? styles.headerFocused : styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default ContactSectionHeader;

const styles = StyleSheet.create({
  headerTitle: {
    paddingLeft: 10,
    paddingVertical: 4,
  },
  header: {
    backgroundColor: '#FAFAFA',
  },
  headerFocused: {
    backgroundColor: '#FAFAFF',
  },
});
