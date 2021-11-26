import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <View>
      <TextInput
        onChangeText={props.onChangeText}
        style={{ ...styles.input, ...props.style }}
        placeholder={props.placeholder}
        type={props.type ? props.type : "text"}
        secureTextEntry={props.secureTextEntry}
        defaultValue={props.defaultValue}
        blurOnSubmit={true}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 56,
    borderRadius: 52,
    backgroundColor: "#E1E1E1",
    paddingLeft: 30,
  },
});
export default Input;
