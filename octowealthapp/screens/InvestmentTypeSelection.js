import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { BaseStyle } from "../shared/styles";
import {  webPlatform, widthPercentageToDP as wp, heightPercentageToDP as hp } from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import {
  blackColor,
  whiteColor,
  backgroundColor,
  royalBlue,
  forestGreen,
} from "../constants/colors";
import {
  SEARCH_INVESTMENT,
  SELECT_INVESTMENT_TYPE,
} from "../constants/constants";

const {
  width100Percent,
  flexDirectionRow,
  alignItemsCenter,
  justifyContentSpaceBetween,
  alignJustifyCenter,
  flex
} = BaseStyle;

const investmentTypes = [
  { type: "Stocks", description: "Stocks and ETFs" },
  { type: "Crypto", description: "Bitcoin, Ethereum, Dogecoin, etc." },
  { type: "Precious Metals", description: "Gold, Silver, Platinum, etc." },
  { type: "Savings", description: "Savings account or savings in cash" },
  {
    type: "Others",
    description: "Any other types of investment with custom interest",
  },
];

const InvestmentCategoryItem = React.memo(({ item, isActive, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={[
      styles.cardContainer,
      width100Percent,
      flexDirectionRow,
      alignItemsCenter,
      justifyContentSpaceBetween,
      { backgroundColor: isActive ? royalBlue : whiteColor },
    ]}
  >
    <View style={{ gap: wp(0.5) }}>
      <Text
        style={[styles.typeText, { color: isActive ? whiteColor : blackColor }]}
      >
        {item.type}
      </Text>
      <Text
        style={[
          styles.descriptionText,
          {
            color: isActive ? whiteColor : blackColor,
            fontWeight: isActive ? style.fontWeightThin1x.fontWeight : null,
          },
        ]}
      >
        {item.description}
      </Text>
    </View>
    {isActive && (
      <View style={[styles.iconContainer, alignJustifyCenter]}>
        <FontAwesome5 name="check" size={17} color={whiteColor} />
      </View>
    )}
  </TouchableOpacity>
));

const InvestmentTypeSelection = ({ navigation }) => {
  const [activeType, setActiveType] = useState("Stocks");

  const handleInvestmentTypePress = (type) => {
    setActiveType(type);
    navigation.navigate(SEARCH_INVESTMENT);
  };
  return (
      <View style={[styles.container, flex]}>
        <Text style={styles.headingText}>{SELECT_INVESTMENT_TYPE}</Text>
        <FlatList
          data={investmentTypes}
          renderItem={({ item }) => (
            <InvestmentCategoryItem
              item={item}
              isActive={item.type === activeType}
              onPress={() => handleInvestmentTypePress(item?.type)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
  );
};

export default InvestmentTypeSelection;

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    backgroundColor: backgroundColor,
    paddingTop: webPlatform ? wp(2.5) : spacings.large,
    paddingHorizontal: spacings.Large2x,
    gap: webPlatform ? wp(2) : wp(3),
  },
  headingText: {
    fontSize: style.fontSizeLargeXX.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
  },
  flatListContainer: {
    gap: webPlatform ? wp(2.7) : wp(4),
  },
  cardContainer: {
    paddingVertical: spacings.xxxxLarge,
    paddingHorizontal: spacings.xxLarge,
    borderRadius: 12,
  },
  typeText: {
    fontSize: style.fontSizeMedium.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
  },
  descriptionText: {
    fontSize: style.fontSizeSmall.fontSize,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: forestGreen,
  },
});
