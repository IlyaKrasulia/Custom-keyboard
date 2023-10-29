import { CustomKeyboard } from '../components/CustomKeyboard';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
  Keyboard,
} from 'react-native';

export const HomeScreen = () => {

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleSelectionChange = (event) => {
    setSelection(event.nativeEvent.selection);
  };

  const handlePress = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <TextInput
            ref={inputRef}
            value={value}
            showSoftInputOnFocus={false}
            keyboardType={undefined}
            onFocus={() => {
              setKeyboardVisible(true);
            }}
            onChangeText={setValue}
            placeholder="test"
            onSelectionChange={handleSelectionChange}
            selection={Platform.OS === 'android' ? selection : undefined}
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
          inputRef={inputRef}
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
