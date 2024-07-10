import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  webPlatform
} from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import {
  blackColor,
  grayColor,
  homeButtonBackGround,
  lightPinkColor,
  purpleColor,
  whiteColor,
  backgroundColor
} from "../constants/colors";
import { BaseStyle } from "../shared/styles";
import {
  ALL_RECORD,
  PAID,
  TAX,
  TAX_PREVIEW_SCREEN,
  THIS_MONTH,
  THIS_YEAR,
  UPCOMING,
} from "../constants/constants";
import TabButton from "../components/TabButton";
import { taxInfoDetails } from "../constants/constants";

const {
  alignJustifyCenter,
  alignItemsCenter,
  flexDirectionRow,
  width100Percent,
  justifyContentSpaceBetween,
  flex,
} = BaseStyle;

const TAB_BUTTONS = [
  [THIS_MONTH, THIS_YEAR, ALL_RECORD],
  [UPCOMING, PAID],
]

const TaxInfoScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, flex]}>
      <Header
        headerText={TAX}
        iconName={"plus"}
        buttonStyle={[styles.iconBtnStyle, alignJustifyCenter]}
        buttonIconColor={whiteColor}
        navigation={navigation}
      />
      <View style={[styles.tabBtnContainer, width100Percent]}>
        {TAB_BUTTONS.map((buttons, index) => (
          <TabButton
            tabBtnTexts={buttons}
            activeTabBtnColor={whiteColor}
            key={index}
          />
        ))}
      </View>
      <View style={[width100Percent, flex]}>
        <FlatList
          data={taxInfoDetails}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <TaxInfoBox taxDetails={item} navigation={navigation} />
          )}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TaxInfoScreen;

const TaxInfoBox = ({ taxDetails, navigation }) => (
  <TouchableOpacity
    style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}
    key={taxDetails?.id}
    onPress={() =>
      navigation.navigate(TAX_PREVIEW_SCREEN, { id: taxDetails?.id })
    }
  >
    <View style={[flexDirectionRow, alignItemsCenter, { gap: wp(3) }]}>
      <View style={[styles.bullet, alignJustifyCenter]}>
        <View style={[styles.innerBullet]}></View>
      </View>
      <View style={{ gap: wp(1) }}>
        <Text
          style={[
            style.fontSizeSmall2x,
            style.fontWeightMedium,
            { color: blackColor },
          ]}
        >
          {taxDetails?.productName}
        </Text>
        <Text
          style={[style.fontSizeSmall1x, { color: grayColor }]}
        >{`${taxDetails?.ownerName} - ${taxDetails?.date}`}</Text>
      </View>
    </View>
    <Text
      style={[style.fontSizeNormal, style.fontWeightBold]}
    >{`$${taxDetails?.taxAmount}`}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    paddingHorizontal: spacings.Large1x,
    paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.large,
    backgroundColor: backgroundColor,
    gap: Platform.OS === "web" ? wp(2.4) : wp(7),
  },
  iconBtnStyle: {
    backgroundColor: homeButtonBackGround,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tabBtnContainer: {
    gap: Platform.OS === "web" ? wp(3) : wp(6),
  },
  bullet: {
    width: 26,
    height: 26,
    borderRadius: 13,
    padding: spacings.large,
    borderWidth: 2,
    borderColor: lightPinkColor,
  },
  innerBullet: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: purpleColor,
  },
  listContentContainer: {
    gap: Platform.OS === "web" ? wp(3.5) : wp(6),
    height: Platform.OS === "web" ? hp(60) : null,
    paddingBottom: spacings.xxxLarge,
  },
});
