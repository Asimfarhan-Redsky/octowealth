import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import InputField from "../components/InputField";
import Button from "../components/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { spacings, style } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import {
  ENTER_YOUR_EMAIL,
  FORGOT_PASSWORD,
  FORGOT_TEXT,
  LOGIN,
  REMEMBER_PASS,
  SEND_CODE,
} from "../constants/constants";
import OtpVerification from "../components/OtpVerification";
import CreatePassword from "../components/CreatePassword";
import {
  blackColor,
  buttonColor,
  buttonTextColor,
  darkRedColor,
  inputBackgroundColor,
  inputBorderColor,
  linkTextColor,
  textColor,
} from "../constants/colors";

const { alignJustifyCenter, borderRadius10, justifyContentEnd, textAlign } =
  BaseStyle;

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [showContent, setShowContent] = useState("ForgotPassword");

  const goToOTPVerify = () => {
    setShowContent("OTPVerify");
  };

  const goToCreateNewPass = () => {
    setShowContent("CreateNewPassword");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backIconStyle, alignJustifyCenter]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name={"chevron-back-outline"}
            size={24}
            color={blackColor}
          />
        </TouchableOpacity>
      </View>
      {showContent === "ForgotPassword" && (
        <View>
          <Text style={styles.headingText}>{FORGOT_PASSWORD}</Text>
          <Text style={[styles.text, { marginTop: spacings.xLarge }]}>
            {FORGOT_TEXT}
          </Text>
          <View style={[styles.inputContainer, alignJustifyCenter]}>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder={ENTER_YOUR_EMAIL}
              secureTextEntry={false}
              style={[styles.input, { marginBottom: spacings.xLarge }]}
            />

            <Button
              buttonText={SEND_CODE}
              buttonStyle={[
                styles.buttonStyle,
                alignJustifyCenter,
                borderRadius10,
              ]}
              textStyle={styles.buttonText}
              onPress={goToOTPVerify}
            />
          </View>

          <View style={[styles.textContainer, justifyContentEnd]}>
            <Text
              style={[styles.text, textAlign, { color: blackColor }]}
              onPress={handleSignUp}
            >
              {REMEMBER_PASS}
              <Text
                style={{
                  color: linkTextColor,
                  fontWeight: style.fontWeightMedium1x.fontWeight,
                }}
                onPress={() => navigation.navigate("Login")}
              >
                {LOGIN}
              </Text>
            </Text>
          </View>
        </View>
      )}
      {showContent === "OTPVerify" && (
        <OtpVerification goTO={goToCreateNewPass} />
      )}
      {showContent === "CreateNewPassword" && (
        <CreatePassword navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: spacings.ExtraLarge5x,
    paddingHorizontal: spacings.Large2x,
  },
  header: {
    width: "100%",
  },
  backIconStyle: {
    display: "flex",
    borderColor: inputBorderColor,
    borderWidth: 2,
    width: 41,
    height: 41,
    borderRadius: 10,
  },
  headingText: {
    fontSize: style.fontSizeLarge3x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    marginTop: spacings.Large2x,
  },
  inputContainer: {
    width: "100%",
    paddingVertical: spacings.ExtraLarge1x,
  },
  input: {
    height: hp(7),
    width: "100%",
    borderColor: inputBorderColor,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: inputBackgroundColor,
    paddingHorizontal: spacings.xLarge,
  },
  text: {
    fontSize: style.fontSizeNormal.fontSize,
    color: textColor,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: spacings.Large2x,
  },

  buttonStyle: {
    width: wp(90),
    height: hp(7),
    backgroundColor: darkRedColor,
    marginTop: spacings.Large2x,
  },
  buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
  },
  textContainer: {
    height: hp(47),
  },
});

export default ForgotPasswordScreen;
