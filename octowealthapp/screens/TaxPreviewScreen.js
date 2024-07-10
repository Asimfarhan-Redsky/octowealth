import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    webPlatform
} from "../utils";
import { grayColor, whiteColor, backgroundColor } from "../constants/colors";
import { BaseStyle } from "../shared/styles";
import { spacings, style } from "../shared/constants/fonts";
import Header from "../components/Header";
import {
    FRAME_NUMBER,
    OTHER_TAX,
    OWNER,
    PREVIEW,
    PRODUCT,
    TOTAL,
    VAT,
    taxInfoDetails,
} from "../constants/constants";
import { LinearGradient } from "expo-linear-gradient";

const {
    alignItemsCenter,
    borderBottomWidth,
    flex,
    width100Percent,
    flexDirectionRow,
    justifyContentSpaceBetween,
    alignJustifyCenter,
} = BaseStyle;

const TaxPreviewScreen = ({ navigation, route }) => {
    const [previewData, setPreviewData] = useState(
        taxInfoDetails.filter((taxData) => taxData?.id === route?.params?.id),
    );

    useEffect(() => {
        const filteredData = taxInfoDetails.filter(
            (taxData) => taxData?.id === route?.params.id,
        );
        setPreviewData(filteredData);
    }, [route?.params?.id]);

    return (
        <View style={[styles.container, flex]}>
            <Header headerText={PREVIEW} navigation={navigation} />
            <View
                style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}
            >
                <View style={{ gap: wp(1) }}>
                    <Text style={[style.fontSizeNormal, style.fontWeightBold]}>
                        Mass Huss
                    </Text>
                    <Text style={[style.fontSizeSmall1x, { color: grayColor }]}>
                        12 April 2024
                    </Text>
                </View>
                <LinearGradient
                    colors={["#FF9EB4", "#D599E1"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.linearGradientBtn, alignJustifyCenter]}
                >
                    <Text
                        style={[
                            style.fontSizeSmall1x,
                            style.fontWeightMedium,
                            { color: whiteColor },
                        ]}
                    >
                        U 4812 AB
                    </Text>
                </LinearGradient>
            </View>
            <View style={[styles.previewBox, width100Percent]}>
                {previewData?.map((taxData) => (
                    <PreviewItem data={taxData} key={taxData.id} keyProp={taxData?.id} />
                ))}
            </View>
        </View>
    );
};

const PreviewItem = ({ data, keyProp }) => {
    const vatTax = parseFloat(data?.taxAmount) * (20 / 100);
    const total = parseFloat(data?.taxAmount) + vatTax + 42;

    return (
        <React.Fragment key={keyProp}>
            <Text
                style={[style.fontSizeLargeXX, style.fontWeightBold]}
            >{`$${data?.taxAmount}`}</Text>
            {renderRow(FRAME_NUMBER, "A 0 6 4 5 3 8 2 6 1 5 1")}
            {renderRow(PRODUCT, data?.productName)}
            {renderRow(OWNER, data?.ownerName)}
            <View style={[styles.dividerBorder, borderBottomWidth]}></View>
            {renderRow(VAT, vatTax.toFixed(2))}
            {renderRow(OTHER_TAX, "42.99")}
            {renderRow(TOTAL, total?.toFixed(2), true)}
        </React.Fragment>
    );
};

const renderRow = (label, value, bold = false) => (
    <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
        <Text
            style={[
                style.fontSizeSmall1x,
                bold ? style.fontWeightBold : style.fontWeightMedium,
            ]}
        >
            {label}
        </Text>
        <Text
            style={[
                style.fontSizeSmall2x,
                bold ? style.fontWeightBold : style.fontWeightMedium,
            ]}
        >
            {value}
        </Text>
    </View>
);

export default TaxPreviewScreen;

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        paddingHorizontal: spacings.Large1x,
        paddingVertical: webPlatform ? spacings.xxxxLarge : spacings.large,
        backgroundColor: backgroundColor,
        gap: Platform.OS === "web" ? wp(4) : wp(7),
    },
    linearGradientBtn: {
        paddingHorizontal: spacings.Large2x,
        borderRadius: 18,
        height: hp(4.5),
    },
    previewBox: {
        backgroundColor: whiteColor,
        borderRadius: 6,
        padding: spacings.large,
        paddingBottom: spacings.xxxxLarge,
        gap: Platform.OS === "web" ? wp(2) : wp(5.5),
    },
    dividerBorder: {
        borderBottomWidth: 1,
        borderColor: grayColor,
        borderStyle: Platform.OS === "ios" ? "solid" : "dashed",
    },
});
