import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Slider } from "@miblanchard/react-native-slider";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  blackColor,
  homeButtonBackGround,
  linkTextColor,
  modalbackgroundColor,
  redColor,
  sliderColor,
} from "../constants/colors";
const {
  flexDirectionRow,
  alignItemsCenter,
  alignJustifyCenter,
  justifyContentCenter,
  borderRadius17,
  justifyContentSpaceBetween,
} = BaseStyle;

const MyGoals = ({ item, from, containerStyle, onPress }) => {
  const decimalPercentage = parseFloat(item.complted / 100);
  return (
    <TouchableWithoutFeedback>
      <TouchableOpacity
        style={[
          containerStyle ? containerStyle : styles.my_goalBox,
          justifyContentCenter,
          borderRadius17,
        ]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={[flexDirectionRow, { gap: 10 }, alignItemsCenter]}>
          <View style={[styles.my_golasIcon, alignJustifyCenter]}>
            <MaterialIcons name="account-balance" color="white" size={20} />
          </View>
          <View>
            <Text style={[style.fontSizeSmall1x, style.fontWeightBold]}>
              {item.goalsType}
            </Text>
            <Text
              style={[style.fontSizeExtraSmall]}
            >{`${item.complted}% completed`}</Text>
          </View>
        </View>
        {from === "allGoals" && (
          <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
            {item?.usedAmount && (
              <Text
                style={[
                  style.fontSizeNormal,
                  style.fontWeightMedium,
                  { color: blackColor },
                ]}
              >{`$${item?.usedAmount}`}</Text>
            )}
            {item?.targetAmount && (
              <Text
                style={[
                  style.fontSizeSmall1x,
                  style.fontWeightThin,
                  { color: redColor },
                ]}
              >
                Target : {`$${item?.targetAmount}`}
              </Text>
            )}
          </View>
        )}
        <Slider
          value={decimalPercentage}
          onValueChange={(value) => console.log(value)}
          containerStyle={{
            backgroundColor: sliderColor,
            height: 10,
            borderRadius: 25,
          }}
          maximumTrackTintColor="transparent"
          minimumTrackTintColor={homeButtonBackGround}
          thumbTintColor="blue"
          trackStyle={{ height: 10, borderRadius: 25 }}
          disabled={true}
          renderThumbComponent={() => (
            <View style={[styles.trackerThumb, alignJustifyCenter]}>
              <View style={[styles.trackerWhiteThumb]}></View>
            </View>
          )}
        />
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  );
};

export default MyGoals;

const styles = StyleSheet.create({
  my_goalBox: {
    paddingHorizontal: spacings.Large1x,
    paddingVertical: spacings.Large1x,
    gap: 10,
    backgroundColor: modalbackgroundColor,
  },
  my_golasIcon: {
    backgroundColor: linkTextColor,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  trackerThumb: {
    width: 18,
    height: 18,
    borderRadius: 11,
    backgroundColor: homeButtonBackGround,
  },
  trackerWhiteThumb: {
    backgroundColor: modalbackgroundColor,
    width: 10,
    height: 10,
    borderRadius: 7,
  },
});
