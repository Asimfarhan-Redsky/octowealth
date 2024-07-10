import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { style, spacings } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import { APPLE_LOGO, FACEBOOK_LOGO, GOOGLE_LOGO } from "../assets/images";
import { inputBorderColor, textColor } from "../constants/colors";

const {
  alignJustifyCenter,
  borderRadius10,
  alignItemsCenter,
  flexDirectionRow,
  resizeModeContain,
} = BaseStyle;
export default function SocialLogin({ text }) {
  return (
    <View style={[styles.container, alignItemsCenter]}>
      <View
        style={[
          flexDirectionRow,
          alignJustifyCenter,
          { marginBottom: spacings.Large2x, width: wp(100) },
        ]}
      >
        <View style={styles.line}></View>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.line}></View>
      </View>
      <View style={[flexDirectionRow]}>
        <TouchableOpacity style={[styles.imgContainer, alignJustifyCenter]}>
          <Image
            source={FACEBOOK_LOGO}
            style={[styles.image, resizeModeContain]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.imgContainer, alignJustifyCenter]}>
          <Image
            source={GOOGLE_LOGO}
            style={[styles.image, resizeModeContain]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.imgContainer, alignJustifyCenter]}>
          <Image
            source={APPLE_LOGO}
            style={[styles.image, resizeModeContain]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    fontSize: style.fontSizeNormal.fontSize,
    color: textColor,
    marginHorizontal: spacings.normalx,
  },
  line: {
    width: "35%",
    height: 1,
    backgroundColor: inputBorderColor,
  },
  imgContainer: {
    width: wp(28),
    height: hp(8),
    borderRadius: 10,
    borderColor: inputBorderColor,
    borderWidth: 2,
    marginHorizontal: spacings.normal,
  },
  image: { width: wp(8), height: hp(4.5) },
});
