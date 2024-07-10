import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import Button from "../components/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { style, spacings } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import {
  DID_NOT_RECIEVED_CODE,
  LOGIN,
  OTP_VERIFICATION,
  OTP_VERIFICATION_TEXT,
  RESEND,
  VERIFY,
} from "../constants/constants";
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

function OtpVerification({ navigation, goTO }) {
  const [otp, setOtp] = useState("");
  const otpInputRef = useRef();

  const prevOtp = useRef(""); // Ref to store previous OTP value

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleOtpSubmit = () => {
    console.log("otp", otp);
    goTO();
  };

  const handleOtpClear = () => {
    setOtp("");
  };

  useEffect(() => {
    if (otp === "") {
      otpInputRef?.current?.clear();
    }
  }, [otp]);
  return (
    <View>
      <Text style={styles.headingText}>{OTP_VERIFICATION}</Text>
      <Text style={[styles.text, { marginTop: spacings.xLarge }]}>
        {OTP_VERIFICATION_TEXT}
      </Text>
      <View style={[styles.inputContainer, alignJustifyCenter]}>
        <OTPTextView
          ref={otpInputRef}
          containerStyle={styles.otpContainer}
          handleTextChange={handleOtpChange}
          onClear={handleOtpClear}
          inputCount={4}
          keyboardType="numeric"
          textInputStyle={styles.input}
          tintColor="#35c2c1"
        />
        <Button
          buttonText={VERIFY}
          buttonStyle={[styles.buttonStyle, alignJustifyCenter, borderRadius10]}
          textStyle={styles.buttonText}
          onPress={handleOtpSubmit}
        />
      </View>
      <View style={[styles.textContainer, justifyContentEnd]}>
        <Text style={[styles.text, textAlign, { color: blackColor }]}>
          {DID_NOT_RECIEVED_CODE}
          <Text
            style={{
              color: linkTextColor,
              fontWeight: style.fontWeightMedium1x.fontWeight,
            }}
            onPress={() => navigation.navigate(LOGIN)}
          >
            {RESEND}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: style.fontSizeLarge3x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    marginTop: spacings.Large2x,
  },
  otpContainer: {
    marginVertical: spacings.Large2x,
  },
  inputContainer: {
    width: "100%",
    paddingBottom: spacings.ExtraLarge1x,
  },
  input: {
    height: hp(8),
    width: wp(20),
    borderColor: inputBorderColor,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: inputBackgroundColor,
    paddingHorizontal: spacings.xLarge,
    borderBottomWidth: 1,
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
    marginBottom: spacings.xLarge,
  },
  buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
  },
  textContainer: {
    height: hp(42),
  },
});

export default OtpVerification;
