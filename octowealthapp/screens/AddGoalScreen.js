import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import { BlurView } from "expo-blur";
import { Calendar } from 'react-native-calendars'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  webPlatform,
  getCurrentDate,
} from "../utils";
import {
  backgroundColor,
  blackColor,
  bottomBorderColor,
  homeButtonBackGround,
  whiteColor,
} from "../constants/colors";
import Header from "../components/Header";
import {
  ADD_GOAL,
  ALL_GOAL_SCREEN,
  CHECK,
  DESIRED_DATE,
  ENTER_AMOUNT,
  GOAL_COLOR,
  GOAL_NAME,
  NEW_CAR,
  NOTE,
  SAVED_ALREADY,
  SAVE_GOAL,
  SELECT_ICON,
} from "../constants/constants";
import InputField from "../components/InputField";
import CustomDrawer from "../components/modals/CustomDrawer";
import Button from "../components/Button";
import ColorPickerModal from "../components/modals/ColorPickerModal";
const {
  flexDirectionRow,
  alignItemsCenter,
  alignJustifyCenter,
  width100Percent,
  alignSelfCenter,
  flex,
  positionRelative,
  justifyContentSpaceBetween,
  justifyContentCenter
} = BaseStyle;

const INPUTS_DATA = [
  {
    nameOfFeild: GOAL_NAME,
    placeholderText: NEW_CAR,
    secureTextEntry: false,
    placeholderColor: blackColor
  },
  {
    nameOfFeild: ENTER_AMOUNT,
    placeholderText: "0",
    secureTextEntry: false,
    placeholderColor: blackColor,
    keyboardType: 'numeric'
  },
  {
    nameOfFeild: SAVED_ALREADY,
    placeholderText: "0",
    secureTextEntry: false,
    placeholderColor: blackColor
  },
]

const AddGoalScreen = ({ navigation, route }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState(homeButtonBackGround);
  const [selectedIcon, setSelectedIcon] = useState({
    iconType: Ionicons,
    iconName: "car-sport-outline",
  });
  const currentDate = getCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const handlePress = () => {
    navigation.navigate(ALL_GOAL_SCREEN);
  };

  const handleHeaderIconPress = () => {
    console.log("Header icon pressed====>");
  };
  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
    setDrawerVisible(false);
  };

  const renderIcon = useCallback(() => {
    const IconType = selectedIcon?.iconType || Ionicons;
    const iconName = selectedIcon?.iconName || "car-sport-outline";
    return <IconType name={iconName} size={25} />;
  }, [selectedIcon]);

  const CustomInputFeild = ({ feildName, placeholder, secureTextEntry, placeholderColor, keyboardType }) => {
    return (
      <View style={[styles.inputFeildBox]}>
        <Text
          style={[
            style.fontSizeSmall2x,
            { color: blackColor },
          ]}
        >
          {feildName}
        </Text>
        <InputField
          //   value={email}
          //   onChangeText={setEmail}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderColor={placeholderColor}
          keyboardType={keyboardType}
          style={[styles.input, style.fontSizeNormal2x]}
        />
      </View>
    )
  }

  return (
    <View style={[styles.mainContainer, flex, positionRelative]}>
      {drawerVisible && (
        <TouchableOpacity
          onPress={() => setDrawerVisible(false)}
          style={{ ...StyleSheet.absoluteFillObject, zIndex: 999 }}
          activeOpacity={0.8}
        >
          <BlurView
            intensity={Platform.OS === "ios" ? 5 : 0.5}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        </TouchableOpacity>
      )}
      <Header
        headerText={route?.params ? route?.params.headerText : ADD_GOAL}
        iconName={route?.params ? route?.params.iconName : CHECK}
        navigation={navigation}
        onPress={handleHeaderIconPress}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: hp(70), marginBottom: spacings.large }}
      >
        <View style={[styles.formContainer, width100Percent]}>
          {
            INPUTS_DATA.map((data, index) => (
              <CustomInputFeild
                key={index}
                feildName={data.nameOfFeild}
                placeholder={data?.placeholderText}
                secureTextEntry={data?.secureTextEntry}
                placeholderColor={data?.placeholderColor}
                keyboardType={data?.keyboardType}
              />
            ))
          }
          <View style={[styles.inputFeildBox]}>
            <Text style={[style.fontSizeSmall2x, { color: blackColor }]}>
              {DESIRED_DATE}
            </Text>
            <TouchableOpacity onPress={() => setShowCalendar(true)}
              style={[styles.textInput, justifyContentCenter]}
            >
              <Text>{selectedDate}</Text>
            </TouchableOpacity>
            {showCalendar && (<Calendar onDayPress={handleDayPress} />)}
          </View>
          <View
            style={[styles.pickerContainer, width100Percent, flexDirectionRow]}
          >
            <View style={[styles.colorpickerBox, flex]}>
              <Text style={[style.fontSizeSmall2x, { color: blackColor }]}>
                {GOAL_COLOR}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[
                  styles.picker,
                  width100Percent,
                  flexDirectionRow,
                  justifyContentSpaceBetween,
                  alignItemsCenter,
                ]}
              >
                <View
                  style={[styles.colorPicker, { backgroundColor: color }]}
                ></View>
                <Feather name="chevron-down" size={25} />
              </TouchableOpacity>
            </View>
            <View style={[styles.iconBox, flex]}>
              <Text style={[style.fontSizeSmall2x, { color: blackColor }]}>
                {SELECT_ICON}
              </Text>
              <TouchableOpacity
                onPress={() => setDrawerVisible(true)}
                style={[
                  styles.picker,
                  flexDirectionRow,
                  justifyContentSpaceBetween,
                  alignItemsCenter,
                ]}
              >
                {renderIcon()}
                <Feather name="chevron-down" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.inputFeildBox]}>
            <Text style={[style.fontSizeSmall2x, { color: blackColor }]}>
              {NOTE}
            </Text>
            <InputField
              //   value={email}
              //   onChangeText={setEmail}
              secureTextEntry={false}
              placeholderColor={blackColor}
              style={[styles.inputWithoutPlacehlder]}
            />
          </View>
        </View>
        <View
          style={[
            width100Percent,
            alignSelfCenter,
            { marginTop: Platform.OS == "web" ? "5%" : null },
          ]}
        >
          <Button
            buttonText={SAVE_GOAL}
            buttonStyle={[
              styles.savedAmntBtn,
              alignJustifyCenter,
              alignSelfCenter,
            ]}
            textStyle={[style.fontSizeNormal, { color: whiteColor }]}
            onPress={handlePress}
          />
        </View>
      </ScrollView>

      {drawerVisible && (
        <CustomDrawer
          drawerwithIcon={true}
          drawerHeading={SELECT_ICON}
          isOpen={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          handleIconPress={handleIconPress}
        />
      )}
      {modalVisible && (
        <ColorPickerModal
          modalVisible={modalVisible}
          selectedColor={(color) => setColor(color)}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default AddGoalScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.large,
    backgroundColor: backgroundColor,
    gap: webPlatform ? wp(3) : wp(6),
  },
  formContainer: {
    gap: webPlatform ? wp(2) : wp(6.5),
    paddingBottom: hp(7.5),
  },
  inputFeildBox: {
    gap: wp(2)
  },
  input: {
    height: webPlatform ? hp(4) : hp(7),
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: bottomBorderColor,
    paddingLeft: spacings.large,
  },
  enterAmntInputBox: {
    width: "100%",
    gap: wp(5),
  },
  textInput: {
    width: "100%",
    height: webPlatform ? hp(4) : hp(7),
    borderBottomWidth: 1,
    borderBottomColor: bottomBorderColor,
    paddingLeft: spacings.large,
  },
  inputWithoutPlacehlder: {
    width: "100%",
    height: webPlatform ? hp(4) : hp(7),
    borderBottomWidth: 1,
    borderBottomColor: bottomBorderColor,
    paddingLeft: spacings.large,
  },
  pickerContainer: {
    gap: wp(5),
  },
  colorpickerBox: {
    borderBottomWidth: 1,
    borderBottomColor: bottomBorderColor,
    gap: wp(3),
    paddingBottom: spacings.xLarge,
  },
  picker: {
    gap: wp(1),
  },
  iconBox: {
    borderBottomWidth: 1,
    borderBottomColor: bottomBorderColor,
    gap: wp(3),
    paddingBottom: spacings.xLarge,
  },
  colorPicker: {
    flex: 2,
    height: hp(4.5),
    borderRadius: 4,
  },
  savedAmntBtn: {
    backgroundColor: homeButtonBackGround,
    height: hp(7),
    width: "70%",
    borderRadius: 10,
  },
});
