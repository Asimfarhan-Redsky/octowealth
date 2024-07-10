import React from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import {
  CONTINUE_AS_A_GUEST,
  EXPENCE_INTRO_SCREEN,
  LOGIN,
  LOGIN_SCREEN,
  REGISTER,
  SIGNUP_SCREEN,
} from "../constants/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { style, spacings } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import { buttonTextColor, darkRedColor } from "../constants/colors";
import {
  LOGO_ICON,
  LOGO_TEXT_WHITE_IMAGE,
  WELCOME_IMAGE,
} from "../assets/images";

const {
  alignJustifyCenter,
  borderRadius10,
  alignItemsCenter,
  textDecorationUnderline,
  resizeModeContain,
  textAlign,
  justifyContentEnd,
} = BaseStyle;

const WelcomeScreen = ({ navigation }) => {
  const onLoginBtnClick = () => {
    navigation.navigate(LOGIN_SCREEN);
  };
  const onRegisterBtnClick = () => {
    navigation.navigate(SIGNUP_SCREEN);
  };
  const onGuestBtnClick = () => {
    navigation.navigate(EXPENCE_INTRO_SCREEN);
  };
  return (
    <ImageBackground
      source={WELCOME_IMAGE}
      style={[styles.container, alignItemsCenter, resizeModeContain]}
    >
      <LinearGradient
        colors={["#3629B7", "transparent"]}
        start={{ x: 0.5, y: 0.8 }} // 0.5, 1 means from bottom
        end={{ x: 0.6, y: 0.5 }} // 0.5, 0 means to top
        style={[{ flex: 1 }, alignItemsCenter]}
      >
        <View style={[styles.logoContainer, alignItemsCenter]}>
          <Image
            source={LOGO_ICON}
            style={[styles.imageStyle, resizeModeContain]}
          />
          <Image
            source={LOGO_TEXT_WHITE_IMAGE}
            style={[styles.logoTextStyle, resizeModeContain]}
          />
        </View>
        <View style={[styles.buttonContainer, justifyContentEnd]}>
          <Button
            buttonText={LOGIN}
            buttonStyle={[
              styles.buttonStyle,
              alignJustifyCenter,
              borderRadius10,
            ]}
            textStyle={styles.buttonText}
            onPress={onLoginBtnClick}
          />
          <Button buttonText={REGISTER} onPress={onRegisterBtnClick} />

          <Text
            style={[styles.text, textDecorationUnderline, textAlign]}
            onPress={onGuestBtnClick}
          >
            {CONTINUE_AS_A_GUEST}
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: wp(100),
    height: hp(100),
    paddingTop: spacings.ExtraLarge4x,
  },
  logoContainer: {
    width: wp(100),
    paddingTop: spacings.ExtraLarge4x,
  },
  imageStyle: {
    width: 58,
    height: 58,
  },
  logoTextStyle: {
    marginTop: spacings.xLarge,
    width: wp(55),
    height: hp(5),
  },
  buttonContainer: {
    flex: 1,
  },
  buttonStyle: {
    width: wp(85),
    height: hp(6),
    backgroundColor: darkRedColor,
    marginBottom: spacings.xLarge,
  },
  buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
  },
  text: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
    marginTop: spacings.xLarge,
    marginBottom: spacings.ExtraLarge4x,
  },
});
export default WelcomeScreen;
