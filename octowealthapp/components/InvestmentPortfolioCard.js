import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BaseStyle } from "../shared/styles";
import { widthPercentageToDP as wp } from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import {
  blackColor,
  bottomBorderColor,
  grayColor,
  homeButtonBackGround,
  lightCyan,
  whiteColor,
  deepRed,
} from "../constants/colors";
import {
  ALL_YOUR_INVESTMENTS,
  EDIT,
  PORTFOLIO_VALUE,
  PROFIT_LOSS,
  TOTAL_INVESTMENT,
  TYPE_OF_PORTFOLIO,
} from "../constants/constants";
import ProgressBar from "./ProgressBar";

const {
  alignItemsCenter,
  justifyContentSpaceBetween,
  flexDirectionRow,
  alignJustifyCenter,
  alignSelfStart,
  width100Percent,
  gap1_5,
} = BaseStyle;

const InvestmentAmountBox = ({
  label,
  amount,
  color,
  isProfitLoss,
  percentage,
  cardName,
}) => {
  return (
    <View style={[styles.amountBox, isProfitLoss && styles.rightBorder]}>
      <View style={[flexDirectionRow, alignItemsCenter, gap1_5]}>
        <View
          style={[
            styles.bullet,
            { backgroundColor: color.background, borderColor: color.border },
          ]}
        />
        <Text style={[styles.labelText, { color: blackColor }]}>{label}</Text>
      </View>
      <View style={[flexDirectionRow, gap1_5, alignItemsCenter]}>
        <AntDesign
          name={cardName ? "caretdown" : "caretup"}
          size={14}
          color={color.text}
        />
        <Text style={[styles.amountText, { color: color.text }]}>
          $ {amount}.<Text style={styles.centsText}>00</Text>{" "}
          {percentage && `${percentage}%`}
        </Text>
      </View>
    </View>
  );
};

const InvestmentPortfolioCard = ({ item }) => {
  const isAllYourInvestments = item.name === ALL_YOUR_INVESTMENTS;
  const bulletColor = isAllYourInvestments ? "#DEBDC5" : "#CEE2E8";
  const amountColor = isAllYourInvestments ? deepRed : lightCyan;

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, justifyContentSpaceBetween, flexDirectionRow]}
      >
        <Text style={styles.title}>{item?.name}</Text>
        {!isAllYourInvestments && (
          <TouchableOpacity>
            <Text style={styles.editText}>{EDIT}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.card, width100Percent, alignJustifyCenter]}>
        <View style={[styles.amountContainer, flexDirectionRow]}>
          <InvestmentAmountBox
            label={isAllYourInvestments ? TOTAL_INVESTMENT : PORTFOLIO_VALUE}
            amount={item?.portfolioValue}
            color={{
              background: bulletColor,
              border: amountColor,
              text: amountColor,
            }}
            isProfitLoss
            cardName={isAllYourInvestments}
          />
          <InvestmentAmountBox
            label={PROFIT_LOSS}
            amount={item?.profitLoss}
            percentage={item?.profitLossPercentage}
            color={{
              background: bulletColor,
              border: amountColor,
              text: amountColor,
            }}
            cardName={isAllYourInvestments}
          />
        </View>
        <ProgressBar item={item} />
        <Text
          style={[
            styles.growthRateText,
            isAllYourInvestments ? {} : alignSelfStart,
          ]}
        >
          {isAllYourInvestments ? item?.type : TYPE_OF_PORTFOLIO}
          <Text style={styles.percentageText}>
            {isAllYourInvestments ? " 34%" : ` ${item?.type}`}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default React.memo(InvestmentPortfolioCard);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "web" ? wp(2) : wp(4),
  },
  header: {},
  title: {
    fontSize: style.fontSizeNormal.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: blackColor,
  },
  editText: {
    fontSize: style.fontSizeExtraSmall.fontSize,
    fontWeight: style.fontWeightBold.fontWeight,
    color: homeButtonBackGround,
  },
  card: {
    backgroundColor: whiteColor,
    borderRadius: 9,
    marginTop: Platform.OS === "web" ? wp(1.8) : wp(3.5),
    paddingVertical: spacings.xxxLarge,
    paddingHorizontal: Platform.OS === "web" ? wp(3) : wp(6),
    gap: wp(1.5),
  },
  amountContainer: {},
  amountBox: {
    paddingVertical: spacings.xLarge,
    paddingHorizontal: spacings.xxLarge,
    gap: spacings.small2x,
    marginBottom: spacings.large,
  },
  rightBorder: {
    borderRightWidth: 1.3,
    borderColor: bottomBorderColor,
  },
  bullet: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 3,
  },
  labelText: {
    fontSize: style.fontSizeSmall1x.fontSize,
  },
  amountText: {
    fontSize: style.fontSizeSmall2x.fontSize,
    fontWeight: style.fontWeightBold.fontWeight,
  },
  centsText: {
    fontSize: style.fontSizeSmall.fontSize,
    fontWeight: style.fontWeightThin.fontWeight,
    color: grayColor,
  },
  growthRateText: {
    fontSize: style.fontSizeSmall.fontSize,
    color: "#707070",
  },
  percentageText: {
    fontSize: style.fontSizeSmall2x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: "#8557A0",
    paddingLeft: spacings.large,
  },
});
