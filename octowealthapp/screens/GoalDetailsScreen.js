import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  webPlatform
} from "../utils";
import {
  backgroundColor,
  blackColor,
  homeButtonBackGround,
  linkTextColor,
  progressTitleColor,
  storkeColor,
  whiteColor,
} from "../constants/colors";
import {
  ADD_GOAL_SCREEN,
  ADD_SAVED_AMOUNT,
  LASTADDED_AMNT,
  MINIMUM_MONTH_AMOUNT_TO_REACH_GOAL,
  SET_GOAL_AS_REACHED,
} from "../constants/constants";
import Header from "../components/Header";
import Button from "../components/Button";

const {
  alignItemsCenter,
  width100Percent,
  flex,
  textAlign,
  alignJustifyCenter,
} = BaseStyle;

const GoalDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const percentage = parseFloat(item?.complted);
  return (
    <View style={[styles.mainContainer, flex]}>
      <Header
        headerText={item?.goalsType}
        iconName={"edit"}
        navigation={navigation}
        onPress={() =>
          navigation.navigate(ADD_GOAL_SCREEN, {
            headerText: "Edit Goal",
            iconName: "trash",
            item: item,
          })
        }
      />
      <ScrollView
        style={{ height: hp(90) }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            width100Percent,
            Platform.OS == "web" ? { gap: wp(2) } : { gap: wp(8) },
          ]}
        >
          {/* <View style={[width100Percent, { gap: wp(8) }]}> */}
          <Text style={[style.fontSizeSmall2x, textAlign]}>
            Target date 31/03/2024
          </Text>
          <View style={[styles.progressContainer, alignItemsCenter]}>
            <CircularProgress
              value={percentage}
              radius={120}
              duration={1500}
              progressValueColor={blackColor}
              maxValue={100}
              title={`${item?.usedAmount}/${item?.targetAmount}`}
              valueSuffix={"%"}
              titleColor={whiteColor}
              titleStyle={[style.fontSizeMedium, { color: progressTitleColor }]}
              inActiveStrokeColor={storkeColor}
              inActiveStrokeOpacity={0.3}
              activeStrokeColor={homeButtonBackGround}
              subtitle="USD"
              subtitleStyle={[style.fontSizeMedium, { color: blackColor }]}
              activeStrokeWidth={15}
              inActiveStrokeWidth={15}
              progressValueStyle={[
                Platform.OS === "web" && { outline: "none" },
                { width: Platform.OS === "web" ? wp(6) : null, }
              ]}
              valueSuffixStyle={{ paddingRight: spacings.large }}
            />
            <View style={alignJustifyCenter}>
              <Text
                style={[
                  style.fontSizeExtraSmall,
                  { color: progressTitleColor },
                ]}
              >
                {LASTADDED_AMNT}
              </Text>
              <Text
                style={[
                  style.fontSizeMedium,
                  style.fontWeightMedium,
                  { color: blackColor },
                ]}
              >
                USD $500
              </Text>
              <Text
                style={[
                  style.fontSizeExtraSmall,
                  { color: progressTitleColor, marginTop: spacings.xxxxLarge },
                ]}
              >
                {MINIMUM_MONTH_AMOUNT_TO_REACH_GOAL}
              </Text>
              <Text
                style={[
                  style.fontSizeMedium,
                  style.fontWeightMedium,
                  { color: blackColor },
                ]}
              >
                400
              </Text>
            </View>
          </View>
          <View style={[{ gap: wp(3) }]}>
            <Button
              buttonText={ADD_SAVED_AMOUNT}
              buttonStyle={[
                styles.savedButton,
                width100Percent,
                alignJustifyCenter,
              ]}
              textStyle={[style.fontSizeMedium, { color: whiteColor }]}
            />
            <TouchableOpacity style={[alignJustifyCenter]}>
              <Text style={[style.fontSizeNormal, { color: linkTextColor }]}>
                {SET_GOAL_AS_REACHED}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GoalDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.large,
    backgroundColor: backgroundColor,
  },
  progressContainer: {
    gap: wp(6),
  },
  savedButton: {
    backgroundColor: homeButtonBackGround,
    height: hp(7),
    borderRadius: 10,
  },
});
