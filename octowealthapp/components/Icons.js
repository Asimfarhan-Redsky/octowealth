import { View, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "../utils";
import {
  blackColor,
  sliderColor,
} from "../constants/colors";
import { SEARCH_ICON, iconsList } from "../constants/constants";
const {
  flexDirectionRow,
  alignItemsCenter,
  width100Percent,
  flex,
} = BaseStyle;


const Icons = ({ item, handleIconPress }) => {
  return (
    <View style={[styles.mainContainer, flex]}>
      <View style={[width100Percent, { gap: wp(3) }, flex]}>
        <View style={[styles.textInput, width100Percent, flexDirectionRow, alignItemsCenter]}>
          <MaterialIcons name="search" size={30} />
          <TextInput
            placeholder={SEARCH_ICON}
            placeholderTextColor={blackColor}
            onChange={(text) => console.log(text)}
            style={[style.fontSizeNormal, { outline: 'none' }]}
          />
        </View>
        <FlatList data={iconsList}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[alignItemsCenter, { width: '14.2%', marginVertical: spacings.large, }]} onPress={() => handleIconPress(item)}>
              <item.iconType key={index} name={item.iconName} size={35} color={blackColor} />
            </TouchableOpacity>
          )}
          numColumns={7}
          contentContainerStyle={[width100Percent]}
        />
      </View>
    </View>
  );
};

export default Icons;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.xxxxLarge,
    gap: wp(10),

  },
  textInput: {
    paddingHorizontal: spacings.xxxxLarge, paddingVertical: spacings.large,
    borderRadius: 10, gap: wp(3), borderWidth: 1, borderColor: sliderColor, height: hp(7)
  },
});
