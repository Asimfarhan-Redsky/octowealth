import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  blackColor,
  charcoalGray,
  homeButtonBackGround,
} from "../constants/colors";
import { memo } from "react";

const {
  width100Percent,
  flexDirectionRow,
  alignItemsCenter,
  justifyContentSpaceBetween,
} = BaseStyle;

const CommonDrawerCard = ({
  cardName,
  isToggleBtn,
  cardIcon,
  onPress,
  isActive,
  navigation,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={[styles.container, width100Percent]}>
      {!isToggleBtn ? (
        <TouchableOpacity
          style={[
            styles.card,
            flexDirectionRow,
            alignItemsCenter,
            { backgroundColor: isActive ? "#AADDF0" : null },
          ]}
          onPress={onPress}
        >
          <Image
            source={cardIcon}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
          <Text
            style={[
              style.fontSizeNormal,
              style.fontWeightMedium,
              { color: blackColor },
            ]}
          >
            {cardName}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.toggleCard,
            flexDirectionRow,
            justifyContentSpaceBetween,
            alignItemsCenter,
          ]}
        >
          <Text
            style={[
              style.fontSizeNormal,
              style.fontWeightMedium,
              { color: blackColor },
            ]}
          >
            {cardName}
          </Text>
          <Switch
            trackColor={{ false: charcoalGray, true: homeButtonBackGround }}
            thumbColor={"#f4f3f4"}
            onValueChange={() => setIsEnabled(!isEnabled)}
            value={isEnabled}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default memo(CommonDrawerCard);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacings.small,
  },
  card: {
    paddingHorizontal: spacings.ExtraLarge,
    paddingVertical: spacings.xxLarge,
    borderRadius: 8,
    gap: Platform.OS === "web" ? wp(4) : wp(6),
  },
  toggleCard: {
    paddingHorizontal: spacings.ExtraLarge,
    paddingVertical: spacings.medium,
    borderRadius: 8,
  },
});
