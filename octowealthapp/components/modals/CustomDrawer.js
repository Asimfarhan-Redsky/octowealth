import React from "react";
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../utils/index";
import { BaseStyle } from "../../shared/styles/index";
import {
  BILLS_IMG,
  CART_IMG,
  EDUCTION_IMG,
  FOOD_IMG,
  SHOPPING_IMG,
  TRAVEL_IMG,
} from "../../assets/images";
import { spacings, style } from "../../shared/constants/fonts";
import { inputBorderColor, modalbackgroundColor } from "../../constants/colors";
import Icons from "../Icons";

const { borderRadius10, positionAbsolute, borderWidth1 } = BaseStyle;

const categories = [
  { id: 1, image: FOOD_IMG, text: "Food" },
  { id: 2, image: SHOPPING_IMG, text: "Clothing" },
  { id: 3, image: CART_IMG, text: "Shopping" },
  { id: 4, image: TRAVEL_IMG, text: "Travel" },
  { id: 5, image: EDUCTION_IMG, text: "Education" },
  { id: 6, image: BILLS_IMG, text: "Bills" },
];

class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { isOpen } = this.props;
    const { pan } = this.state;
    if (isOpen) {
      Animated.timing(pan, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;
    const { pan } = this.state;
    if (prevProps.isOpen !== isOpen) {
      if (isOpen) {
        Animated.timing(pan, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(pan, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          this.props.onClose && this.props.onClose();
        });
      }
    }
  }

  render() {
    const { onClose, drawerwithIcon, handleCalculatorShow, drawerHeading, handleIconPress } = this.props;
    const { pan } = this.state;

    const translateY = pan.interpolate({
      inputRange: [0, 1],
      outputRange: [hp(95), 0],
    });

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState?.dy >= 20) {
          Animated.timing(pan, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            onClose && onClose();
          });
        }
      },
    });

    return (
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateY }] },
          borderRadius10,
          borderWidth1,
          positionAbsolute,
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            onClose && onClose();
          }}
        />
        <Text style={styles.headingText}>{drawerHeading}</Text>
        
        {drawerwithIcon ? <Icons handleIconPress={handleIconPress}/> :
        <ScrollView style={styles.categoriesContainer}>
          {categories.map((_CAT, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.category,
                { borderBottomWidth: _CAT.id == 6 ? 0 : 1 },
              ]}
              onPress={() => {
                onClose(), onClose(), handleCalculatorShow(_CAT)
              }}
            >
              <Image source={_CAT.image} style={styles.categoryImage} />
              <Text>{_CAT.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: modalbackgroundColor,
    height: hp(58),
    borderColor: modalbackgroundColor,
    borderBottomWidth: 0,
    position: "absolute",
    zIndex: 2339993,
  },
  headingText: {
    textAlign: "center",
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: style.fontWeightBlack.fontWeight,
    paddingVertical: spacings.xLarge,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 22,
  },
  categoriesContainer: {
    flexDirection: "column",
    padding: spacings.xLarge,
  },
  category: {
    marginBottom: spacings.xLarge,
    flexDirection: "row",
    borderBottomColor: inputBorderColor,
    width: "100%",
    padding: 5,
    alignItems: "center",
  },
  categoryImage: {
    width: 40,
    height: 40,
    marginRight: spacings.xLarge,
  },
});

export default CustomDrawer;
