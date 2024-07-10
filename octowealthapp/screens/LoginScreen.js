import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "../components/InputField";
import Button from "../components/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { style, spacings } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import {
  DO_NOT_HAVE_AN_ACCONT,
  EMAIL_ERROR,
  EMAIL_VALID_ERROR,
  ENTER_YOUR_EMAIL,
  ENTER_YOUR_PASSWORD,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SCREEN,
  LOGIN,
  OR_LOGIN_WITH,
  PASSWORD_ERROR,
  REGISTER_NOW,
  SIGNUP_SCREEN,
  WELCOME_BACK,
} from "../constants/constants";
import SocialLogin from "../components/SocialLogin";
import {
  blackColor,
  buttonTextColor,
  darkRedColor,
  errorColor,
  inputBackgroundColor,
  inputBorderColor,
  linkTextColor,
  textColor,
} from "../constants/colors";
import { useDispatch } from "react-redux";
import { setLogedinUser } from "../redux/slices/userLogedinSlice";

const {
  alignJustifyCenter,
  borderRadius10,
  alignSelfEnd,
  justifyContentEnd,
  textAlign,
} = BaseStyle;


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEmptyError, setEmailEmptyError] = useState(false);
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const dispatch = useDispatch();

  const validateEmail = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailFormatError(!isValidEmail);
    return isValidEmail;
  };

  const handleLogin = async () => {
    setEmailEmptyError(false);
    setPasswordEmptyError(false);
    setEmailFormatError(false);

    let isValid = true;

    if (email.trim() === "") {
      setEmailEmptyError(true);
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordEmptyError(true);
      isValid = false;
    }

    if (isValid) {
      if (validateEmail()) {
        try {
          await AsyncStorage.setItem("isLoggedIn", email);
          dispatch(setLogedinUser(email));
          navigation.navigate("HomeScreen");
        } catch (error) {
          console.log("Error saving authentication state:", error);
          // Handle error saving authentication state
        }
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate(SIGNUP_SCREEN);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[styles.backIconStyle, alignJustifyCenter]}
          onPress={handleGoBack}
        >
          <Ionicons
            name={"chevron-back-outline"}
            size={24}
            color={blackColor}
          />
        </TouchableOpacity>
        <Text style={styles.headingText}>{WELCOME_BACK}</Text>
      </View>
      <View style={[styles.inputContainer, alignJustifyCenter]}>
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder={ENTER_YOUR_EMAIL}
          secureTextEntry={false}
          style={[
            styles.input,
            {
              marginBottom:
                emailEmptyError || emailFormatError
                  ? spacings.large
                  : spacings.xLarge,
            },
            (emailEmptyError || emailFormatError) && styles.inputError,
          ]}
        />
        {emailEmptyError && <Text style={styles.errorText}>{EMAIL_ERROR}</Text>}
        {emailFormatError && (
          <Text style={styles.errorText}>{EMAIL_VALID_ERROR}</Text>
        )}
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder={ENTER_YOUR_PASSWORD}
          secureTextEntry={true}
          style={[
            styles.input,
            passwordEmptyError && styles.inputError,
            {
              marginBottom: spacings.large,
            },
          ]}
          icon="secureIcon"
        />
        {passwordEmptyError && (
          <Text style={styles.errorText}>{PASSWORD_ERROR}</Text>
        )}
        <Text
          style={[
            styles.text,
            alignSelfEnd,
            { marginBottom: spacings.ExtraLarge, marginTop: spacings.xLarge },
          ]}
          onPress={() => navigation.navigate(FORGOT_PASSWORD_SCREEN)}
        >
          {FORGOT_PASSWORD}
        </Text>
        <Button
          buttonText={LOGIN}
          buttonStyle={[styles.buttonStyle, alignJustifyCenter, borderRadius10]}
          textStyle={styles.buttonText}
          onPress={handleLogin}
        />
      </View>

      <SocialLogin text={OR_LOGIN_WITH} />
      <View style={[styles.textContainer, justifyContentEnd]}>
        <Text
          style={[styles.text, textAlign, { color: blackColor }]}
          onPress={handleSignUp}
        >
          {DO_NOT_HAVE_AN_ACCONT}
          <Text
            style={{
              color: linkTextColor,
              fontWeight: style.fontWeightMedium1x.fontWeight,
            }}
            onPress={handleSignUp}
          >
            {REGISTER_NOW}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: spacings.ExtraLarge5x,
    paddingHorizontal: spacings.Large2x,
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
  inputError: {
    borderColor: errorColor,
  },
  errorText: {
    width: "100%",
    color: errorColor,
    textAlign: "left",
    fontSize: style.fontSizeNormal.fontSize,
    marginBottom: spacings.large,
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
    flex: 1,
  },
});

export default LoginScreen;
