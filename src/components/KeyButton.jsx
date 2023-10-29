import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const exception = ['Space', 'Delete', '123', '^', 'Lan'];

export const KeyButton = memo(({ value, upperCase, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.key, value === 'Space' && { width: '30%' }]}
      onPress={() =>
        onPress((upperCase && !exception.includes(value)) ? value.toUpperCase() : value.toLowerCase())
      }
    >
      <Text style={{ textAlign: 'center', color: '#fff' }}>
        {(upperCase && !exception.includes(value)) ? value.toUpperCase() : value.toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  key: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
  },
});
