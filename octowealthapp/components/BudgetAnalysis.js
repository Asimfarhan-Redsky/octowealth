import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import { BILL, RENT, SALARY, TOTAL, TOYS } from "../constants/constants";
import {
  blackColor,
  bottomBorderColor,
  grayColor,
  lightRed,
  royalBlue,
  whiteColor,
} from "../constants/colors";
const {
  flexDirectionRow,
  justifyContentSpaceBetween,
  alignSelfCenter,
  alignSelfEnd,
} = BaseStyle;

const budgetDetailsData = [
  {
    budgetName: SALARY,
    budgetAmount: 400,
    date: "Fri,05 April 2023",
  },
  {
    budgetName: TOYS,
    budgetAmount: 350,
    date: "Fri,05 April 2023",
  },
  {
    budgetName: BILL,
    budgetAmount: 599,
    date: "Fri,05 April 2023",
  },
  {
    budgetName: RENT,
    budgetAmount: 700,
    date: "Fri,05 April 2023",
  },
];

const BudgetAnalysis = ({ item }) => {
  console.log("BudgetAnalysis__Component__Called");

  const renderBudgetDetails = () => (
    <View style={[styles.detailsBox]}>
      {budgetDetailsData?.map((item, index) => (
        <View
          style={[flexDirectionRow, justifyContentSpaceBetween]}
          key={index}
        >
          <Text style={[style.fontSizeSmall2x, { color: blackColor }]}>
            {item?.budgetName}
          </Text>
          <View style={{ gap: wp(2) }}>
            <Text
              style={[
                alignSelfEnd,
                style.fontSizeNormal,
                style.fontWeightMedium,
                {
                  color: item.budgetName === "Toys" ? lightRed : royalBlue,
                },
              ]}
            >
              £{item?.budgetAmount}
            </Text>
            <Text style={[style.fontSizeExtraSmall, { color: grayColor }]}>
              {item?.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.budgetDetailsBox]}>
      <Text
        style={[
          alignSelfCenter,
          style.fontSizeNormal2x,
          style.fontWeightMedium,
          { color: blackColor },
        ]}
      >
        {item}
      </Text>
      {renderBudgetDetails()}
      <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
        <Text style={[style.fontSizeSmall2x]}>{TOTAL}</Text>
        <Text
          style={[
            style.fontSizeNormal,
            style.fontWeightMedium,
            { color: item === "February" ? lightRed : royalBlue },
          ]}
        >
          {item === "February" ? "-£649" : "£5649"}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(BudgetAnalysis);

const styles = StyleSheet.create({
  budgetDetailsBox: {
    width: Platform.OS === "web" ? wp(20) : wp(45),
    backgroundColor: whiteColor,
    borderRadius: 15,
    paddingHorizontal: spacings.xxxLarge,
    paddingTop: spacings.xxLarge,
    paddingBottom: spacings.ExtraLarge2x,
  },
  detailsBox: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: bottomBorderColor,
    paddingTop: spacings.xxLarge,
    paddingBottom: spacings.ExtraLarge4x,
    marginVertical: spacings.xLarge,
    gap: wp(3),
  },
});
