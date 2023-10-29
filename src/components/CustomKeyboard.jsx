import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, View } from "react-native";
import { keys } from "../helpers/constants";
import { KeyButton } from "./KeyButton";

export const CustomKeyboard = ({
  keyboardVisible,
  setSelection,
  setValue,
  inputRef,
}) => {
  const [upperCase, setUpperCase] = useState(false);

  const slideAnim = useRef(new Animated.Value(70)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: keyboardVisible ? 0 : 70,
      duration: 70,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [keyboardVisible, slideAnim]);

  const onPressKey = useCallback(
    (key) => {
      setSelection((prevSelection) => {
        setValue(
          (prevVal) =>
            `${prevVal.slice(0, prevSelection.start)}${key}${prevVal.slice(
              prevSelection.start
            )}`
        );
        return { start: prevSelection.start + 1, end: prevSelection.start + 1 };
      });
    },
    [setSelection, setValue]
  );

  const onPressSpace = useCallback(() => {
    setSelection((prevSelection) => {
      setValue(
        (prevVal) =>
          `${prevVal.slice(0, prevSelection.start)} ${prevVal.slice(
            prevSelection.start
          )}`
      );
      return { start: prevSelection.start + 1, end: prevSelection.start + 1 };
    });
  }, [setSelection, setValue]);

  const onPressDelete = useCallback(() => {
    setSelection((prevSelection) => {
      console.log(prevSelection);
      if (prevSelection.end !== 0) {
        if (prevSelection.start >= 0) {
          if (prevSelection.start !== prevSelection.end) {
            setValue(
              (prevVal) =>
                `${prevVal.slice(0, prevSelection.start)}${prevVal.slice(
                  prevSelection.end,
                  prevVal.length
                )}`
            );
            if (Platform.OS === "ios") {
              inputRef.current.setNativeProps({
                selection: { start: prevSelection.end, end: prevSelection.end },
              });
            }
            return { start: prevSelection.start, end: prevSelection.start };
          } else {
            setValue(
              (prevVal) =>
                `${prevVal.slice(0, prevSelection.start - 1)}${prevVal.slice(
                  prevSelection.start
                )}`
            );
            return {
              start: Math.max(prevSelection.start - 1, 0),
              end: Math.max(prevSelection.start - 1, 0),
            };
          }
        }
      } else {
        return prevSelection;
      }
    });
  }, [inputRef, setSelection, setValue]);

  const onPressUppercase = useCallback(() => {
    setUpperCase((prevVal) => !prevVal);
  }, []);

  const onPress = useCallback(
    (key) => {
      switch (key) {
        case "space":
          return onPressSpace();
        case "delete":
          return onPressDelete();
        case "^":
          return onPressUppercase();
        default:
          return onPressKey(key);
      }
    },
    [onPressDelete, onPressKey, onPressSpace, onPressUppercase]
  );

  return (
    <Animated.View
      style={[
        styles.keyboard,
        {
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        },
      ]}
    >
      {keys.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.row}>
            {row.map((key, index) => (
              <KeyButton
                onPress={onPress}
                upperCase={upperCase}
                value={key}
                key={`key_${index}`}
              />
            ))}
          </View>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    backgroundColor: "#202020",
    paddingVertical: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  key: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
  },
});
