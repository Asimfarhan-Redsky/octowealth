import React from "react";
import { View, Modal, Image, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../utils/index";
import Button from "../Button";
import {
  BACK_TO_LOGIN,
  PASSWORD_CHNAGED,
  PASSWORD_CHNAGED_SUCCESSFULLY,
} from "../../constants/constants";
import { spacings, style } from "../../shared/constants/fonts";
import { BaseStyle } from "../../shared/styles/index";
import {
  buttonColor,
  buttonTextColor,
  darkRedColor,
  modalbackgroundColor,
} from "../../constants/colors";
import { SUCESS_MODAL_IMAGE } from "../../assets/images";

const {
  alignJustifyCenter,
  borderRadius10,
  alignItemsCenter,
  textAlign,
  resizeModeContain,
  flex,
} = BaseStyle;
const SuccessModal = ({ isVisible, onClose, navigation }) => {
  const handleclosemodal = () => {
    navigation.navigate("Login");
    onClose();
  };
  return (
    <View style={[alignJustifyCenter, flex]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={[styles.modalContainer, alignJustifyCenter]}>
          <View style={[styles.modalContent, alignItemsCenter]}>
            <Image
              source={SUCESS_MODAL_IMAGE}
              style={[styles.image, resizeModeContain]}
            />
            <Text style={styles.heading}>{PASSWORD_CHNAGED}</Text>
            <Text style={[styles.text, textAlign]}>
              {PASSWORD_CHNAGED_SUCCESSFULLY}
            </Text>
            <Button
              buttonText={BACK_TO_LOGIN}
              buttonStyle={[
                styles.buttonStyle,
                alignJustifyCenter,
                borderRadius10,
              ]}
              textStyle={styles.buttonText}
              onPress={handleclosemodal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: modalbackgroundColor,
  },
  modalContent: {
    backgroundColor: buttonTextColor,
    width: wp(90),
    padding: spacings.Large2x,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: style.fontSizeLarge3x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    marginVertical: spacings.xLarge,
  },
  text: {
    marginBottom: spacings.Large2x,
  },
  buttonStyle: {
    width: wp(85),
    height: hp(7),
    backgroundColor: darkRedColor,
    marginBottom: spacings.xLarge,
  },
  buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
  },
});

export default SuccessModal;
