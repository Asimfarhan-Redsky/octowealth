import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  webPlatform,
} from "../utils";
import {
  backgroundColor,
  linkTextColor,
  progressTitleColor,
  whiteColor,
} from "../constants/colors";
import {
  ACCOUNT_OVERVIEW_SCREEN,
  CARD_NUMBER,
  CREDIT_CARDS,
  CVV,
  EXPIRY_DATE,
  PASSWORD,
  SUBMIT,
  USERNAME,
  YOUR_SIGN_AN_INFORMATION_IS_SECURED_BY,
} from "../constants/constants";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";

const {
  width100Percent,
  flex,
  alignJustifyCenter,
  textAlign,
  flexDirectionRow,
  justifyContentSpaceBetween,
} = BaseStyle;

const LoginBankAcScreen = ({ navigation, route }) => {
  const { from, type } = route?.params;

  return (
    <View style={[styles.mainContainer, width100Percent, flex]}>
      <Header
        headerText={"Paypal"}
        cardImage={from.cardImage}
        navigation={navigation}
      />
      <View style={styles.formContainer}>
        <View style={[styles.textInputContainer, width100Percent]}>
          <Text style={[styles.commonTextStyle]}>
            {type === CREDIT_CARDS ? CARD_NUMBER : USERNAME}
          </Text>
          <InputField
            placeholder={
              type === CREDIT_CARDS ? "955 888 444 00" : "Profile_03"
            }
            placeholderColor={progressTitleColor}
            style={[styles.textInput, width100Percent, style.fontSizeNormal1x]}
          />
          <Text style={[styles.commonTextStyle]}>{PASSWORD}</Text>
          <InputField
            placeholder={"*******"}
            placeholderColor={progressTitleColor}
            secureTextEntry={true}
            icon="secureIcon"
            style={[styles.textInput, style.fontSizeNormal1x, width100Percent]}
          />
        </View>
        {type === CREDIT_CARDS && (
          <View
            style={[
              flexDirectionRow,
              width100Percent,
              justifyContentSpaceBetween,
            ]}
          >
            <View style={[styles.textInputContainer]}>
              <Text style={[styles.commonTextStyle]}>{EXPIRY_DATE}</Text>
              <InputField
                style={[
                  styles.textInput,
                  { width: wp(43) },
                  style.fontSizeNormal1x,
                ]}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.textInputContainer]}>
              <Text style={[styles.commonTextStyle]}>{CVV}</Text>
              <InputField
                style={[
                  styles.textInput,
                  { width: wp(43) },
                  style.fontSizeNormal1x,
                ]}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
      </View>
      <View>
        <Button
          buttonText={SUBMIT}
          buttonStyle={[styles.submitBtn, width100Percent, alignJustifyCenter]}
          textStyle={[{ color: whiteColor }, style.fontSizeNormal1x]}
          onPress={() =>
            navigation.navigate(ACCOUNT_OVERVIEW_SCREEN, { card: from })
          }
        />
        <Text
          style={[
            textAlign,
            style.fontSizeNormal,
            {
              paddingHorizontal: spacings.large,
              color: progressTitleColor,
              lineHeight: 18,
            },
          ]}
        >
          {YOUR_SIGN_AN_INFORMATION_IS_SECURED_BY}
        </Text>
      </View>
    </View>
  );
};

export default LoginBankAcScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.xxxxLarge,
    backgroundColor: backgroundColor,
    gap: webPlatform ? null : wp(3.5),
  },
  formContainer: {
    gap: wp(2),
  },
  textInputContainer: {
    gap: webPlatform ? wp(1) : wp(2),
  },
  textInput: {
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    height: hp(8),
    paddingHorizontal: spacings.xxxLarge,
    borderWidth: 1,
    borderColor: "#E8ECF4",
  },
  submitBtn: {
    backgroundColor: linkTextColor,
    height: hp(8),
    borderRadius: 8,
    marginVertical:
      webPlatform ? spacings.ExtraLarge1x : spacings.Large2x,
  },
  commonTextStyle: {
    fontSize: style.fontSizeMedium.fontSize,
    fontWeight: style.fontWeightThin.fontWeight,
    color: linkTextColor,
  },
});
