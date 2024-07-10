import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { BaseStyle } from "../shared/styles";
import {
  CrimsonRed,
  blackColor,
  lightGrayColor,
  royalBlue,
  whiteColor,
} from "../constants/colors";

const { alignJustifyCenter } = BaseStyle;
const screenWidth = Dimensions.get("window").width;

const barChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Oct"],
  datasets: [
    {
      data: [500, 700, 1250, 1000, 2000, 1100, 1600],
      colors: [
        () => royalBlue,
        () => royalBlue,
        () => royalBlue,
        () => CrimsonRed,
        () => CrimsonRed,
        () => royalBlue,
        () => royalBlue,
      ],
    },
  ],
};

const chartConfiguration = {
  backgroundColor: whiteColor,
  backgroundGradientFrom: lightGrayColor,
  backgroundGradientTo: lightGrayColor,
  decimalPlaces: 0,
  barPercentage: 0.7,
  strokeWidth: 50,
  color: (opacity) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: () => blackColor,
};

const InvestmentBarChart = () => {
  return (
    <View style={[styles.chartContainer, alignJustifyCenter]}>
      <BarChart
        data={barChartData}
        width={screenWidth - 20}
        height={200}
        yAxisLabel="$"
        chartConfig={chartConfiguration}
        fromZero
        withCustomBarColorFromData
        flatColor
      />
    </View>
  );
};

export default React.memo(InvestmentBarChart);

const styles = StyleSheet.create({
  chartContainer: {},
});
