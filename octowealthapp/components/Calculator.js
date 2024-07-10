import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Platform, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Calendar } from 'react-native-calendars';

import { BaseStyle } from "../shared/styles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, getCurrentDate } from "../utils";
import { spacings, style } from "../shared/constants/fonts";
import { backgroundColor, blackColor, buttonTextColor, homeButtonBackGround, linkTextColor, progressTitleColor, transparent, whiteColor } from "../constants/colors";
import { CATEGORY, CURRENT_EXPRESSION, HOME_SCREEN } from "../constants/constants";
// import CalculatorButton from "./CalculatorButton";

const {
  flex,
  alignJustifyCenter,
  alignSelfEnd,
  justifyContentSpaceBetween,
  flexDirectionRow,
  alignItemsCenter,
  borderWidth1,
  outlineNone,
  width100Percent,
  textAlignRight
} = BaseStyle;

// const calcData = ['C', '%', "*", '/', '1', '2', '3', "+", '4', '5', '6', '-', '7', '8', '9', '=', '0', '.', '🅇', 'GO'];

const Calculator = ({ navigation, onClose }) => {
  const inputRef = useRef(null);
  const [displayValue, setDisplayValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const currentDate = getCurrentDate();
  const [selected, setSelected] = useState(currentDate);

  // useEffect(() => {
  //   const focusInput = () => {
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   };
  //   focusInput();
  // }, []);

  const handleCloseModal = () => {
    navigation.navigate(HOME_SCREEN);
    onClose();
  };

  // const handleCalcBtnPress = (value) => {
  //   switch (value) {
  //     case 'C':
  //       setDisplayValue('');
  //       break;
  //     case '🅇':
  //       setDisplayValue(displayValue.slice(0, -1));
  //       break;
  //     case '=':
  //       const result = eval(displayValue);
  //       setDisplayValue(result.toString());
  //       break;
  //     default:
  //       setDisplayValue(displayValue + value);
  //   }
  // };

  const handleCalendarPress = () => {
    setShowCalendar(true);
  };

  const handleDayPress = (day) => {
    setSelected(day.dateString);
    setShowCalendar(false);
  };

  const onTextChange = (text) => {
    if(!isNaN(text)){
      setDisplayValue(text)
    }
  }

  return (
    <SafeAreaView>
      <View style={[styles.mainContainer, flex]}>
        <View style={[styles.dateContainer, alignSelfEnd, justifyContentSpaceBetween, flexDirectionRow, alignItemsCenter]}>
          <TouchableOpacity style={[flexDirectionRow, alignJustifyCenter, { gap: 5 }]} onPress={handleCalendarPress}>
            <Entypo name="calendar" size={18} />
            <Text style={[style.fontSizeNormal]}>{selected}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.checkIcon, alignJustifyCenter]} onPress={handleCloseModal}>
            <FontAwesome5 name={'check'} size={20} color={homeButtonBackGround} />
          </TouchableOpacity>
        </View>
        {showCalendar && <Calendar onDayPress={handleDayPress} />}
        <View style={flexDirectionRow}>
          <View style={[styles.itemBox]}>
            <Text style={[style.fontSizeNormal, { color: blackColor }]}>{CATEGORY}</Text>
            <View style={[styles.itemIcon, alignJustifyCenter]}>
              <FontAwesome name="spoon" size={25} color={buttonTextColor} />
            </View>
          </View>
          <View style={[styles.amntBox]}>
            <Text style={[alignSelfEnd, style.fontSizeNormal]}>{CURRENT_EXPRESSION}</Text>
            <TextInput
              // ref={inputRef}
              autoFocus={true}
              placeholder="$0"
              maxLength={6}
              onChangeText={onTextChange}
              value={displayValue}
              keyboardType="numeric"
              placeholderTextColor="black"
              style={[alignSelfEnd, width100Percent,textAlignRight, style.fontWeightBold, style.fontSizeExtraLarge, 
              Platform.OS === 'web' && {outline: 'none', textAlign: 'center'}]}
            />
          </View>
        </View>
      </View>
      {/* <View style={[styles.calculatorContainer, flex, width100Percent, alignJustifyCenter]}>
        <FlatList
          data={calcData}
          renderItem={({ item }) => (
            <View style={{ padding: spacings.medium }}>
              <CalculatorButton
                title={item}
                type={item === 'C' || item === '%' || item === '*' || item === '/' ? 'top' : item === '+' || item === '-' ? 'left' : item === '=' ? 'blue' : item === 'GO' ? 'red' : null}
                onPress={() => handleCalcBtnPress(item)}
              />
            </View>
          )}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> */}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.Large2x,
    // paddingVertical: spacings.ExtraLarge1x,
    gap: wp(5),
    backgroundColor: backgroundColor
  },
  dateContainer: {
    width: "60%",
  },
  checkIcon: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: whiteColor
  },
  itemBox: {
    flex: 2,
    borderRightWidth: 1,
    borderColor: progressTitleColor,
    gap: wp(2),
    height: hp(13),
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: linkTextColor,
  },
  amntBox: {
    flex: 3,
  },
  calculatorContainer: {
    backgroundColor: '#202020',
    padding: spacings.xxxxLarge,
  },
});

export default Calculator;
