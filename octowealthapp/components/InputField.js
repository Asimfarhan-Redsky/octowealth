import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { spacings } from "../shared/constants/fonts";
import { EYE_OF_ICON, EYE_SHOW_ICON } from "../assets/images";
import { brownGray } from "../constants/colors";

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  icon,
  placeholderColor,
  keyboardType,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  return (
    <View style={styles.container}>
      <TextInput
        style={style ? style : styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry && isPasswordVisible ? true : false}
      />
      {icon && (
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Image
            source={isPasswordVisible ? EYE_SHOW_ICON : EYE_OF_ICON}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: spacings.xLarge,
  },
  icon: {
    position: "absolute",
    right: 8,
    zIndex: 1,
    bottom: -11,
    width: 25,
    height: 25,
    tintColor: brownGray,
  },
});

export default React.memo(InputField);
