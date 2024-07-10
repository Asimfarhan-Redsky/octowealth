import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import {
  black70,
  blackColor,
  modalbackgroundColor,
  progressTitleColor,
  whiteColor,
} from "../constants/colors";
const {
  flexDirectionRow,
  alignItemsCenter,
  alignJustifyCenter,
  width100Percent,
  justifyContentSpaceBetween,
} = BaseStyle;

const AccountOverviewCard = ({
  cardHeading,
  accountHeading,
  accountText,
  bgColor,
  cardImage,
  onPress,
}) => {
  return (
    <View style={[styles.mainContainer, width100Percent]}>
      {cardImage ? null : (
        <Text
          style={[
            style.fontSizeNormal2x,
            style.fontWeightMedium,
            { color: black70 },
          ]}
        >
          {cardHeading}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.card,
          flexDirectionRow,
          alignItemsCenter,
          width100Percent,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {cardImage ? (
          <Image
            source={cardImage}
            style={[styles.cardImage]}
            resizeMode="contain"
          />
        ) : (
          <View
            style={[
              styles.iconBox,
              alignJustifyCenter,
              { backgroundColor: bgColor },
            ]}
          >
            <Octicons name="plus-circle" size={26} color={whiteColor} />
          </View>
        )}
        <View
          style={[styles.textBox, flexDirectionRow, justifyContentSpaceBetween]}
        >
          <View style={{ paddingHorizontal: spacings.large }}>
            <Text
              style={[
                style.fontSizeMedium,
                style.fontWeightMedium,
                { paddingBottom: spacings.large, color: blackColor },
              ]}
            >
              {accountHeading}
            </Text>
            <Text
              style={[
                style.fontSizeSmall1x,
                { lineHeight: 17, color: progressTitleColor },
              ]}
            >
              {accountText}
            </Text>
          </View>
          {cardImage && <MaterialIcons name="keyboard-arrow-right" size={40} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AccountOverviewCard;

const styles = StyleSheet.create({
  mainContainer: {
    gap: wp(2),
  },
  card: {
    backgroundColor: whiteColor,
    borderRadius: 18,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.ExtraLarge,
    gap: wp(2.5),
  },
  iconBox: {
    flex: Platform.OS === "web" ? 0.2 : 0.7,
    height:
      Platform.OS === "ios" ? hp(7) : Platform.OS === "web" ? hp(11) : hp(7.7),
    borderRadius: 8,
  },
  textBox: {
    flex: 3,
  },
  cardImage: {
    flex: Platform.OS === "web" ? 0.3 : 1,
    height: Platform.OS === "web" ? hp(10) : hp(7),
  },
});
