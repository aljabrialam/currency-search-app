import React from 'react';
import {View, TextInput, Pressable, Text, StyleSheet} from 'react-native';

export default function SearchBar({
  value,
  onChange,
  onBack,
  onClear,
  placeholder = 'Search by name or symbol...',
}: Readonly<{
  value: string;
  onChange: (v: string) => void;
  onBack: () => void; // cancel search
  onClear: () => void; // clear & stay in search
  placeholder?: string;
}>) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} accessibilityLabel="Back">
        <Text style={styles.icon}>←</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#000"
        autoFocus
      />
      <Pressable onPress={onClear} accessibilityLabel="Clear">
        <Text style={styles.icon}>✕</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {flex: 1, paddingHorizontal: 12, paddingVertical: 8, fontSize: 16, color: '#000'},
  icon: {fontSize: 20, padding: 8},
});
