import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { BaseStyle } from "../shared/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import { black70 } from "../constants/colors";

const { flexDirectionRow, flex, width100Percent } = BaseStyle;

const BarCharts = () => {
  const expenseData = [20000, 5000, 7000, 15000, 30000, 10000, 1500];
  const incomeData = [5000, 7000, 15000, 25000, 1000, 5000, 7000];
  const labels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  // Create a combined data array with gaps
  const combinedData = labels.flatMap((label, index) => [
    { value: expenseData[index], svg: { fill: "red" }, label },
    { value: incomeData[index], svg: { fill: "blue" }, label },
    { svg: { fill: "transparent" }, label }, // Adding a transparent bar for gap
  ]);

  return (
    <View style={[Styles.barContainer, flexDirectionRow, width100Percent]}>
      <YAxis
        data={combinedData}
        yAccessor={({ item }) => item.value}
        contentInset={{ top: 10, bottom: 10 }}
        svg={{
          fontSize: style.fontSizeSmall2x.fontSize,
          fill: black70,
        }}
        numberOfTicks={6}
        formatLabel={(value) => `${value / 1000}k`}
      />
      <View style={[flex, Styles.barChart]}>
        <BarChart
          style={{ flex: 1 }}
          data={combinedData}
          yAccessor={({ item }) => item.value}
          xAccessor={({ index }) => index}
          spacingInner={Platform.OS === "web" ? 0.6 : 0.4}
          spacingOuter={Platform.OS === "web" ? 0.5 : 0.1}
          contentInset={{ top: 10, bottom: 10 }}
          yScale={scale.scaleLinear}
          gridMin={0}
        >
          <Grid />
        </BarChart>
        <XAxis
          style={{ marginHorizontal: -10, height: 30 }}
          data={labels}
          scale={scale.scaleBand}
          formatLabel={(value, index) => labels[index]}
          labelStyle={{ color: black70 }}
        />
      </View>
    </View>
  );
};

export default BarCharts;

const Styles = StyleSheet.create({
  barContainer: {
    height: Platform.OS === "web" ? hp(42) : hp(32),
  },
  barChart: {
    marginLeft: spacings.large,
    gap: Platform.OS === "web" ? wp(1.5) : wp(2.5),
  },
});
