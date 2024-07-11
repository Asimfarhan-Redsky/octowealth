import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import Feather from "react-native-vector-icons/Feather";
import { BaseStyle } from "../shared/styles";
import {
  backgroundColor,
  blackColor,
  forestGreen,
  royalBlue,
} from "../constants/colors";
import { spacings } from "../shared/constants/fonts";
import Header from "../components/Header";
import { BILL_MANAGEMENT } from "../constants/constants";
import InvestmentBarChart from "../components/InvestmentBarChart";
import DueBills from "../components/DueBills";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

const {
  flex,
  justifyContentCenter,
  flexDirectionColumn,
  flexDirectionRow,
  alignItemsCenter,
  alignSelfCenter,
  textAlignCenter,
} = BaseStyle;

const barLabels = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Oct"];
const barColors = [
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
  () => royalBlue,
];
const barData = [500, 700, 1250, 1000, 2000, 1100, 1600];

const BillManagement = ({ navigation }) => {
  return (
    <View style={[styles.container, flex]}>
      <View style={[styles.headerContainer]}>
        <Header
          headerText={BILL_MANAGEMENT}
          arrowType={true}
          navigation={navigation}
        />
        <View style={[styles.barContainer]}>
          <View
            style={[
              flexDirectionColumn,
              alignSelfCenter,
              alignItemsCenter,
              { borderWidth: 1 },
            ]}
          >
            <Text>$2000</Text>
            <View style={[flexDirectionRow, alignItemsCenter]}>
              <Feather name="chevron-up" size={24} color={forestGreen} />
              <Text>$20(1%)</Text>
            </View>
          </View>
          <InvestmentBarChart
            labels={barLabels}
            colors={barColors}
            data={barData}
            bgColor={backgroundColor}
          />
        </View>
      </View>
      <GestureHandlerRootView>
      <Swipeable renderRightActions={() => <Text>test</Text>}>
      <DueBills />
      </Swipeable>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    backgroundColor: backgroundColor,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.large,
  },
  headerContainer: { gap: hp(1.7) },
  barContainer: { gap: hp(1.2) },
});

export default BillManagement;
