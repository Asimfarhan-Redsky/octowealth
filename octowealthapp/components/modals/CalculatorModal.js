import React from "react";
import { View, Modal, StyleSheet, SafeAreaView } from "react-native";
import { BaseStyle } from "../../shared/styles/index";
import { modalbackgroundColor } from "../../constants/colors";
import Calculator from "../Calculator";

const { alignJustifyCenter, flex } = BaseStyle;
const CalculatorModal = ({ isVisible, onClose, navigation }) => {
  return (
      <View style={[alignJustifyCenter, flex]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={onClose}
        >
          <View style={[styles.modalContainer, alignJustifyCenter]}>
            <Calculator navigation={navigation} onClose={onClose} />
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
});

export default CalculatorModal;
