import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, webPlatform, iosPlatform, heightPercentageToDP as hp } from "../utils";
import { spacings } from "../shared/constants/fonts";
import { style } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles";
import {
  DEM0_PROFILE_IMG,
  HOME_IMG,
  BANK_IMG,
  TRANSACTION_IMG,
  INVESTMENT_IMG,
  REPORT_IMG,
  BUDGET_IMG,
  DEBT_IMG,
  TAX_IMG,
  BILL_IMG,
  GOAL_IMG,
  SUBSCRIPTION_IMG,
  INVITE_IMG,
  FOLLOW_IMG,
  SETTING_IMG,
  LOGOUT_IMG,
} from "../assets/images";
import CommonDrawerCard from "./CommonDrawerCard";
import { useDrawerStatus } from "@react-navigation/drawer";
import {
  bottomBorderColor,
  homeButtonBackGround,
  whiteColor,
} from "../constants/colors";
import {
  ACCOUNT_OVERVIEW_STACK_SCREEN,
  BILL_MANAGEMENT_SCREEN,
  HOME_SCREEN,
  INVESTMENT_DASHBOARD,
  TAX_INFO_SCREEN,
  TRANSSACTION_HISTORY,
} from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLogedinUser } from "../redux/slices/userLogedinSlice";

const { flexDirectionRow, alignJustifyCenter, positionAbsolute } = BaseStyle;

const drawerData = [
  [
    { cardName: "Home", cardIcon: HOME_IMG },
    { cardName: "Bank accounts", cardIcon: BANK_IMG },
  ],
  [
    { cardName: "Transactions", cardIcon: TRANSACTION_IMG },
    { cardName: "Investment", cardIcon: INVESTMENT_IMG },
    { cardName: "Report", cardIcon: REPORT_IMG },
  ],
  [
    { cardName: "Budgets", cardIcon: BUDGET_IMG },
    { cardName: "Debts", cardIcon: DEBT_IMG },
    { cardName: "Tax information", cardIcon: TAX_IMG },
    { cardName: "Bills", cardIcon: BILL_IMG },
    { cardName: "Goals", cardIcon: GOAL_IMG },
    { cardName: "Subscription", cardIcon: SUBSCRIPTION_IMG },
  ],
  [
    { cardName: "Dark mode", isToggleBtn: true },
    { cardName: "Hide amounts", isToggleBtn: true },
  ],
  [
    { cardName: "Invite friends", cardIcon: INVITE_IMG },
    { cardName: "Follow us", cardIcon: FOLLOW_IMG },
    { cardName: "Settings", cardIcon: SETTING_IMG },
    { cardName: "Logout", cardIcon: LOGOUT_IMG },
  ],
];
const CustomDrawerContent = (props) => {
  const isDrawerOpen = useDrawerStatus();
  const [isActive, setIsActive] = useState([0, -1, -1, -1, -1]);
  const dispatch = useDispatch();

  const handleCardPress = (sectionIndex, cardIndex, screenName, navigation) => {
    setIsActive((prevState) => {
      const newState = prevState.map((item, index) =>
        index === sectionIndex ? cardIndex : -1,
      );
      return newState;
    });
    switch (screenName) {
      case "Home":
        navigation.navigate(HOME_SCREEN);
        break;
      case "Logout":
        handleLogout();
        break;
      case "Bank accounts":
        navigation.navigate(ACCOUNT_OVERVIEW_STACK_SCREEN);
        break;
      case "Investment":
        navigation.navigate(INVESTMENT_DASHBOARD);
        break;
      case "Report":
        navigation.navigate(TAX_INFO_SCREEN);
        break;
      case "Transactions":
        navigation.navigate(TRANSSACTION_HISTORY);
        break;
        case "Bills": 
        navigation.navigate(BILL_MANAGEMENT_SCREEN);
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear()
        .then((res) => {
          dispatch(setLogedinUser(res));
          console.log("Data removed successfully", res);
        })
        .catch((err) => console.log("user not removed", err));
      // Check if props and navigation are defined before dispatching an action
      if (
        props &&
        props.navigation &&
        typeof props.navigation.dispatch === "function"
      ) {
        props.navigation.dispatch(DrawerActions.closeDrawer());
      }
    } catch (err) {
      console.log("Logout Error", err);
    }
  };

  return (
    <>
      <View
        style={[flexDirectionRow, alignJustifyCenter, styles.headerContainer]}
      >
        <Image source={DEM0_PROFILE_IMG} style={styles.profileImg} />
        <View style={styles.profileContent}>
          <Text style={[style.fontWeightMedium1x, style.fontSizeNormal]}>
            Rahat Anwar
          </Text>
          <Text style={[style.fontSizeSmall]}>rahat@gmail.com</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.backIcon,
            alignJustifyCenter,
            positionAbsolute,
            { right: isDrawerOpen === "open" ? -spacings.xxxLarge : 0 },
          ]}
          onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color={whiteColor}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: wp(2) }}>
          {drawerData.map((section, sectionIndex) => (
            <View key={sectionIndex} style={[styles.cardSection]}>
              {section.map((cardData, cardIndex) => (
                <CommonDrawerCard
                  key={cardIndex}
                  cardName={cardData?.cardName}
                  cardIcon={cardData?.cardIcon}
                  onPress={() =>
                    handleCardPress(
                      sectionIndex,
                      cardIndex,
                      cardData?.cardName,
                      props?.navigation,
                    )
                  }
                  isActive={isActive[sectionIndex] === cardIndex}
                  isToggleBtn={cardData?.isToggleBtn}
                  navigation={props?.navigation}
                />
              ))}
            </View>
          ))}
          {/* <DrawerItemList {...props}/> */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: wp(2),
    paddingTop: webPlatform ? spacings.ExtraLarge5x : StatusBar.currentHeight,
    marginBottom: spacings.ExtraLarge,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardSection: {
    borderBottomWidth: 1,
    borderColor: bottomBorderColor,
    gap: wp(1),
  },
  backIcon: {
    width: 34,
    height: 34,
    backgroundColor: homeButtonBackGround,
    borderRadius: 17,
    top: iosPlatform ? hp(3) : StatusBar.currentHeight + hp(2.5),
    overflow: "hidden",
  },
});

export default CustomDrawerContent;
