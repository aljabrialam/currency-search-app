import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function EmptyView({
  message = 'No items found.',
}: Readonly<{
  message?: string;
}>) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {padding: 24, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 16, opacity: 0.6},
});
