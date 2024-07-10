import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { BaseStyle } from "../shared/styles";
import { GOOGLE_LOGO } from "../assets/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HideBottomTabContext } from "../context/HideBottomTabProvider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  webPlatform,
} from "../utils";
import {
  ADD,
  BUDGET_OVERVIEW,
  DUE_BILLS,
  EXPENSE,
  INCOME,
  MY_GOALS,
  SELECT_CATEGORY,
  dueBillData,
  myGoalsData,
} from "../constants/constants";
import Tooltip from "../components/Tooltip";
import CustomDrawer from "../components/modals/CustomDrawer";
import Button from "../components/Button";
import BudgetOverView from "../components/BudgetOverView";
import MyGoals from "../components/MyGoals";
import DueBills from "../components/DueBills";
import { spacings, style } from "../shared/constants/fonts";
import {
  backgroundColor,
  blackColor,
  buttonTextColor,
  homeButtonBackGround,
  lightRed,
  linkTextColor,
  whiteColor,
} from "../constants/colors";
import CalculatorModal from "../components/modals/CalculatorModal";
import { DrawerActions } from "@react-navigation/native";

const {
  flex,
  flexDirectionRow,
  justifyContentSpaceBetween,
  alignItemsCenter,
  alignJustifyCenter,
  borderRadius8,
  borderRadius18,
  positionAbsolute,
  borderRadius5,
} = BaseStyle;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [CalculatorVisible, setCalculatorVisible] = useState(false);
  const contextData = useContext(HideBottomTabContext);
  const {
    handleExpensePress,
    drawerVisible,
    setDrawerVisible,
    setTooltipVisible,
    tooltipVisible,
  } = contextData;

  const handleTooltipVisible = () => {
    setTooltipVisible(true);
  };

  const handleCalculatorShow = () => {
    setDrawerVisible(false);
    setCalculatorVisible(true);
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };
  const handleCalculatorClose = () => {
    setCalculatorVisible(false);
    navigation.setOptions({
      tabBarStyle: {
        backgroundColor: blackColor,
        height: hp(10),
        paddingBottom: 15,
        paddingTop: spacings.xLarge,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
    });
  };
  const handleTooltipClose = () => {
    console.log("its");
    setTooltipVisible(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleTooltipClose}>
        <View style={[flex, styles.mainContainer]}>
          {(tooltipVisible || drawerVisible) && (
            <BlurView
              intensity={Platform.OS === "ios" ? 5 : 0.5}
              tint="light"
              style={{ ...StyleSheet.absoluteFillObject, zIndex: 2 }}
              onPress={handleTooltipClose}
            />
          )}
          <View
            style={[
              styles.profileContainer,
              flexDirectionRow,
              justifyContentSpaceBetween,
              alignItemsCenter,
            ]}
          >
            <View
              style={[
                styles.profileImageBox,
                flexDirectionRow,
                alignItemsCenter,
              ]}
            >
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Image
                  source={GOOGLE_LOGO}
                  style={[styles.profileImage, borderRadius18]}
                />
              </TouchableOpacity>
              <View style={styles.name_balanceBox}>
                <Text style={[style.fontSizeNormal2x, style.fontWeightMedium]}>
                  Rahat Anwar
                </Text>
                <TouchableOpacity
                  style={[
                    styles.checkBalanceBtn,
                    flexDirectionRow,
                    alignItemsCenter,
                    borderRadius5,
                  ]}
                >
                  <MaterialIcons
                    name="account-balance-wallet"
                    size={20}
                    color={whiteColor}
                  />
                  <Text
                    style={[
                      { color: whiteColor },
                      style.fontSizeSmall1x,
                      style.fontWeightMedium,
                    ]}
                  >
                    Tap for Balance
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <MaterialIcons name="refresh" size={30} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
            <View style={[styles.budgetOverviewContainer]}>
              <Text
                style={[
                  styles.headingText,
                  style.fontSizeNormal2x,
                  style.fontWeightMedium1x,
                ]}
              >
                {BUDGET_OVERVIEW}
              </Text>
              <View
                style={[
                  styles.overViewBoxes,
                  flexDirectionRow,
                  justifyContentSpaceBetween,
                ]}
              >
                <BudgetOverView
                  backgroundColor={linkTextColor}
                  budgetTypeText={INCOME}
                  bonuses="2.5% plus Bonus"
                  amount={`$5000,00`}
                />
                <BudgetOverView
                  backgroundColor={lightRed}
                  budgetTypeText={EXPENSE}
                  bonuses="2.5% plus Bonus"
                  amount={`$5000,00`}
                />
              </View>
            </View>
            <View style={styles.goalsContainer}>
              <Text
                style={[
                  styles.headingText,
                  style.fontSizeNormal2x,
                  style.fontWeightMedium1x,
                ]}
              >
                {MY_GOALS}
              </Text>
              <ScrollView
                horizontal
                contentContainerStyle={{ gap: wp(2), marginTop: spacings.xLarge }}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
              >
                {myGoalsData.map((item, index) => (
                  <MyGoals item={item} onPress={() => console.log("my__goals_card_press")} key={index} />
                ))}
              </ScrollView>
            </View>
            <View style={styles.due_billsContainer}>
              <Text
                style={[
                  styles.headingText,
                  style.fontSizeNormal2x,
                  style.fontWeightMedium1x,
                ]}
              >
                {DUE_BILLS}
              </Text>
              <FlatList
                data={dueBillData}
                renderItem={({ item }) => (
                  <DueBills
                    billName={item?.billName}
                    BNInfo={item?.dueDAte}
                    billAmount={item?.payment}
                  />
                )}
                keyExtractor={(_, index) => index.toString()}
                style={[styles.dueBillFlatList]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
          <View
            style={[
              styles.addBtnCnt,
              flexDirectionRow,
              positionAbsolute,
              alignJustifyCenter,
            ]}
          >
            <Button
              buttonText={ADD}
              buttonStyle={[
                styles.buttonStyle,
                alignJustifyCenter,
                borderRadius8,
                flexDirectionRow,
                { width: wp(25) },
              ]}
              textStyle={styles.buttonText}
              showPlusIcon
              onPress={handleTooltipVisible}
            />
            <Tooltip
              isVisible={tooltipVisible}
              position={{ bottom: hp(2.7) + hp(6), right: 0 }}
              onClose={handleTooltipClose}
              handleAddGoalPress={handleExpensePress}
              navigation={navigation}
            />
          </View>
          {drawerVisible && (
            <CustomDrawer
              drawerHeading={SELECT_CATEGORY}
              isOpen={drawerVisible}
              onClose={handleDrawerClose}
              navigation={navigation}
              handleCalculatorShow={handleCalculatorShow}
            />
          )}
          {CalculatorVisible && (
            <CalculatorModal
              isVisible={CalculatorVisible}
              onClose={handleCalculatorClose}
              navigation={navigation}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.Large1x,
    gap: Platform.OS === "web" ? wp(2.5) : wp(5),
    marginTop: webPlatform ? spacings.xxxLarge : null,
    ...StyleSheet.absoluteFill,
    backgroundColor: backgroundColor,
  },
  profileImageBox: {
    gap: wp(3),
  },
  profileImage: {
    width: 36,
    height: 36,
  },
  name_balanceBox: {
    gap: 3,
  },
  checkBalanceBtn: {
    backgroundColor: linkTextColor,
    paddingRight: spacings.large,
    paddingLeft: spacings.normal,
    gap: 3,
    paddingVertical: 2,
  },
  budgetOverviewContainer: {
    width: "100%",
    paddingTop: spacings.large,
  },
  overViewBoxes: {
    paddingTop: spacings.large,
    gap: wp(3),
  },
  headingText: {
    color: blackColor,
  },
  goalsContainer: {
    paddingTop: hp(2),
  },
  goalsBoxes: {
    paddingTop: hp(2),
  },
  dueBillFlatList: {
    paddingTop: spacings.large,
  },
  due_billsContainer: {
    paddingTop: hp(2),
    flex: 1,
  },
  addBtnCnt: {
    gap: 10,
    right: 15,
    bottom: hp(2.7),
    zIndex: 10,
  },
  buttonStyle: {
    display: "flex",
    height: hp(6),
    backgroundColor: homeButtonBackGround,
    marginBottom: spacings.xLarge,
  },
  buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
  },
});
