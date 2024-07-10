import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import {
  webPlatform,
  widthPercentageToDP as wp,
} from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import {
  DarkBlue,
  backgroundColor,
  black70,
  blackColor,
  forestGreen,
  grayColor,
  lawnGreen,
  lightSkyBlue,
  pictonBlue,
  whiteColor,
} from "../constants/colors";
import {
  ADD_INVESMENTS,
  INVESTMENT_DASHBOARD,
  SELECT_INVESTMENT,
} from "../constants/constants";
import { BaseStyle } from "../shared/styles";
import Header from "../components/Header";
import Button from "../components/Button";
import { InvestmentContext } from "../context/InvestmentProvider";

const {
  flexDirectionRow,
  alignItemsCenter,
  justifyContentSpaceBetween,
  width100Percent,
  alignJustifyCenter,
  alignSelfCenter,
  flex,
} = BaseStyle;

const platformWeb = Platform.OS === "web";
const portfolioData = {
  name: "Derayah Financial",
  portfolioValue: 22600.0,
  profitLoss: 500.0,
  profitLossPercentage: 10,
  investments: [
    { title: "Equities", color: lawnGreen, amount: 50 },
    { title: "Instruments", color: pictonBlue, amount: 35 },
    { title: "Real Estate", color: lightSkyBlue, amount: 15 },
  ],
  type: "growth portfolio",
};

const InvestmentDetails = ({ navigation, route }) => {
  const { setPortfolio } = useContext(InvestmentContext);
  const { itemName } = route?.params;

  const handleButtonPress = () => {
    setPortfolio((prevPortfolio) => [...prevPortfolio, portfolioData]);
    navigation.navigate(INVESTMENT_DASHBOARD);
  };

  return (
    <View style={[styles.container, flex]}>
      <Header
        headerText={SELECT_INVESTMENT}
        headerTextStyle={styles.headerTextStyle}
        navigation={navigation}
      />
      <View
        style={[
          styles.investmentDetails,
          flexDirectionRow,
          justifyContentSpaceBetween,
          width100Percent,
          alignItemsCenter,
        ]}
      >
        <View>
          <Text style={styles.investmentTitle}>{itemName}</Text>
          <Text style={styles.investmentSubtitle}>APPL</Text>
        </View>
        <View style={[styles.priceContainer, alignJustifyCenter]}>
          <Text style={styles.investmentPrice}>$176</Text>
          <View style={[flexDirectionRow, alignItemsCenter]}>
            <Entypo name="chevron-up" size={30} color={forestGreen} />
            <Text style={[styles.investmentChange]}>$20(1%)</Text>
          </View>
        </View>
      </View>
      <View style={[styles.shareContainer, alignSelfCenter, flexDirectionRow]}>
        <View style={[alignItemsCenter]}>
          <Text style={styles.sharePrice}>$176</Text>
          <Text style={styles.shareText}>1 share</Text>
        </View>
        <View style={[flexDirectionRow, { marginTop: spacings.Large1x }]}>
          <Octicons
            name="arrow-switch"
            size={25}
            color={black70}
            style={{ transform: [{ rotate: "90deg" }] }}
          />
        </View>
      </View>
      <Button
        buttonText={ADD_INVESMENTS}
        buttonStyle={[styles.addButton, alignSelfCenter, alignJustifyCenter]}
        textStyle={[styles.buttonText]}
        onPress={handleButtonPress}
      />
    </View>
  );
};

export default InvestmentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    paddingHorizontal: spacings.Large1x,
    paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.large,
    gap: platformWeb ? wp(1.7) : wp(3.5),
  },
  headerTextStyle: {
    fontSize: style.fontSizeMedium.fontSize,
    color: blackColor,
  },
  investmentDetails: {},
  investmentTitle: {
    fontSize: style.fontSizeLargeX.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
  },
  investmentSubtitle: {
    fontSize: style.fontSizeSmall.fontSize,
    color: black70,
  },
  priceContainer: {
    backgroundColor: whiteColor,
    paddingHorizontal: spacings.xxxLarge,
    paddingVertical: spacings.small,
    borderRadius: 4,
  },
  investmentPrice: {
    fontSize: style.fontSizeLargeX.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: blackColor,
  },
  investmentChange: {
    fontSize: style.fontSizeSmall1x.fontSize,
    color: black70,
  },
  shareContainer: {
    marginTop: platformWeb ? wp(1.7) : wp(2.5),
  },
  sharePrice: {
    fontSize: style.fontSizeExtraLarge.fontSize,
    fontWeight: style.fontWeightMedium1x.fontWeight,
    color: blackColor,
    borderBottomWidth: 1.5,
    borderBottomColor: grayColor,
    paddingBottom: spacings.small,
  },
  shareText: {
    fontSize: style.fontSizeMedium.fontSize,
    color: black70,
    paddingTop: spacings.small,
  },
  addButton: {
    backgroundColor: DarkBlue,
    paddingVertical: spacings.xxLarge,
    width: wp(70),
    borderRadius: 24,
    marginTop: platformWeb ? wp(3) : wp(6),
  },
  buttonText: {
    color: whiteColor,
    fontSize: style.fontSizeMedium.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
});
