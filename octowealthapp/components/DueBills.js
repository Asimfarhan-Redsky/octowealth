import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BaseStyle } from "../shared/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import {
  blackColor,
  modalbackgroundColor,
  redColor,
  textColor,
} from "../constants/colors";

const {
  flexDirectionRow,
  borderRadius8,
  alignItemsCenter,
  alignJustifyCenter,
  justifyContentSpaceBetween,
  resizeModeContain,
  textAlignRight,
  width100Percent,
} = BaseStyle;

const DueBills = ({
  billName,
  BNInfo,
  dueBilsImageStyle,
  billAmount,
  containerStyle,
  billPercentage,
  image,
  dueBillStyles,
  billDate,
}) => {

  return (
    <TouchableOpacity
      style={[
        containerStyle ? containerStyle : styles.dueBillBox,
        dueBillStyles?.[0]?.alignItemsStart || alignItemsCenter,
        flexDirectionRow,
        justifyContentSpaceBetween,
        borderRadius8,
        width100Percent,
      ]}
    >
      <View
        style={[
          dueBillStyles?.[0]?.alignItemsStart || alignItemsCenter,
          styles.dueBillContent,
          flexDirectionRow,
        ]}
      >
        {image ? (
          <View style={[dueBillStyles?.[0]?.imageContainerStyle || null]}>
            <Image
              source={image}
              style={[
                dueBillStyles?.[0]?.imageStyle || styles.imageStyle,
                resizeModeContain,
              ]}
            />
          </View>
        ) : (
          <View
            style={[
              dueBilsImageStyle ? dueBilsImageStyle : styles.dueBillIcon,
              alignJustifyCenter,
            ]}
          >
            <MaterialIcons
              name="account-balance"
              color={dueBillStyles?.[1]?.iconColor?.color || "white"}
              size={25}
            />
          </View>
        )}
        <View style={styles.billTypeText}>
          <Text
            style={[
              dueBillStyles?.[0]?.billNameTextStyle || styles.billHeadingTxt,
            ]}
          >
            {billName}
          </Text>
          <Text
            style={[
              dueBillStyles?.[1]?.BNInfoColor || styles.duebillDatetxt,
              style.fontSizeExtraExtraSmall,
              style.fontWeightMedium,
            ]}
          >
            {BNInfo}
          </Text>
        </View>
      </View>
      <View style={{ gap: wp(1) }}>
        <Text
          style={[
            dueBillStyles?.[1]?.billAmntColor || style.fontSizeNormal1x,
            dueBillStyles?.[0]?.billAmntTextStyle || style.fontWeightMedium1x,
            textAlignRight,
          ]}
        >
          {billAmount}
        </Text>
        {(billDate || billPercentage) && (
          <Text
            style={[
              dueBillStyles?.[0]?.dateTextStyle || style.fontSizeNormal1x,
              { color: textColor },
            ]}
          >
            {billPercentage || billDate}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dueBillBox: {
    backgroundColor: modalbackgroundColor,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.xxxxLarge,
    marginVertical: spacings.large,
  },
  dueBillContent: {
    gap: 10,
  },
  dueBillIcon: {
    backgroundColor: blackColor,
    width: 40,
    height: 40,
    borderRadius: 3,
  },
  billTypeText: {
    gap: 3,
  },
  duebillDatetxt: {
    color: redColor,
  },
  imageStyle: {
    width: Platform.OS === "web" ? wp(3) : wp(10),
    height: hp(5),
  },
  billHeadingTxt: {
    fontSize: style.fontSizeNormal.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
  },
});

export default React.memo(DueBills);
