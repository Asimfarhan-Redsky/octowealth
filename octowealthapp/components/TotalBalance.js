import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BaseStyle } from "../shared/styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { charcoalGray, homeButtonBackGround } from "../constants/colors";
import { spacings, style } from "../shared/constants/fonts";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "../utils";

const {
  width100Percent,
  justifyContentCenter,
  alignJustifyCenter,
  justifyContentSpaceBetween,
  flexDirectionRow,
} = BaseStyle;

const TotalBalance = ({ balanceText, totalBalance, isAddButton }) => {
  console.log("TotalBalance__Component__Called");

  return (
    <View
      style={[
        styles.container,
        width100Percent,
        justifyContentSpaceBetween,
        flexDirectionRow,
      ]}
    >
      <View style={[styles.totalBalanceBox, justifyContentCenter]}>
        <Text style={[style.fontSizeNormal]}>{balanceText}</Text>
        <Text
          style={[style.fontSizeLarge2x, style.fontWeightBold]}
        >{`$ ${totalBalance}`}</Text>
      </View>
      {isAddButton ? (
        <TouchableOpacity
          style={[styles.addButton, flexDirectionRow, alignJustifyCenter]}
        >
          <AntDesign name="plus" size={22} color={charcoalGray} />
          <Text
            style={[
              style.fontSizeNormal2x,
              style.fontWeightMedium,
              { color: charcoalGray },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      ) : (
        <FontAwesome5 name="wallet" size={50} color={homeButtonBackGround} />
      )}
    </View>
  );
};

export default React.memo(TotalBalance);

const styles = StyleSheet.create({
  container: {},
  addButton: {
    height: hp(5),
    gap: wp(3),
    paddingHorizontal: spacings.xxLarge,
    borderRadius: 4,
    borderColor: charcoalGray,
    borderWidth: 1.3,
  },
});
