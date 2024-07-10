import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, } from "react-native";
import { BaseStyle } from "../shared/styles";
import { spacings } from "../shared/constants/fonts";
import {
  widthPercentageToDP as wp,
  webPlatform,
} from "../utils";
import {
  backgroundColor,
  bankAcIconColor,
  creditCardIconColor,
  investmentIconColor,
} from "../constants/colors";
import Header from "../components/Header";
import {
  ACCOUNT_OVERVIEW,
  BANK_ACCOUNT,
  CREDIT_CARDS,
  FIND_YOUR_BANK_SCREEN,
  INVESTMENTS,
  LINK_AN_BANK_ACCOUNT,
  LINK_INVESTMENT_ACCOUNT,
  LINK_YOUR_CREDIT_CARD,
  VIEW_BALANCE_AND_TRANSACTION,
} from "../constants/constants";
import AccountOverviewCard from "../components/AccountOverviewCard";

const { flex } = BaseStyle;

const AccountOverviewScreen = ({ navigation, route }) => {
  const [accountDetails, setAccountDetails] = useState([
    { type: BANK_ACCOUNT, color: bankAcIconColor, key: 1, cardImage: "" },
    { type: CREDIT_CARDS, color: creditCardIconColor, key: 2, cardImage: "" },
    { type: INVESTMENTS, color: investmentIconColor, key: 3, cardImage: "" },
  ]);

  const handleCardOnPress = (from) => {
    navigation.navigate(FIND_YOUR_BANK_SCREEN, {
      commingFrom: from,
      type: from?.type,
    });
  };

  useEffect(() => {
    setAccountDetails(
      accountDetails.map((item) =>
        item.key === route?.params?.card?.key
          ? { ...item, cardImage: route?.params?.card?.cardImage }
          : item,
      ),
    );
  }, [route?.params?.card]);

  const renderAccountCards = () => {
    return accountDetails.map((item, index) => (
      <View
        style={{ gap: webPlatform ? wp(1) : wp(2.4) }}
        key={item.key}
      >
        <AccountOverviewCard
          cardHeading={item.type}
          accountHeading={
            item.type === BANK_ACCOUNT
              ? LINK_AN_BANK_ACCOUNT
              : item.type === CREDIT_CARDS
                ? LINK_YOUR_CREDIT_CARD
                : LINK_INVESTMENT_ACCOUNT
          }
          accountText={VIEW_BALANCE_AND_TRANSACTION}
          bgColor={item.color}
          onPress={() => handleCardOnPress(item)}
        />
        {item.cardImage !== "" && (
          <AccountOverviewCard
            accountHeading={
              item.type === BANK_ACCOUNT
                ? "Visa Bank Limited"
                : item.type === CREDIT_CARDS
                  ? "Master Card"
                  : "Investment Account"
            }
            accountText={"123 56** ***** 9876"}
            iconColor={bankAcIconColor}
            cardImage={item.cardImage}
            onPress={() => console.log("clicked====>")}
          />
        )}
      </View>
    ));
  };

  return (
    <View style={[styles.mainContainer, flex]}>
      <Header headerText={ACCOUNT_OVERVIEW} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderAccountCards()}
      </ScrollView>
    </View>
  );
};

export default AccountOverviewScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.xxxxLarge,
    marginVertical: webPlatform ? spacings.xxxxLarge : spacings.xLarge,
    backgroundColor: backgroundColor,
    gap: webPlatform ? wp(3) : wp(6),
  },
  scrollView: {
    gap: webPlatform ? wp(2) : wp(4),
  },
});
