import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import InputField from "../components/InputField";
import Button from "../components/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { style, spacings } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import {
  ALREADY_HAVE_ACCOUNT,
  CONFIREM_PASSWORD,
  EMAIL,
  HELLO_REGISTER_TO_GET,
  LOGIN_NOW,
  OR_REGISTER_WITH,
  PASSWORD,
  REGISTER,
  USERNAME,
} from "../constants/constants";
import SocialLogin from "../components/SocialLogin";
import {
  blackColor,
  buttonTextColor,
  darkRedColor,
  inputBackgroundColor,
  inputBorderColor,
  linkTextColor,
  textColor,
} from "../constants/colors";

const { alignJustifyCenter, borderRadius10, justifyContentEnd, textAlign } =
  BaseStyle;

function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
        <Text style={styles.headingText}>{HELLO_REGISTER_TO_GET}</Text>
      </View>
      <View style={[styles.inputContainer, alignJustifyCenter]}>
        <InputField
          value={username}
          onChangeText={setUsername}
          placeholder={USERNAME}
          secureTextEntry={false}
          style={[styles.input, { marginBottom: spacings.xLarge }]}
        />
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder={EMAIL}
          secureTextEntry={false}
          style={[styles.input, { marginBottom: spacings.xLarge }]}
        />
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder={PASSWORD}
          secureTextEntry={true}
          style={[styles.input, { marginBottom: spacings.xLarge }]}
        />
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder={CONFIREM_PASSWORD}
          secureTextEntry={true}
          style={[styles.input, { marginBottom: spacings.Large2x }]}
        />
        <Button
          buttonText={REGISTER}
          buttonStyle={[styles.buttonStyle, alignJustifyCenter, borderRadius10]}
          textStyle={styles.buttonText}
          // onPress={handleLogin}
        />
      </View>

      <SocialLogin text={OR_REGISTER_WITH} />
      <View style={[styles.textContainer, justifyContentEnd]}>
        <Text style={[styles.text, textAlign, { color: blackColor }]}>
          {ALREADY_HAVE_ACCOUNT}
          <Text
            style={{
              color: linkTextColor,
              fontWeight: style.fontWeightMedium1x.fontWeight,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            {LOGIN_NOW}
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

export default SignupScreen;
