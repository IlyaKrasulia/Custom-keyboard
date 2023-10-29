import { CustomKeyboard } from '../components/CustomKeyboard';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export const HomeScreen = () => {

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [selection, setSelection] = useState({ start: 1, end: 1 });
  const [value, setValue] = useState('');

  const handleSelectionChange = (event) => {
    setSelection(event.nativeEvent.selection);
  };

  const handlePress = () => {
    setKeyboardVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <TextInput
            value={value}
            selection={selection}
            showSoftInputOnFocus={false}
            keyboardType={undefined}
            onFocus={() => {
              setKeyboardVisible(true);
            }}
            onChangeText={setValue}
            placeholder="test"
            onSelectionChange={handleSelectionChange}
            placeholderTextColor={'#000'}
            style={styles.input}
          />
        </View>
      </TouchableWithoutFeedback>
      {keyboardVisible && (
        <CustomKeyboard
          keyboardVisible={keyboardVisible}
          setSelection={setSelection}
          setValue={setValue}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    borderWidth: 1,
    padding: 15,
    width: '80%',
    marginTop: 100,
  },
});
