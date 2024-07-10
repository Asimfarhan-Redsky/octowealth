import { Platform } from "react-native";
import { Dimensions, PixelRatio } from "react-native";

export const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get("window").width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get("window").height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
};

export const webPlatform = Platform.OS === 'web';
export const iosPlatform = Platform.OS === 'ios';
export const androidPlatform = Platform.OS === 'android';
