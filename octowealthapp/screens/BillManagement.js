import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import Feather from "react-native-vector-icons/Feather";
import { BaseStyle } from "../shared/styles";
import {
  backgroundColor,
  forestGreen,
  royalBlue,
  silver,
  whiteColor,
  blackColor,
  oceanBlue,
  buttonTextColor
} from "../constants/colors";
import { spacings } from "../shared/constants/fonts";
import Header from "../components/Header";
import {
  ADD,
  BILL_MANAGEMENT,
  dueBillData,
  MARK_AS_COMPLETE,
  UPCOMING_BILLS,
} from "../constants/constants";
import InvestmentBarChart from "../components/InvestmentBarChart";
import DueBills from "../components/DueBills";
import { SwipeListView } from "react-native-swipe-list-view";
import { style } from "../shared/constants/fonts";
import Button from "../components/Button";
const { flex, justifyContentCenter, flexDirectionColumn, flexDirectionRow, alignItemsCenter, alignSelfCenter, alignItemsFlexEnd, alignJustifyCenter, borderRadius8, positionAbsolute } = BaseStyle;

const barLabels = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Oct"];
const barColors = [
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
];

const barData = [500, 700, 1250, 1000, 2000, 1100, 1600];

const BillManagement = ({ navigation }) => {
  const bills = dueBillData.map((item, index) => ({
    key: `${index + 1}`,
    billTitle: item.billName,
    dueDate: item.dueDAte,
    amount: item.payment,
  }));

  const onMarkAsComplete = () => {
    // console.log("Mark As Complete button pressed")
  }

  const renderItem = ({ item }) => (
    <DueBills billName={item.billTitle} BNInfo={item.dueDate} billAmount={item.amount} />
  );

  const renderHiddenItem = ({ item }) => (
    <View style={[styles.markAsCompleteBtn, alignItemsFlexEnd]}>
      <TouchableOpacity
        style={[alignItemsCenter, justifyContentCenter, flex, { backgroundColor: "#F9416A", width: wp(25), borderRadius: 9 }]}
        onPress={onMarkAsComplete}
      >
        <Text style={[{ color: whiteColor }]}>
          {MARK_AS_COMPLETE}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header headerText={BILL_MANAGEMENT} arrowType={true} navigation={navigation} />
          <View style={styles.barContainer}>
            <View style={[flexDirectionColumn, alignSelfCenter, alignItemsCenter]}>
              <Text style={styles.billAmountText}>$2000</Text>
              <View style={[flexDirectionRow, alignItemsCenter]}>
                <Feather name="chevron-up" size={26} color={forestGreen} />
                <Text style={[style.fontSizeNormal1x, style.fontWeightThin1x, { color: silver }]}>
                  $20(1%)
                </Text>
              </View>
            </View>
            <InvestmentBarChart labels={barLabels} colors={barColors} data={barData} bgColor={backgroundColor} />
          </View>
        </View>
      </View>
      <Text style={[styles.upcomingBillsText]}>{UPCOMING_BILLS}</Text>
      <SwipeListView
        data={bills}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-wp(25)}
        disableRightSwipe
        contentContainerStyle={{ paddingHorizontal: spacings.xLarge }}
      />
      <View
      style={[
        styles.addButton,
        flexDirectionRow,
        positionAbsolute,
        alignJustifyCenter,
      ]}
    >
      <Button
        buttonText={ADD}
        buttonStyle={[
          styles.buttonStyle,
          alignJustifyCenter,
          borderRadius8,
          flexDirectionRow,
          { width: wp(25) },
        ]}
        textStyle={styles.buttonText}
        showPlusIcon
      />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    backgroundColor: backgroundColor,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.large,
  },
  headerContainer: { gap: hp(1) },
  barContainer: { gap: hp(1) },
  markAsCompleteBtn: {
    backgroundColor: "#F9416A",
    flex: 1,
    borderRadius: 10,
    marginVertical: spacings.large,
    marginLeft: spacings.xxLarge,
  },
  billAmountText: {
    fontSize: style.fontSizeLarge3x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
  },
  upcomingBillsText: {
    paddingHorizontal: spacings.xLarge,
    fontWeight: style.fontWeightMedium.fontWeight,
    fontSize: style.fontSizeNormal.fontSize,
    color: blackColor,
    marginVertical: spacings.small2x,
  },
  addButton: {
    gap: 10,
    right: spacings.xLarge,
    bottom: hp(2.7),
    zIndex: 10,
  },
    buttonStyle: {
    display: "flex",
    height: hp(6),
    backgroundColor: oceanBlue,
    marginBottom: spacings.xLarge,
  },
   buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
  },
});

export default BillManagement;
