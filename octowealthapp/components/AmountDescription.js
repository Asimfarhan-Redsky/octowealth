import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  blackColor,
  charcolColor,
  modalbackgroundColor,
  whiteColor,
} from "../constants/colors";
import { TOTAL, TOTAL_BALANCE } from "../constants/constants";
import DueBills from "./DueBills";
import { FOOD_IMG } from "../assets/images";
import PieChart from "react-native-pie-chart";
import { widthPercentageToDP as wp } from "../utils";

const {
  flexDirectionRow,
  justifyContentSpaceBetween,
  alignItemsCenter,
  borderRadius17,
  alignItemsFlexEnd,
  width100Percent,
} = BaseStyle;

const transactionData = [
  {
    id: "1",
    billName: "Salary",
    dueDAte: "14-april-2023",
    payment: "$500",
    percentage: "40%",
    image: FOOD_IMG,
    color: blackColor,
  },
  {
    id: "2",
    billName: "Gifts",
    dueDAte: "14-april-2023",
    payment: "$500",
    percentage: "40%",
    image: FOOD_IMG,
    color: blackColor,
  },
  {
    id: "3",
    billName: "Interest",
    dueDAte: "14-april-2023",
    payment: "$500",
    percentage: "40%",
    image: FOOD_IMG,
    color: blackColor,
  },
];

const AmountDescription = (props) => {
  const widthAndHeight = Platform.OS === "web" ? wp(12) : wp(30);
  const series = [123, 321, 123];
  const sliceColor = ["#177AD5", "orange", "pink"];

  return (
    <View style={[styles.container, borderRadius17, width100Percent]}>
      <View
        style={[
          styles.desBox,
          width100Percent,
          flexDirectionRow,
          justifyContentSpaceBetween,
        ]}
      >
        <View style={[styles.detailsBox]}>
          <Text style={[styles.text]}>{props?.headerText}</Text>
        </View>
        <View style={[styles.detailsBox, alignItemsFlexEnd]}>
          <Text style={styles.totalText}>{TOTAL}</Text>
          <Text style={[styles.amountText]}>$ {props?.amount}</Text>
        </View>
      </View>
      <View style={[alignItemsCenter]}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.75}
          coverFill={whiteColor}
        />
      </View>
      <FlatList
        scrollEnabled={false}
        data={transactionData}
        renderItem={({ item }) => (
          <DueBills
            billName={item?.billName}
            BNInfo={item?.dueDAte}
            billAmount={item?.payment}
            dueBillStyles={[
              styles.dueBillStyles,
              {
                BNInfoColor: { color: item?.color },
              },
            ]}
            image={item?.image}
            billPercentage={item?.percentage}
            containerStyle={styles.billsConatiner}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(AmountDescription);

const styles = StyleSheet.create({
  container: {
    marginTop: spacings.Large2x,
    padding: spacings.xxLarge,
    backgroundColor: whiteColor,
    gap: Platform.OS === "web" ? wp(2) : wp(4),
  },
  billsConatiner: {
    backgroundColor: modalbackgroundColor,
    paddingVertical: spacings.xLarge,
    marginVertical: spacings.normal,
  },
  text: {
    fontSize: style.fontSizeNormal.fontSize,
    color: charcolColor,
  },
  totalText: {
    fontSize: style.fontSizeExtraSmall.fontSize,
    color: charcolColor,
  },
  amountText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: blackColor,
  },
});
