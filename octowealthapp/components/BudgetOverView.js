import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import { modalbackgroundColor } from "../constants/colors";
import { GROWTH_CHART_ICON } from "../assets/images";

const {
  flexDirectionRow,
  justifyContentSpaceBetween,
  alignJustifyCenter,
  alignItemsCenter,
  borderRadius17,
} = BaseStyle;

const BudgetOverView = ({
  backgroundColor,
  budgetTypeText,
  bonuses,
  amount,
}) => {
  return (
    <View
      style={[
        styles.budgetBox,
        borderRadius17,
        { backgroundColor: backgroundColor },
      ]}
    >
      <View
        style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}
      >
        <Feather name="target" color={modalbackgroundColor} size={22} />
        <View style={[flexDirectionRow, alignJustifyCenter, { gap: 3 }]}>
          <Image source={GROWTH_CHART_ICON} style={styles.imageStyle} />
          <Text
            style={[
              { color: modalbackgroundColor },
              style.fontSizeExtraExtraSmall,
            ]}
          >
            {bonuses}
          </Text>
        </View>
      </View>
      <Text style={[{ color: modalbackgroundColor }, style.fontSizeSmall1x]}>
        {budgetTypeText}
      </Text>
      <Text
        style={[
          style.fontSizeNormal1x,
          style.fontWeightBold,
          { color: modalbackgroundColor },
        ]}
      >
        {amount}
      </Text>
    </View>
  );
};

export default BudgetOverView;

const styles = StyleSheet.create({
  budgetBox: {
    gap: 5,
    flex: 2,
    flexShrink: 1,
    padding: spacings.medium,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
});
