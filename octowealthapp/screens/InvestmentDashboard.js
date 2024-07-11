import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList, ScrollView, Platform } from "react-native";
import { BaseStyle } from "../shared/styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import {
  whiteColor,
  lightGrayColor,
  royalBlue,
  lawnGreen,
  lightCyan,
  CrimsonRed,
} from "../constants/colors";
import {
  ADD_INVESMENTS,
  INVESTMENT_TYPE_SELECTION,
} from "../constants/constants";
import TotalInvestmentAmount from "../components/TotalInvestmentAmount";
import MonthSelector from "../components/MonthSelector";
import InvestmentBarChart from "../components/InvestmentBarChart";
import Button from "../components/Button";
import InvestmentPortfolioCard from "../components/InvestmentPortfolioCard";
import { InvestmentContext } from "../context/InvestmentProvider";
import { StatusBar } from "react-native";

const { width100Percent, alignItemsCenter, textAlignCenter } = BaseStyle;

const allInvestmentsData = {
  name: "All your investments",
  portfolioValue: 22600.0,
  profitLoss: 1300.0,
  profitLossPercentage: 10,
  investments: [
    { name: "Abyan Capital", color: lawnGreen, amount: 60 },
    { name: "Derayah Financial", color: lightCyan, amount: 40 },
  ],
  type: "The growth rate over the previous month",
};

const months = [
  { year: 2024, month: "Jan" },
  { year: 2024, month: "Feb" },
  { year: 2024, month: "Mar" },
  { year: 2024, month: "Apr" },
  { year: 2024, month: "May" },
  { year: 2024, month: "Jun" },
  { year: 2024, month: "Jul" },
  { year: 2024, month: "Aug" },
  { year: 2024, month: "Sep" },
  { year: 2024, month: "Oct" },
  { year: 2024, month: "Nov" },
  { year: 2024, month: "Dec" },
];

const barLabels = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Oct"];
const barColors = [
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => CrimsonRed,
  () => CrimsonRed,
  () => royalBlue,
  () => royalBlue,
];
const barData = [500, 700, 1250, 1000, 2000, 1100, 1600];

const InvestmentDashboard = ({ navigation }) => {
  const [activeMonth, setActiveMonth] = useState("Jan");
  const { portfolio } = useContext(InvestmentContext);

  const handleAddInvestmentPress = () => {
    navigation.navigate(INVESTMENT_TYPE_SELECTION);
  };

  return (
    <>
      <TotalInvestmentAmount />
      <View style={styles.monthSelectorContainer}>
        <FlatList
          data={months}
          renderItem={({ item }) => (
            <MonthSelector
              year={item.year}
              month={item.month}
              onPress={() => setActiveMonth(item.month)}
              isActive={activeMonth === item.month}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          contentContainerStyle={styles.monthListContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ScrollView
        contentContainerStyle={[styles.scrollViewContainer]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View
            style={[styles.chartContainer, width100Percent, alignItemsCenter]}
          >
            <InvestmentBarChart
              labels={barLabels}
              colors={barColors}
              data={barData}
              bgColor={lightGrayColor}
            />
            <Button
              buttonText={ADD_INVESMENTS}
              buttonStyle={styles.buttonStyle}
              textStyle={[styles.buttonTextStyle, textAlignCenter]}
              onPress={handleAddInvestmentPress}
            />
          </View>
          <InvestmentPortfolioCard item={allInvestmentsData} />
          <FlatList
            data={portfolio}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <InvestmentPortfolioCard item={item} />}
            contentContainerStyle={styles.flatListContainer}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default InvestmentDashboard;

const styles = StyleSheet.create({
  monthSelectorContainer: {
    width: wp(100),
    backgroundColor: whiteColor,
  },
  monthListContainer: {
    gap: wp(4.5),
    paddingHorizontal: spacings.xxxLarge,
    paddingVertical: spacings.xxxLarge,
  },
  container: {
    backgroundColor: lightGrayColor,
    paddingHorizontal: spacings.Large1x,
    width: wp(100),
  },
  scrollViewContainer: {
    height: Platform.OS === "web" ? hp(70) : null,
  },
  chartContainer: {
    marginTop: wp(6),
    gap: wp(3),
    marginBottom: spacings.large,
  },
  buttonStyle: {
    backgroundColor: royalBlue,
    width: wp(70),
    paddingVertical: spacings.xxLarge,
    borderRadius: 24,
  },
  buttonTextStyle: {
    color: whiteColor,
    fontSize: style.fontSizeMedium.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
  flatListContainer: {
    marginBottom: spacings.ExtraLarge,
  },
});
