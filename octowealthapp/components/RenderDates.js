import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import { StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import { BaseStyle } from "../shared/styles";
import { lightRed, whiteColor } from "../constants/colors";
import { spacings, style } from "../shared/constants/fonts";
import { widthPercentageToDP as wp } from "../utils";

const { alignJustifyCenter } = BaseStyle;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const RenderDates = ({ setShowDate }) => {
  const [selectedDate, setSelectedDate] = useState();
  console.log("RenderDates__Component__Called");

  const getDaysDetails = useCallback((startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDetails = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = days[d.getDay()];
      const dayOfMonth = d.getDate();
      let month = months[d.getMonth()];
      const year = d.getFullYear();
      daysDetails.push({
        dayOfWeek: dayOfWeek,
        dayOfMonth: dayOfMonth,
        month: month,
        year: year,
        fullDate: `${dayOfWeek.substring(0, 3)},${dayOfMonth} ${month}`,
      });
    }
    return daysDetails;
  }, []);

  const dates = useMemo(() => {
    const currentDate = new Date();
    let year = currentDate?.getFullYear();
    let month = currentDate?.getMonth() + 1;
    let day = currentDate?.getDate();
    const hour = currentDate.getHours();

    const formateDate = (year, month, day) => {
      const paddedMonth = month < 10 ? `0${month}` : month;
      const paddedDay = day < 10 ? `0${day}` : day;
      return `${year}-${paddedMonth}-${paddedDay}`;
    };

    const startDate = formateDate(year, month, day);

    if (month == 12 && day == 31 && hour === 0) {
      year = year + 1;
      month = 1;
      day = 1;
    }

    const endDate = formateDate(year, month + 1, day);

    return getDaysDetails(startDate, endDate);
  }, [getDaysDetails]);

  useEffect(() => {
    const currentDate = dates.find(
      (date) => date.dayOfMonth == new Date().getDate(),
    );
    setShowDate(currentDate.fullDate);
    setSelectedDate(currentDate?.dayOfMonth);
  }, [dates]);

  const handleDatePress = (date) => {
    setSelectedDate(date?.dayOfMonth);
    setShowDate(date?.fullDate);
  };

  return (
    <FlatList
      data={dates}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={[
              styles.dateBox,
              alignJustifyCenter,
              {
                backgroundColor:
                  selectedDate == item.dayOfMonth ? lightRed : null,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => handleDatePress(item)}
          >
            <Text
              style={[
                style.fontSizeSmall1x,
                style.fontWeightMedium,
                { color: whiteColor },
              ]}
            >
              {item?.dayOfWeek?.charAt(0)}
            </Text>
            <Text
              style={[
                style.fontSizeNormal2x,
                style.fontWeightMedium,
                { color: whiteColor },
              ]}
            >
              {item?.dayOfMonth < 10
                ? `0${item?.dayOfMonth}`
                : item?.dayOfMonth}
            </Text>
          </TouchableOpacity>
        );
      }}
      horizontal
      contentContainerStyle={styles.datesScrollView}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  datesScrollView: {
    gap: wp(2.5),
  },
  dateBox: {
    padding: spacings.xxxLarge,
    borderRadius: 25,
    gap: wp(2),
  },
});

export default memo(RenderDates, (prevProps, nextProps) => {
  return prevProps.setShowDate === nextProps.setShowDate;
});
