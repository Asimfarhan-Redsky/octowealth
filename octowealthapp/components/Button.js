import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { style } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import { buttonTextColor } from "../constants/colors";
import { LOGIN } from "../constants/constants";

const { alignJustifyCenter, borderRadius8, flexDirectionRow } = BaseStyle;

const Button = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={
          props?.buttonStyle
            ? props?.buttonStyle
            : [
                styles.container,
                alignJustifyCenter,
                flexDirectionRow,
                borderRadius8,
              ]
        }
        onPress={props.onPress}
        activeOpacity={0.9}
      >
        {props.showPlusIcon && (
          <Feather name={"plus"} size={22} color={buttonTextColor} />
        )}
        <Text
          style={[
            props?.textStyle ? props?.textStyle : styles.buttonText,
            { marginLeft: props.showPlusIcon ? 6 : "" },
          ]}
        >
          {props?.buttonText ? props?.buttonText : LOGIN}
        </Text>
        {props.showIcon && (
          <Ionicons
            name={"chevron-forward-outline"}
            size={25}
            color={buttonTextColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(85),
    height: hp(6),
    backgroundColor: buttonTextColor,
    display: "flex",
  },
  buttonText: {
    // marginHorizontal:
    fontSize: style.fontSizeNormal2x.fontSize,
  },
});
export default Button;
