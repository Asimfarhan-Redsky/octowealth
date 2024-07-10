import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useMemo, useCallback } from "react";
import { BaseStyle } from "../shared/styles";
import Header from "../components/Header";
import { spacings, style } from "../shared/constants/fonts";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  webPlatform,
} from "../utils";
import {
  blackColor,
  grayColor,
  homeButtonBackGround,
  lightRed,
  royalBlue,
  whiteColor,
  backgroundColor,
} from "../constants/colors";
import TotalBalance from "../components/TotalBalance";
import {
  BUDGET_ANALYSIS,
  EXPENSE,
  INCOME,
  SEE_ALL,
  THIS_MONTH,
  THIS_WEEK,
  TOTAL_BALANCE,
  TRANSACTIONS,
} from "../constants/constants";
import BudgetOverView from "../components/BudgetOverView";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import BudgetAnalysis from "../components/BudgetAnalysis";
import TabButton from "../components/TabButton";
import { DOLLAR_IMG, GIFT_IMG } from "../assets/images";
import DueBills from "../components/DueBills";
import RenderDates from "../components/RenderDates";

const {
  containerStyle,
  width100Percent,
  flexDirectionRow,
  justifyContentSpaceBetween,
  alignItemsCenter,
  flex,
} = BaseStyle;

const transactionsBills = [
  {
    id: 1,
    billName: "Salary",
    BNInfo: "Week 1",
    billAmount: "£4000",
    billDate: "Fri,05 April 2024",
    image: DOLLAR_IMG,
    color: royalBlue,
  },
  {
    id: 2,
    billName: "Birthday",
    BNInfo: "Week 2",
    billAmount: "£500",
    billDate: "Fri,05 April 2024",
    image: GIFT_IMG,
    color: lightRed,
  },
  {
    id: 3,
    billName: "Salary",
    BNInfo: "Week 1",
    billAmount: "£4000",
    billDate: "Fri,05 April 2024",
    image: DOLLAR_IMG,
    color: royalBlue,
  },
  {
    id: 4,
    billName: "Birthday",
    BNInfo: "Week 2",
    billAmount: "£500",
    billDate: "Fri,05 April 2024",
    image: GIFT_IMG,
    color: lightRed,
  },
];

const analysisMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agust",
];

const TransactionHistory1 = ({ navigation }) => {
  const [showDate, setShowDate] = useState();
  const tabBtnTexts = useMemo(() => [THIS_WEEK, THIS_MONTH], []);

  const renderItem = useCallback(
    ({ item }) => (
      <DueBills
        billName={item?.billName}
        BNInfo={item?.BNInfo}
        billAmount={item?.billAmount}
        billDate={item?.billDate}
        image={item?.image}
        dueBillStyles={[
          styles.dueBillStyles,
          {
            billAmntColor: { color: item?.color },
            BNInfoColor: { color: grayColor },
          },
        ]}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <>
      <View style={[styles.headerContainer]}>
        <View style={[{ paddingHorizontal: spacings.large }]}>
          <Header
            headerText={showDate}
            headerTextStyle={styles.headerText}
            iconName={"calendar-alt"}
            navigation={navigation}
            arrowIconColor={whiteColor}
            buttonStyle={styles.buttonStyle}
            buttonIconColor={whiteColor}
          />
        </View>
        <RenderDates setShowDate={setShowDate} />
      </View>
      <ScrollView
        // style={[{ height: hp(60) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, {marginBottom: webPlatform ? wp(2) : wp(3)}]}>
          <View style={[styles.income_expense_box, width100Percent]}>
            <TotalBalance
              balanceText={TOTAL_BALANCE}
              totalBalance={"50,000"}
              isAddButton={true}
            />
            <View style={[styles.budgetContainer, flexDirectionRow]}>
              <BudgetOverView
                backgroundColor={royalBlue}
                budgetTypeText={INCOME}
                amount={`$ 45,500`}
                containerStyle={styles.containerStyle}
              />
              <BudgetOverView
                backgroundColor={lightRed}
                budgetTypeText={EXPENSE}
                amount={`$ 44,300`}
                containerStyle={styles.containerStyle}
              />
            </View>
          </View>
        </View>
        <View style={[styles.budgetAnalysisContainer, width100Percent]}>
          <View
            style={[
              flexDirectionRow,
              justifyContentSpaceBetween,
              alignItemsCenter,
              { paddingHorizontal: spacings.xxLarge }
            ]}
          >
            <Text style={[style.fontSizeNormal2x, { color: blackColor }]}>
              {BUDGET_ANALYSIS}
            </Text>
            <TouchableOpacity>
              <Text
                style={[style.fontSizeSmall2x, { color: homeButtonBackGround }]}
              >
                {SEE_ALL}
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[{ gap: wp(2.5), paddingHorizontal: spacings.xxLarge }]}
            horizontal
            data={analysisMonth}
            renderItem={({ item }) => <BudgetAnalysis item={item} />}
            keyExtractor={(_, index) => index.toString()}
            scroll
          />
        </View>
        <View style={[styles.container, {marginTop: webPlatform ? wp(2) : wp(4)}]}>
          <View style={[styles.transactionsBox, width100Percent]}>
            <View style={[flexDirectionRow, alignItemsCenter]}>
              <Text
                style={[flex, style.fontSizeNormal2x, style.fontWeightMedium]}
              >
                {TRANSACTIONS}
              </Text>
              <View style={[flex]}>
                <TabButton
                  tabBtnTexts={tabBtnTexts}
                  activeTabBtnColor={royalBlue}
                  tabButtonStyle={styles.tabButtonStyle}
                />
              </View>
            </View>
            <FlatList
              data={transactionsBills}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TransactionHistory1;

const styles = StyleSheet.create({
  headerContainer: {
    width: wp(100),
    padding: spacings.medium,
    backgroundColor: royalBlue,
    gap: Platform.OS === "web" ? wp(2) : wp(4),
  },
  headerText: {
    color: whiteColor,
  },
  buttonStyle: {},
  weekDayBox: {
    paddingHorizontal: spacings.large,
  },
  daysTextStyle: {
    color: whiteColor,
    marginRight: wp(15),
  },

  container: {
    width: wp(100),
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.large,
    backgroundColor: backgroundColor,
  },
  income_expense_box: {
    paddingHorizontal: spacings.xxLarge,
    paddingTop: spacings.ExtraLargex,
    paddingBottom: spacings.Large2x,
    backgroundColor: whiteColor,
    borderRadius: 6,
    gap: wp(3.5),
  },
  budgetContainer: {
    gap: wp(3.5),
  },
  containerStyle: {
    flex: 2,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.xxxLarge,
    gap: wp(2),
    borderRadius: 8,
  },
  budgetAnalysisContainer: {
    gap: wp(2),
  },
  transactionsBox: {
    gap: wp(2),
  },
  tabButtonStyle: {
    containerStyle: {
      backgroundColor: whiteColor,
      padding: spacings.small,
    },
    buttonTextStyle: {
      color: whiteColor,
    },
  },
  dueBillStyles: {
    imageStyle: {
      width: 30,
      height: 30,
    },
    imageContainerStyle: {
      backgroundColor: "#F1F1F1",
      padding: spacings.xxxLarge,
      borderRadius: 15,
    },
    billNameTextStyle: {
      fontSize: style.fontSizeNormal2x.fontSize,
    },
    alignItemsStart: {
      alignItems: "flex-start",
    },
    dateTextStyle: {
      fontSize: style.fontSizeExtraSmall.fontSize,
    },
    billAmntTextStyle: {
      fontSize: style.fontSizeNormal1x.fontSize,
      fontWeight: style.fontWeightMedium.fontWeight,
    },
  },
});
