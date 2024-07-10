import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BaseStyle } from "../shared/styles";
import { backgroundColor, blackColor, whiteColor } from "../constants/colors";
import { style } from "../shared/constants/fonts";
import {
  androidPlatform,
  heightPercentageToDP as wp,
  webPlatform,
  widthPercentageToDP as hp,
} from "../utils";
import { SELECT_INVESTMENT } from "../constants/constants";

const {
  alignJustifyCenter,
  flexDirectionRow,
  width100Percent,
  alignItemsCenter,
  flex,
  justifyContentEnd,
} = BaseStyle;
const Header = ({
  headerText,
  iconName,
  cardImage,
  navigation,
  onPress,
  buttonStyle,
  buttonIconColor,
  headerTextStyle,
  arrowIconColor,
}) => {

  return (
      <View
        style={[
          styles.headerContainer,
          flexDirectionRow,
          alignItemsCenter,
          width100Percent,
        ]}
      >
        <AntDesign
          name={headerText === SELECT_INVESTMENT ? "left" : "arrowleft"}
          size={28}
          color={arrowIconColor && arrowIconColor}
          onPress={() => {
            navigation.goBack();
          }}
          style={[flex]}
        />
        <Text
          style={[
            headerTextStyle && headerTextStyle,
            style.fontSizeLarge,
            style.fontWeightMedium,
            {
              flex: 3,
              textAlign: "center",
            },
          ]}
        >
          {headerText}
        </Text>
        {iconName && (
          <View
            style={[
              flexDirectionRow,
              flex,
              alignItemsCenter,
              justifyContentEnd,
              { gap: 10 },
            ]}
          >
            {iconName === "trash" && (
              <FontAwesome
                name={"pause-circle-o"}
                size={25}
                color={blackColor}
              />
            )}
            <TouchableOpacity
              onPress={onPress}
              style={
                buttonStyle
                  ? buttonStyle
                  : [
                    styles.checkIcon,
                    flexDirectionRow,
                    alignJustifyCenter,
                    {
                      backgroundColor:
                        iconName === "edit" || iconName === "trash"
                          ? "transparent"
                          : whiteColor,
                    },
                  ]
              }
            >
              <FontAwesome5
                name={iconName}
                size={20}
                color={
                  buttonIconColor
                    ? buttonIconColor
                    : iconName === "trash"
                      ? "#FF6F6F"
                      : blackColor
                }
              />
            </TouchableOpacity>
          </View>
        )}
        {cardImage && (
          <Image
            source={cardImage}
            style={[styles.cardImage]}
            resizeMode="contain"
          />
        )}
        {!iconName && !cardImage && <Text style={[flex]}></Text>}
      </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: backgroundColor,
  },
  checkIcon: {
    width: 41,
    height: 41,
    borderRadius: 12,
  },
  cardImage: {
    width: wp(8),
    height: webPlatform ? hp(5) : hp(10),
  },
});
