import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles";
import {
  lawnGreen,
  lightGrayColor,
  lightSkyBlue,
  pictonBlue,
} from "../constants/colors";
import { ALL_YOUR_INVESTMENTS } from "../constants/constants";

const {
  flexDirectionRow,
  alignItemsCenter,
  gap1_5,
  justifyContentCenter,
  width100Percent,
  gap2,
  justifyContentSpaceBetween,
} = BaseStyle;

const indicatorData = [
  { title: "Equities", color: lawnGreen },
  { title: "Instruments", color: pictonBlue },
  { title: "Real Estate", color: lightSkyBlue },
];

const Indicator = ({ title, color }) => (
  <View style={[flexDirectionRow, alignItemsCenter, gap1_5]}>
    <Text style={[styles.bullet, { backgroundColor: color }]} />
    <Text style={[style.fontSizeSmall1x, { color: "#707070" }]}>{title}</Text>
  </View>
);

const CapitalButton = ({ name, color }) => (
  <View style={styles.capitalButton}>
    <Text style={[styles.btnText, { color }]}>{name}</Text>
  </View>
);

const calculatePercentage = (amount, total) =>
  total ? (amount / total) * 100 : 0;

const ProgressBar = ({ item }) => {
  const totalCapital =
    item?.investments?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const renderSegments = () =>
    item?.investments?.map((investment, index) => (
      <View
        key={index}
        style={[
          styles.segment,
          {
            width: `${calculatePercentage(investment.amount, totalCapital)}%`,
            backgroundColor: investment.color,
          },
        ]}
      />
    ));

  const renderCapitalButtons = () =>
    item?.investments?.map((investment, index) => (
      <CapitalButton
        key={index}
        name={investment.name}
        color={investment.color}
      />
    ));

  const renderIndicators = () =>
    indicatorData.map((data, index) => (
      <Indicator key={index} title={data.title} color={data.color} />
    ));

  return (
    <View style={[styles.container, width100Percent]}>
      <View style={[styles.progressBar, flexDirectionRow, width100Percent]}>
        {renderSegments()}
      </View>

      {item?.name === ALL_YOUR_INVESTMENTS ? (
        <View style={[flexDirectionRow, gap2, justifyContentCenter]}>
          {renderCapitalButtons()}
        </View>
      ) : (
        <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
          {renderIndicators()}
        </View>
      )}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    gap: wp(2.5),
  },
  progressBar: {
    height: Platform.OS === "web" ? wp(1) : hp(0.6),
    backgroundColor: lightGrayColor,
    borderRadius: 10,
    overflow: "hidden",
  },
  segment: {
    height: "100%",
  },
  bullet: {
    width: wp(3.1),
    height: hp(0.6),
    borderRadius: 4,
  },
  capitalButton: {
    backgroundColor: "#EFF9FA",
    paddingHorizontal: spacings.xxxLarge,
    paddingVertical: spacings.xLarge,
    borderRadius: 9,
  },
  btnText: {
    fontSize: style.fontSizeSmall1x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
  },
});
