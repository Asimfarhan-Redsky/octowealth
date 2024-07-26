// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   TouchableHighlight,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';  

// import {SwipeListView} from 'react-native-swipe-list-view';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Notifications = [
//     {
//         id: 1,
//         title: 'Your pizza order placed successfully',
//         details: 'Your pizza order to snack corner has been accepted and being processed.'
//     },
//     {
//         id: 2,
//         title: 'Your bengali thali order has been delivered',
//         details: 'Your bengali thali has been delivered by Delicious Bong Recipe.'
//     },
//     {
//         id: 3,
//         title: 'Out for delivery',
//         details: 'Bengali thali will reach to you within 30 minutes.'
//     },
//     {
//         id: 4,
//         title: 'Your bengali thali order placed successfully',
//         details: 'Your bengali thali order to Delicious Bong Recipe has been accepted and being processed.'
//     },
//     {
//         id: 5,
//         title: 'Money added to your wallet',
//         details: '₹ 1,000/- has been added to your wallet successfully and remaining balance is ₹ 1,150/-'
//     },
//     {
//         id: 6,
//         title: 'Add money to your wallet',
//         details: 'Only ₹ 150/- is left in your wallet. Add some more amount to place your order quickly.'
//     },
//     {
//         id: 7,
//         title: 'Check new Pizza Corner within 1 km',
//         details: 'A new Pizza Corner is being loved by more people around you.'
//     },
//     {
//         id: 8,
//         title: 'Check new Roll Center within 3 km',
//         details: 'A new roll center is being loved by more people around you.'
//     },
//     {
//         id: 9,
//         title: 'Check new Crispy Chicken within 3 km',
//         details: 'A new Crispy Chicken is being loved by more people around you.'
//     },
//     {
//         id: 10,
//         title: 'Check new Snacks Corner within 5 km',
//         details: 'A new Snacks Corner is being loved by more people around you.'
//     },
// ];

// const NotificationScreen = ({navigation}) => {
//   const [listData, setListData] = useState(
//     Notifications.map((NotificationItem, index) => ({
//       key: `${index}`,
//       title: NotificationItem.title,
//       details: NotificationItem.details,
//     })),
//   );

//   const closeRow = (rowMap, rowKey) => {
//     if (rowMap[rowKey]) {
//       rowMap[rowKey].closeRow();
//     }
//   };

//   const deleteRow = (rowMap, rowKey) => {
//     closeRow(rowMap, rowKey);
//     const newData = [...listData];
//     const prevIndex = listData.findIndex(item => item.key === rowKey);
//     newData.splice(prevIndex, 1);
//     setListData(newData);
//   };

//   const onRowDidOpen = rowKey => {
//     console.log('This row opened', rowKey);
//   };

//   const onLeftActionStatusChange = rowKey => {
//     console.log('onLeftActionStatusChange', rowKey);
//   };

//   const onRightActionStatusChange = rowKey => {
//     console.log('onRightActionStatusChange', rowKey);
//   };

//   const onRightAction = rowKey => {
//     console.log('onRightAction', rowKey);
//   };

//   const onLeftAction = rowKey => {
//     console.log('onLeftAction', rowKey);
//   };

//   const VisibleItem = props => {
//     const {
//       data,
//       rowHeightAnimatedValue,
//       removeRow,
//       leftActionState,
//       rightActionState,
//     } = props;

//     if (rightActionState) {
//       Animated.timing(rowHeightAnimatedValue, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: false,
//       }).start(() => {
//         removeRow();
//       });
//     }

//     return (
//       <Animated.View
//         style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
//         <TouchableHighlight
//           style={styles.rowFrontVisible}
//           onPress={() => console.log('Element touched')}
//           underlayColor={'#aaa'}>
//           <View>
//             <Text style={styles.title} numberOfLines={1}>
//               {data.item.title}
//             </Text>
//             <Text style={styles.details} numberOfLines={1}>
//               {data.item.details}
//             </Text>
//           </View>
//         </TouchableHighlight>
//       </Animated.View>
//     );
//   };

//   const renderItem = (data, rowMap) => {
//     const rowHeightAnimatedValue = new Animated.Value(60);

//     return (
//       <VisibleItem
//         data={data}
//         rowHeightAnimatedValue={rowHeightAnimatedValue}
//         removeRow={() => deleteRow(rowMap, data.item.key)}
//       />
//     );
//   };

//   const HiddenItemWithActions = props => {
//     const {
//       swipeAnimatedValue,
//       leftActionActivated,
//       rightActionActivated,
//       rowActionAnimatedValue,
//       rowHeightAnimatedValue,
//       onClose,
//       onDelete,
//     } = props;

//     console.log("rightActionActivated===========>>>>>>>>>>>", rightActionActivated);

//     if (rightActionActivated) {
//       Animated.spring(rowActionAnimatedValue, {
//         toValue: 500,
//         useNativeDriver: false
//       }).start();
//     } else {
//       Animated.spring(rowActionAnimatedValue, {
//         toValue: 75,
//         useNativeDriver: false
//       }).start();
//     }

//     return (
//       <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
//         <Text>Left</Text>
//         {!leftActionActivated && (
//           <TouchableOpacity
//             style={[styles.backRightBtn, styles.backRightBtnLeft]}
//             onPress={onClose}>
//             <MaterialCommunityIcons
//               name="close-circle-outline"
//               size={25}
//               style={styles.trash}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         )}
//         {!leftActionActivated && (
//           <Animated.View
//             style={[
//               styles.backRightBtn,
//               styles.backRightBtnRight,
//               {
//                 flex: 1,
//                 width: rowActionAnimatedValue,
//               },
//             ]}>
//             <TouchableOpacity
//               style={[styles.backRightBtn, styles.backRightBtnRight]}
//               onPress={onDelete}>
//               <Animated.View
//                 style={[
//                   styles.trash,
//                   {
//                     transform: [
//                       {
//                         scale: swipeAnimatedValue.interpolate({
//                           inputRange: [-90, -45],
//                           outputRange: [1, 0],
//                           extrapolate: 'clamp',
//                         }),
//                       },
//                     ],
//                   },
//                 ]}>
//                 <MaterialCommunityIcons
//                   name="trash-can-outline"
//                   size={25}
//                   color="#fff"
//                 />
//               </Animated.View>
//             </TouchableOpacity>
//           </Animated.View>
//         )}
//       </Animated.View>
//     );
//   };

//   const renderHiddenItem = (data, rowMap) => {
//     const rowActionAnimatedValue = new Animated.Value(75);
//     const rowHeightAnimatedValue = new Animated.Value(60);


//     return (
//       <HiddenItemWithActions
//         data={data}
//         rowMap={rowMap}
//         rowActionAnimatedValue={rowActionAnimatedValue}
//         rowHeightAnimatedValue={rowHeightAnimatedValue}
//         onClose={() => closeRow(rowMap, data.item.key)}
//         onDelete={() => deleteRow(rowMap, data.item.key)}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content"/>
//       {/* <StatusBar backgroundColor="#FF6347" barStyle="light-content"/> */}
//       <SwipeListView
//         data={listData}
//         renderItem={renderItem}
//         renderHiddenItem={renderHiddenItem}
//         leftOpenValue={75}
//         rightOpenValue={-150}
//         disableRightSwipe
//         onRowDidOpen={onRowDidOpen}
//         leftActivationValue={100}
//         rightActivationValue={-200}
//         leftActionValue={0}
//         rightActionValue={-500}z
//         onLeftAction={onLeftAction}
//         onRightAction={onRightAction}
//         onLeftActionStatusChange={onLeftActionStatusChange}
//         onRightActionStatusChange={onRightActionStatusChange}
//       />
//     </View>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f4f4f4',
//     flex: 1,
//   },
//   backTextWhite: {
//     color: '#FFF',
//   },
//   rowFront: {
//     backgroundColor: '#FFF',
//     borderRadius: 5,
//     height: 60,
//     margin: 5,
//     marginBottom: 15,
//     shadowColor: '#999',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   rowFrontVisible: {
//     backgroundColor: '#FFF',
//     borderRadius: 5,
//     height: 60,
//     padding: 10,
//     marginBottom: 15,
//   },
//   rowBack: {
//     alignItems: 'center',
//     backgroundColor: '#DDD',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 15,
//     margin: 5,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   backRightBtn: {
//     alignItems: 'flex-end',
//     bottom: 0,
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     width: 75,
//     paddingRight: 17,
//   },
//   backRightBtnLeft: {
//     backgroundColor: '#1f65ff',
//     right: 75,
//   },
//   backRightBtnRight: {
//     backgroundColor: 'red',
//     right: 0,
//     borderTopRightRadius: 5,
//     borderBottomRightRadius: 5,
//   },
//   trash: {
//     height: 25,
//     width: 25,
//     marginRight: 7,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#666',
//   },
//   details: {
//     fontSize: 12,
//     color: '#999',
//   },
// });


import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../utils";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import { black70 } from "../constants/colors";
import { Dimensions } from "react-native";

const { flexDirectionRow, flex, width100Percent } = BaseStyle;

const BarCharts = () => {
  const expenseData = [20000, 5000, 7000, 15000, 30000, 10000, 1500];
  const incomeData = [5000, 7000, 15000, 25000, 1000, 5000, 7000];
  const labels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: expenseData,
        color: () => 'red',
        label: "Expenses"
      },
      {
        data: incomeData,
        color: () => 'blue',
        label: "Income"
      }
    ]
  };

  return (
    <View style={[Styles.barContainer, flexDirectionRow, width100Percent]}>
      <View style={[flex, Styles.barChart]}>
        <BarChart
          data={data}
          width={Dimensions.get("window").width - wp(10)} // Width of the chart
          height={Platform.OS === "web" ? hp(42) : hp(32)} // Height of the chart
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => black70,
            labelColor: (opacity = 1) => black70,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          verticalLabelRotation={30}
          showBarTops={false}
          showValuesOnTopOfBars={true}
        />
      </View>
    </View>
  );
};

export default BarCharts;

const Styles = StyleSheet.create({
  barContainer: {
    height: Platform.OS === "web" ? hp(42) : hp(32),
  },
  barChart: {
    marginLeft: spacings.large,
    gap: Platform.OS === "web" ? wp(1.5) : wp(2.5),
  },
});
