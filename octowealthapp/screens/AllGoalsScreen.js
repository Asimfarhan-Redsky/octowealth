import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { BaseStyle } from "../shared/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  webPlatform,
} from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import {
  backgroundColor,
  blackColor,
  filterBtnColor,
  homeButtonBackGround,
  modalbackgroundColor,
  whiteColor,
} from "../constants/colors";
import Header from "../components/Header";
import {
  All_GOAL,
  CHECK,
  GOAL_DETAILS_SCREEN,
  myGoalsData,
} from "../constants/constants";
import MyGoals from "../components/MyGoals";

const { flex, alignJustifyCenter, flexDirectionRow, width100Percent } =
  BaseStyle;

const filterButton = ["All", "Active", "Paused", "Reached"];

const AllGoalsScreen = ({ navigation }) => {
  const [selectedBtn, setSelectedBtn] = useState(0);

  const handleMyGoalsCardPress = (item) => {
    navigation.navigate(GOAL_DETAILS_SCREEN, { item: item });
  };
  return (
    <View style={[styles.mainContainer, flex]}>
      <Header headerText={All_GOAL} iconName={CHECK} navigation={navigation} />
      <View style={[styles.goalsProgressListBox, flex]}>
        <FlatList
          data={filterButton}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.filterBtn,
                alignJustifyCenter,
                {
                  backgroundColor:
                    selectedBtn === index
                      ? homeButtonBackGround
                      : filterBtnColor,
                },
              ]}
              onPress={() => setSelectedBtn(index)}
            >
              <Text
                style={[
                  style.fontSizeNormal,
                  { color: selectedBtn === index ? whiteColor : blackColor },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={[
            { gap: wp(2.5), paddingBottom: spacings.large },
            flexDirectionRow,
          ]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={myGoalsData}
          renderItem={({ item }) => (
            <MyGoals
              item={item}
              from={"allGoals"}
              containerStyle={[styles.goalsContainer, width100Percent]}
              onPress={() => handleMyGoalsCardPress(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ height: Platform.OS === "web" ? hp(70) : null }}
        />
      </View>
    </View>
  );
};

export default AllGoalsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.large,
    backgroundColor: backgroundColor,
    gap: wp(4),
  },
  goalsProgressListBox: { width: "100%", gap: wp(3) },

  filterBtn: {
    height: hp(5.5),
    paddingHorizontal: spacings.ExtraLarge,
    borderRadius: 8,
  },
  goalsContainer: {
    marginBottom: 15,
    paddingHorizontal: spacings.Large1x,
    paddingVertical: spacings.Large1x,
    gap: 10,
    backgroundColor: modalbackgroundColor,
  },
});
