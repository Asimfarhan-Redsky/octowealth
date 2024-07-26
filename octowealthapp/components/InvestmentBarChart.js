import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { BaseStyle } from "../shared/styles";
import { blackColor } from "../constants/colors";

const { alignJustifyCenter } = BaseStyle;
const screenWidth = Dimensions.get("window").width;

const InvestmentBarChart = ({
  labels = [],
  colors = [],
  data = [],
  bgColor = "#fff",
  width = screenWidth - 20,
  height = 200,
  yAxisLabel = "$",
}) => {
  const chartConfiguration = {
    backgroundColor: bgColor,
    backgroundGradientFrom: bgColor,
    backgroundGradientTo: bgColor,
    decimalPlaces: 0,
    barPercentage: 0.7,
    strokeWidth: 50,
    color: (opacity) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: () => blackColor,
  };

  const barChartData = {
    labels,
    datasets: [
      {
        data,
        colors,
      },
    ],
  };
  return (
    <View style={[styles.chartContainer, alignJustifyCenter]}>
      <BarChart
        data={barChartData}
        width={width}
        height={height}
        yAxisLabel={yAxisLabel}
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
