import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import { blackColor, filterBtnColor } from "../constants/colors";

const {
  flexDirectionRow,
  borderRadius5,
  alignJustifyCenter,
  justifyContentSpaceBetween,
  flex,
  width100Percent,
} = BaseStyle;
import { useState } from "react";

const TabButton = ({ tabBtnTexts, activeTabBtnColor, tabButtonStyle }) => {
  console.log("TabButton__Component__Called");

  const [selectedOption, setSelectedOption] = useState(tabBtnTexts[0]);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    console.log(`${option} Pressed`);
  };
  return (
    <View
      style={[
        tabButtonStyle?.containerStyle
          ? tabButtonStyle?.containerStyle
          : styles.optionBox,
        borderRadius5,
        flexDirectionRow,
        justifyContentSpaceBetween,
        width100Percent,
      ]}
    >
      {tabBtnTexts.map((text, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              flex,
              selectedOption === text && [
                styles.selectedButton,
                { backgroundColor: activeTabBtnColor },
              ],
              alignJustifyCenter,
            ]}
            onPress={() => handleOptionPress(text)}
          >
            <Text
              style={[
                tabButtonStyle?.buttonTextStyle && selectedOption === text
                  ? tabButtonStyle?.buttonTextStyle
                  : styles.text,
              ]}
            >
              {text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    backgroundColor: filterBtnColor,
    padding: spacings.small,
  },
  button: {
    padding: spacings.large,
  },
  selectedButton: {
    padding: spacings.large,
    borderRadius: 8,
  },
  text: {
    fontSize: style.fontSizeNormal.fontSize,
    color: blackColor,
    fontWeight: style.fontWeightThin.fontWeight,
  },
});

export default React.memo(TabButton, (prevProps, nextProps) => {
  return prevProps.tabBtnTexts === nextProps.tabBtnTexts;
});
