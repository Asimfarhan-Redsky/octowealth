import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  blackColor,
  homeButtonBackGround,
  whiteColor,
} from "../constants/colors";
import { spacings } from "../shared/constants/fonts";
import { heightPercentageToDP as hp } from "../utils";
import {
  ACCOUNT_OVERVIEW_SCREEN,
  ACCOUNT_OVERVIEW_STACK_SCREEN,
  ADD_GOAL_SCREEN,
  AI_SCREEN,
  ALL_GOAL_SCREEN,
  BILL_MANAGEMENT_SCREEN,
  FIND_YOUR_BANK_SCREEN,
  GOAL_DETAILS_SCREEN,
  HOME_SCREEN,
  HOME_STACK_SCREEN,
  INVESTMENT_DASHBOARD,
  INVESTMENT_DETAILS,
  INVESTMENT_TYPE_SELECTION,
  LOGIN_BANK_ACCOUNT_SCREEN,
  SEARCH_INVESTMENT,
  TAX_INFO_SCREEN,
  TAX_PREVIEW_SCREEN,
  TRANSSACTION_HISTORY,
  TRANSSACTION_NEW_SCREEN,
} from "../constants/constants";
import ReportingScreen from "../screens/ReportingScreen";
import AddGoalScreen from "../screens/AddGoalScreen";
import AllGoalsScreen from "../screens/AllGoalsScreen";
import AccountOverviewScreen from "../screens/AccountOverViewScreen";
import GoalDetailScreen from "../screens/GoalDetailsScreen";
import { HideBottomTabContext } from "../context/HideBottomTabProvider";
import AIScreen from "../screens/AIScreen";
import FindYourBankScreen from "../screens/FindYourBankScreen";
import LoginBankAcScreen from "../screens/LoginBankAcScreen";
import InvestmentDashboard from "../screens/InvestmentDashboard";
import InvestmentTypeSelection from "../screens/InvestmentTypeSelection";
import TransactionsScreen from "../screens/TransactionsScreenNew";
import SearchInvestment from "../screens/SearchInvestment";
import InvestmentDetails from "../screens/InvestmentDetails";
import TaxInfoScreen from "../screens/TaxInfoScreen";
import TaxPreviewScreen from "../screens/TaxPreviewScreen";
import TransactionsHistory from "../screens/TransactionsHistory";
import TransactionHistory1 from "../screens/TransactionHistory1";
import BillManagement from "../screens/BillManagement";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={HOME_SCREEN}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Reporting"
      component={ReportingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={ADD_GOAL_SCREEN}
      component={AddGoalScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={ALL_GOAL_SCREEN}
      component={AllGoalsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={GOAL_DETAILS_SCREEN}
      component={GoalDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={INVESTMENT_DASHBOARD}
      component={InvestmentDashboard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={INVESTMENT_TYPE_SELECTION}
      component={InvestmentTypeSelection}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SEARCH_INVESTMENT}
      component={SearchInvestment}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={INVESTMENT_DETAILS}
      component={InvestmentDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={TAX_INFO_SCREEN}
      component={TaxInfoScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={TAX_PREVIEW_SCREEN}
      component={TaxPreviewScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={TRANSSACTION_HISTORY}
      component={TransactionsHistory}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={BILL_MANAGEMENT_SCREEN}
      component={BillManagement}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const AccountOverviewStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ACCOUNT_OVERVIEW_SCREEN}
      component={AccountOverviewScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={FIND_YOUR_BANK_SCREEN}
      component={FindYourBankScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={LOGIN_BANK_ACCOUNT_SCREEN}
      component={LoginBankAcScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  const contextReciever = useContext(HideBottomTabContext);
  const TabScreenOptions = ({ route }) => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    const hiddenRoutes = [
      ADD_GOAL_SCREEN,
      ALL_GOAL_SCREEN,
      GOAL_DETAILS_SCREEN,
      FIND_YOUR_BANK_SCREEN,
      LOGIN_BANK_ACCOUNT_SCREEN,
      INVESTMENT_DASHBOARD,
      INVESTMENT_TYPE_SELECTION,
      SEARCH_INVESTMENT,
      INVESTMENT_DETAILS,
      TRANSSACTION_HISTORY,
      BILL_MANAGEMENT_SCREEN
    ];
    const hidden = hiddenRoutes.includes(focusedRoute);

    return {
      tabBarStyle: {
        backgroundColor: blackColor,
        height: hp(10),
        paddingBottom: spacings.large,
        paddingTop: spacings.xxxxLarge,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        display: hidden || contextReciever?.drawerVisible ? "none" : undefined,
      },
      tabBarLabel:
        route.name === HOME_STACK_SCREEN
          ? "Home"
          : route.name === ACCOUNT_OVERVIEW_STACK_SCREEN
          ? "Chart"
          : route?.name === AI_SCREEN
          ? "Goals"
          : "More",
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case HOME_STACK_SCREEN:
            return <Octicons name="home" size={size} color={color} />;
          case ACCOUNT_OVERVIEW_STACK_SCREEN:
            return <SimpleLineIcons name="chart" color={color} size={size} />;
          case AI_SCREEN:
            return <Feather name="target" color={color} size={size} />;
          default:
            return <Feather name="more-horizontal" color={color} size={size} />;
        }
      },
      headerShown: false,
    };
  };
  return (
    <Tab.Navigator
      initialRouteName={HOME_STACK_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: homeButtonBackGround,
        tabBarInactiveTintColor: whiteColor,
      }}
    >
      <Tab.Screen
        name={HOME_STACK_SCREEN}
        component={HomeStackScreen}
        options={TabScreenOptions}
      />
      <Tab.Screen
        name={ACCOUNT_OVERVIEW_STACK_SCREEN}
        component={AccountOverviewStackScreen}
        options={TabScreenOptions}
      />
      <Tab.Screen
        name={AI_SCREEN}
        component={TransactionHistory1}
        options={TabScreenOptions}
      />
      <Tab.Screen
        name={TRANSSACTION_NEW_SCREEN}
        component={TransactionsScreen}
        options={TabScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
