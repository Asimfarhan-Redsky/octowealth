import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils/index";
import { style, spacings } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import {
  CONFIREM_PASSWORD,
  CREATE_NEW_PASSWORD,
  CREATE_NEW_PASSWORD_TEXT,
  NEW_PASSWORD,
  RESET_PASSWORD,
} from "../constants/constants";
import SuccessModal from "./modals/SuccessModal";
import {
  buttonColor,
  buttonTextColor,
  darkRedColor,
  inputBackgroundColor,
  inputBorderColor,
  textColor,
} from "../constants/colors";

const { alignJustifyCenter, borderRadius10 } = BaseStyle;

function CreatePassword({ navigation }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleResetPassword = () => {
    setIsModalVisible(true);
  };

  return (
    <View>
      <Text style={styles.headingText}>{CREATE_NEW_PASSWORD}</Text>
      <Text style={[styles.text, { marginTop: spacings.xLarge }]}>
        {CREATE_NEW_PASSWORD_TEXT}
      </Text>
      <View style={[styles.inputContainer, alignJustifyCenter]}>
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder={NEW_PASSWORD}
          secureTextEntry={true}
          style={[styles.input, { marginBottom: spacings.xLarge }]}
        />
        <InputField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={CONFIREM_PASSWORD}
          secureTextEntry={true}
          style={[styles.input, { marginBottom: spacings.xLarge }]}
        />
        <Button
          buttonText={RESET_PASSWORD}
          buttonStyle={[styles.buttonStyle, alignJustifyCenter, borderRadius10]}
          textStyle={styles.buttonText}
          onPress={handleResetPassword}
        />
        <SuccessModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          navigation={navigation}
        />
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
});

export default CreatePassword;
