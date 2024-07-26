import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getCurrentDate,
} from "../utils";
import {
  blackColor, 
  filterBtnColor,
  investmentIconColor,
  lightGreenColor,
  lightRed,
  linkTextColor,
  redColor,
  whiteColor,
  DarkBlue,
  SkyBlue,
  charcolColor,
  lightSkyBlue,
} from "../constants/colors";
import {
  EXPENSE,
  INCOME,
  INCOME_EXPENSES,
  NET_INCOME,
  RECENT_TRANSSACTION,
  THIS_MONTH,
  THIS_WEEK,
  THIS_YEAR,
  TOTAL_BALANCE,
  TRANSSACTION_HISTORY,
} from "../constants/constants";
import Header from "../components/Header";
import BudgetOverView from "../components/BudgetOverView";
import DueBills from "../components/DueBills";
import { Ionicons } from "react-native-vector-icons";
import AmountDescription from "../components/AmountDescription";
import { Calendar } from "react-native-calendars";
import TabButton from "../components/TabButton";
import TotalBalance from "../components/TotalBalance";
import BarChart from "../components/BarChart";

const {
  width100Percent,
  flex,
  alignJustifyCenter,
  flexDirectionRow,
  borderRadius5,
  alignItemsCenter,
  justifyContentSpaceBetween,
  borderWidth1,
  borderRadius50,
} = BaseStyle;

const dueBillData = [
  {
    id: "1",
    billName: "Electricity Bill",
    dueDAte: INCOME,
    payment: "$5000",
    color: lightGreenColor,
  },
  {
    id: "2",
    billName: "House Rent",
    dueDAte: EXPENSE,
    payment: "-$500",
    color: redColor,
  },
];

const transactionData = [
  {
    id: "1",
    billName: "Electricity Bill",
    dueDAte: INCOME,
    payment: "$500",
    color: lightGreenColor,
  },
  {
    id: "2",
    billName: "Electricity Bill",
    dueDAte: INCOME,
    payment: "$500",
    color: lightGreenColor,
  },
  {
    id: "3",
    billName: "Electricity Bill",
    dueDAte: INCOME,
    payment: "$500",
    color: lightGreenColor,
  },
  {
    id: "4",
    billName: "Electricity Bill",
    dueDAte: INCOME,
    payment: "$500",
    color: lightGreenColor,
  },
];
const BUDGET_DATA = [
  {
    bgColor: linkTextColor,
    budgetTypeText: INCOME,
    bonuses: "2.5% this week",
    amount: `$5000,00`,
  },
  {
    bgColor: lightRed,
    budgetTypeText: EXPENSE,
    bonuses: "2.5% this week",
    amount: `$5000,00`,
  },
];

const TransactionsHistory = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState(THIS_WEEK);
  const [showCalnender, setShowCalender] = useState(false);
  const currentDate = getCurrentDate();
  const [selected, setSelected] = useState(currentDate);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    console.log(`${option} Pressed`);
  };
  return (
    <View style={[styles.container, flex]}>
      <View style={{ marginHorizontal: 20 }}>
        <Header
          headerText={TRANSSACTION_HISTORY}
          navigation={navigation}
          iconName={"calendar-alt"}
          onPress={() => setShowCalender(!showCalnender)}
        />
      </View>
      {showCalnender && (
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
            // setShowCalender(false)
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: redColor,
            },
          }}
          hideExtraDays={true}
          theme={{
            backgroundColor: lightSkyBlue,
            calendarBackground: lightSkyBlue,
            textSectionTitleColor: whiteColor,
            selectedDayBackgroundColor: redColor,
            selectedDayTextColor: whiteColor,
            todayTextColor: whiteColor,
            dayTextColor: whiteColor,
            textDisabledColor: whiteColor,
          }}
        />
      )}
      <View style={[styles.container, width100Percent, flex]}>
        <View style={[styles.tabBtnBox]}>
          <TabButton
            tabBtnTexts={[THIS_WEEK, THIS_MONTH, THIS_YEAR]}
            activeTabBtnColor={investmentIconColor}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollViewContainer]}
          scrollEnabled={true}
        >
          <View style={[styles.totalBalanceBox]}>
            <TotalBalance balanceText={TOTAL_BALANCE} totalBalance={"50.000"} />
          </View>
          <View
            style={[
              styles.overViewBoxes,
              flexDirectionRow,
              justifyContentSpaceBetween,
            ]}
          >
            {BUDGET_DATA.map((data, index) => (
              <BudgetOverView
                key={index}
                backgroundColor={data?.bgColor}
                budgetTypeText={data?.budgetTypeText}
                bonuses={data?.bonuses}
                amount={data?.amount}
              />
            ))}
          </View>
          <View style={[styles.transOfCategoriesBox]}>
            <View style={[{ marginHorizontal: spacings.large }]}>
              <Text style={[styles.headingText]}>{RECENT_TRANSSACTION}</Text>
              <FlatList
                data={dueBillData}
                renderItem={({ item }) => (
                  <DueBills
                    billName={item?.billName}
                    BNInfo={item?.dueDAte}
                    billAmount={item?.payment}
                    dueBillStyles={[
                      styles.dueBillStyles,
                      {
                        iconColor: { color: item?.color },
                        BNInfoColor: { color: item?.color },
                        billAmntColor: { color: item?.color },
                      },
                    ]}
                    dueBilsImageStyle={styles.dueBilsImage}
                  />
                )}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
              <Text style={[styles.headingText]}>{INCOME_EXPENSES}</Text>
              <View
                style={[
                  alignJustifyCenter,
                  borderRadius5,
                  styles.incomeExpDesBox,
                ]}
              >
                <Text style={styles.netIcomeText}>{NET_INCOME}</Text>
                <Text style={[styles.netAmountText]}>{`$ 800.00`}</Text>
                <BarChart />
                <View
                  style={[
                    flexDirectionRow,
                    justifyContentSpaceBetween,
                    { width: wp(50) },
                  ]}
                >
                  <View style={[flexDirectionRow]}>
                    <View
                      style={[
                        { backgroundColor: redColor },
                        styles.dotts,
                        borderRadius50,
                      ]}
                    ></View>
                    <Text style={styles.text}>{EXPENSE}</Text>
                  </View>
                  <View style={[flexDirectionRow]}>
                    <View
                      style={[
                        { backgroundColor: DarkBlue },
                        styles.dotts,
                        borderRadius50,
                      ]}
                    ></View>
                    <Text style={styles.text}>{INCOME}</Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  flexDirectionRow,
                  justifyContentSpaceBetween,
                  alignItemsCenter,
                  { marginVertical: spacings.large },
                ]}
              >
                <Text style={[styles.headingText]}>{TRANSSACTION_HISTORY}</Text>
                <TouchableOpacity
                  style={[
                    styles.incomeTouchableOpacity,
                    alignJustifyCenter,
                    flexDirectionRow,
                    borderRadius5,
                    borderWidth1,
                  ]}
                >
                  <Text style={[styles.incomeText]}>{INCOME}</Text>
                  <Text>
                    <Ionicons
                      name={"chevron-down-outline"}
                      size={20}
                      color={blackColor}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={transactionData}
                renderItem={({ item }) => (
                  <DueBills
                    billName={item?.billName}
                    BNInfo={item?.dueDAte}
                    billAmount={item?.payment}
                    dueBillStyles={[
                      styles.dueBillStyles,
                      {
                        iconColor: { color: item?.color },
                        BNInfoColor: { color: item?.color },
                        billAmntColor: { color: item?.color },
                      },
                    ]}
                    dueBilsImageStyle={styles.dueBilsImage}
                  />
                )}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
              <AmountDescription headerText={INCOME} amount={"45,500"} />
              <AmountDescription headerText={EXPENSE} amount={"45,500"} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TransactionsHistory;

const styles = StyleSheet.create({
  container: {
    paddingTop: spacings.large,
    backgroundColor: whiteColor,

  },
  overViewBoxes: {
    gap: wp(3),
    marginHorizontal: spacings.xxLarge,
    paddingBottom: Platform.OS === "web" ? wp(2) : wp(4),
    marginTop: Platform.OS === "web" ? wp(2.5) : wp(5),
  },
  imageStyle: {
    width: Platform.OS === "web" ? wp(5) : wp(16),
    height: hp(8),
  },
  tabBtnBox: {
    marginTop: spacings.xLarge,
    marginHorizontal: spacings.xxLarge,
  },
  totalBalanceBox: {
    marginTop: Platform.OS === "web" ? wp(2) : wp(5),
    marginHorizontal: spacings.xxLarge,
  },
  scrollViewContainer: {
    height: Platform.OS === "web" ? hp(70) : null,
  },
  transOfCategoriesBox: {
    backgroundColor: filterBtnColor,
    padding: spacings.large,
    marginTop: spacings.large,
    width: wp(100),
    paddingBottom: spacings.xxxxLarge,
  },
  headingText: {
    marginVertical: spacings.large,
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: blackColor,
  },
  netIcomeText: {
    color: charcolColor,
    fontSize: style.fontSizeNormal.fontSize,
  },
  netAmountText: {
    fontSize: style.fontSizeLargeX.fontSize,
    paddingBottom: spacings.large,
    color: blackColor,
  },
  dueBilsImage: {
    width: 40,
    height: 40,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: filterBtnColor,
  },
  incomeExpDesBox: {
    backgroundColor: whiteColor,
    padding: spacings.large,
    margin: spacings.large,
  },
  incomeTouchableOpacity: {
    height: hp(4.5),
    paddingHorizontal: spacings.large,
    borderColor: blackColor,
    gap: wp(1),
  },
  dotts: {
    width: 15,
    height: 15,
    marginRight: spacings.large,
  },
  incomeText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
  UnSelectedButton: {
    padding: spacings.normal,
    width: Platform.OS === "web" ? wp(15) : wp(20),
  },
  Button: {
    backgroundColor: DarkBlue,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.large,
    borderRadius: 5,
    width: Platform.OS === "web" ? wp(15) : wp(20),
  },
  dueBillStyles: {
    BNInfoTextStyle: {},
  },
});
