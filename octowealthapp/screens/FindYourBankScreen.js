import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  webPlatform,
} from "../utils";
import { backgroundColor, brownGray, whiteColor } from "../constants/colors";
import {
  FIND_YOUR_BANK,
  FIND_YOUR_CREDIT_CARD,
  LOGIN_BANK_ACCOUNT_SCREEN,
  SEARCH_FOR_YOUR_BANK,
  SEARCH_FOR_YOUR_CREDIT_CARD,
  creditCards,
} from "../constants/constants";
import Header from "../components/Header";

const {
  flexDirectionRow,
  alignItemsCenter,
  width100Percent,
  flex,
  resizeModeContain,
} = BaseStyle;

const FindYourBankScreen = ({ navigation, route }) => {
  const { commingFrom } = route?.params;

  const handleCardImagePress = (item) => {
    navigation.navigate(LOGIN_BANK_ACCOUNT_SCREEN, {
      from: { ...commingFrom, cardImage: item?.cardImage },
      type: route?.params?.type,
    });
  };

  return (
    <View style={[styles.mainContainer, width100Percent, flex]}>
      <Header
        headerText={
          route?.params?.type === "Credit Cards"
            ? FIND_YOUR_CREDIT_CARD : FIND_YOUR_BANK
        }
        navigation={navigation}
      />
      <View style={[styles.textInput, flexDirectionRow, alignItemsCenter]}>
        <AntDesign name="search1" size={26} color={brownGray} />
        <TextInput
          placeholder={
            route?.params?.type === "Credit Cards"
              ? SEARCH_FOR_YOUR_CREDIT_CARD : SEARCH_FOR_YOUR_BANK
          }
          onChangeText={(text) => console.log(text)}
          placeholderTextColor={brownGray}
          style={[
            style.fontSizeNormal1x,
            {
              width: Platform.OS === "web" ? "100%" : "70%",
              padding: spacings.large,
            },
          ]}
        />
      </View>
      <FlatList
        data={creditCards}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCardImagePress(item)}
            style={
              Platform.OS === "web"
                ? [styles.imageContainerWeb]
                : [styles.imageContainer]
            }
            activeOpacity={0.9}
          >
            <Image
              source={item?.cardImage}
              style={[styles.cardImage, resizeModeContain]}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={[
          alignItemsCenter,
          { paddingRight: spacings.large },
        ]}
        numColumns={Platform.OS === "web" ? 6 : 3}
        columnWrapperStyle={{gap: -spacings.large}}
      />
    </View>
  );
};

export default FindYourBankScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.xLarge,
    backgroundColor: backgroundColor,
    gap: wp(5),
  },
  textInput: {
    paddingHorizontal: spacings.ExtraLarge,
    paddingVertical: spacings.large,
    backgroundColor: whiteColor,
    borderRadius: 24,
    gap: wp(1.5),
    height: hp(7),
  },
  cardImage: {
    width: "90%",
    height: hp(8),
    margin: spacings.large,
  },
  imageContainer: {
    width: wp(27),
    marginHorizontal: spacings.large,
    padding: 0,
  },
  imageContainerWeb: {
    width: wp(10),
  },
});
