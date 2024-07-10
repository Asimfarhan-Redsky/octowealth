import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { buttonTextColor, homeButtonBackGround } from "../constants/colors";
import { ADD_EXPENSE, ADD_GOAL, ADD_GOAL_SCREEN, ADD_INCOME } from "../constants/constants";
import { spacings } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles";
import { widthPercentageToDP as wp } from "../utils/index";

const { flexDirectionRow, justifyContentSpaceBetween, borderRadius18 } =
  BaseStyle;

const Tooltip = ({ isVisible, onClose, position, handleAddGoalPress ,navigation}) => {
  if (!isVisible) return null;
  const handlePress = () => {
    if (onClose) {
      onClose();
    }
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
    navigation.navigate(ADD_GOAL_SCREEN);
  };
  return (
    <View style={[styles.tooltipContainer, position, borderRadius18]}>
      <View style={styles.triangle} />
      <TouchableOpacity
        style={[flexDirectionRow, justifyContentSpaceBetween]}
        onPress={handlePress}
      >
        <Text style={styles.tooltipItem}>{ADD_GOAL} </Text>
        <Text style={styles.icon}>
          <Feather name="target" color={buttonTextColor} size={22} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[flexDirectionRow, justifyContentSpaceBetween]}
        onPress={handleAddGoalPress}
      >
        <Text style={styles.tooltipItem}>{ADD_INCOME}</Text>
        <Text style={styles.icon}>
          <AntDesign name="barchart" color={buttonTextColor} size={22} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[flexDirectionRow, justifyContentSpaceBetween]}
        onPress={handleAddGoalPress}
      >
        <Text style={styles.tooltipItem}>{ADD_EXPENSE}</Text>
        <Text style={styles.icon}>
          <Feather name="activity" color={buttonTextColor} size={22} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    width: wp(40),
    backgroundColor: homeButtonBackGround,
    padding: spacings.xLarge,
    position: "absolute",
    zIndex: 888,
  },
  triangle: {
    width: 50,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: spacings.xLarge,
    borderRightWidth: spacings.xLarge,
    borderTopWidth: spacings.xLarge,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: homeButtonBackGround,
    position: "absolute",
    bottom: -10,
    alignSelf: 'center'
  },
  tooltipItem: {
    color: buttonTextColor,
    padding: 6,
  },
  icon: {
    marginLeft: spacings.xLarge,
    marginTop: spacings.normal,
  },
});

export default Tooltip;
