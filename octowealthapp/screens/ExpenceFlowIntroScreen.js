import React, { useRef } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { LOGIN_SCREEN } from "../constants/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "../utils/index";
import { style } from "../shared/constants/fonts";
import { BaseStyle } from "../shared/styles/index";
import { buttonTextColor, darkRedColor } from "../constants/colors";
import {
  INTRO_FINANTIAL_FREEDOM,
  INTRO_GOALS,
  INTRO_PRIVACY,
  INTRO_TRACK_BILLS,
  PAGINATION_1,
  PAGINATION_2,
  PAGINATION_3,
  PAGINATION_4,
  PAGINATION_NEXT,
} from "../assets/images";

const {
  displayFlex,
  borderRadius10,
  borderRadius24,
  alignItemsCenter,
  justifyContentSpaceBetween,
  flexDirectionColumn,
  colorWhite,
  flexDirectionRow,
  flex,
  flexHalf,
  justifyContentCenter,
  resizeModeContain,
  widthHeight100,
  width100Percent,
  textAlignCenter,
  fontSize14,
  fontSize20,
} = BaseStyle;

export const INTROS_DATA = [
  {
    heading: "PRIVACY",
    text: `Welcome to Xpense!
    Your privacy and security are our top priorities. We never share your data with anyone under any circumstances.`,
    src: INTRO_PRIVACY,
    pagination: PAGINATION_1,
  },
  {
    heading: "TRACK BILLS",
    text: `Never miss a payment again! Xpense helps you effortlessly track and manage your bills in one convenient place.`,
    src: INTRO_TRACK_BILLS,
    pagination: PAGINATION_2,
  },
  {
    heading: "GOALS",
    text: `Set clear goals and watch them become reality. Plan your financial success with ease.`,
    src: INTRO_GOALS,
    pagination: PAGINATION_3,
  },
  {
    heading: "FINANTIAL FREEDOM",
    text: `Xpense empowers you to achieve financial freedom. Control your financesÂ to set yourself up for a secure future.`,
    src: INTRO_FINANTIAL_FREEDOM,
    pagination: PAGINATION_4,
  },
];

const ExpenceFlowIntroScreen = ({ navigation }) => {
  const carouselRef = useRef(null);

  const handleNext = (index) => {
    if (index === INTROS_DATA.length - 1) {
      navigation.navigate(LOGIN_SCREEN);
    } else {
      carouselRef?.current?.next();
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: "#0AA3F0",
        },
        flex,
      ]}
    >
      <Carousel
        ref={carouselRef}
        loop
        width={widthPercentageToDP(100)}
        height={heightPercentageToDP(100)}
        data={INTROS_DATA}
        scrollAnimationDuration={1000}
        renderItem={({ index, item }) => (
          <View
            style={[
              flex,
              justifyContentSpaceBetween,
              alignItemsCenter,
              flexDirectionColumn,
            ]}
          >
            <View
              style={[
                width100Percent,
                flexHalf,
                justifyContentCenter,
                alignItemsCenter,
              ]}
            >
              <Image
                style={[
                  {
                    height: "80%",
                  },
                  width100Percent,
                  resizeModeContain,
                ]}
                source={item.src}
              />
            </View>

            <View
              style={[
                {
                  padding: "5%",
                  borderTopRightRadius: 0,
                  backgroundColor: "#fff",
                },
                borderRadius24,
                width100Percent,
                flexHalf,
                justifyContentSpaceBetween,
                alignItemsCenter,
              ]}
            >
              <Text
                style={[
                  {
                    color: "#273F44",
                  },
                  fontSize20,
                ]}
              >
                {item.heading}
              </Text>
              <Text
                style={[
                  {
                    color: "#000",
                  },
                  textAlignCenter,
                  fontSize14,
                ]}
              >
                {item.text}
              </Text>
              <View
                style={[
                  {
                    height: "15%",
                  },
                  width100Percent,
                  justifyContentSpaceBetween,
                  alignItemsCenter,
                  flexDirectionRow,
                ]}
              >
                <Image
                  style={[styles.imageContainer, resizeModeContain]}
                  source={item.pagination}
                />
                {index === INTROS_DATA.length - 1 ? (
                  <Text
                    style={[
                      styles.nextBtn,
                      displayFlex,
                      borderRadius10,
                      colorWhite,
                      justifyContentCenter,
                      alignItemsCenter,
                    ]}
                    onPress={() => {
                      handleNext(index);
                    }}
                  >
                    Go
                  </Text>
                ) : (
                  <Pressable
                    style={[styles.imageContainer]}
                    onPress={() => {
                      handleNext(index);
                    }}
                  >
                    <Image
                      style={[widthHeight100, resizeModeContain]}
                      source={PAGINATION_NEXT}
                    />
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
  },
  logoContainer: {
    width: wp(140),
    paddingTop: 10,
  },
  logoStyle: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
  imageContainer: {
    width: "8%",
    height: "50%",
  },
  imageStyle: {
    // width: 200,
    // height: 334,
    // marginTop: 40,
  },
  imageLeftStyle: {
    width: 400,
    height: 334,
    top: 350,
    right: 120,
    // marginRight:0
  },
  introBottomBackImage: {
    width: wp(100),
    height: hp(33),
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  logoTextStyle: {
    marginTop: 10,
    width: wp(50),
    height: hp(5),
  },
  headingText: {
    fontSize: style.fontSizeLarge3x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: buttonTextColor,
  },
  textStyle: {
    fontSize: style.fontSizeNormal1x.fontSize,
    color: buttonTextColor,
    lineHeight: 20,
  },
  buttonStyle: {
    display: "flex",
    height: hp(6),
    backgroundColor: darkRedColor,
    marginBottom: 10,
  },
  nextBtn: {
    width: "8%",
    fontWeight: "bold",
    height: "65%",
    backgroundColor: "#0AA3F0",
  },
  buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: buttonTextColor,
  },
});

export default ExpenceFlowIntroScreen;
