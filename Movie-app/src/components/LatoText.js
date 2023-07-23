import React from "react";
import { Text, } from "react-native";
import { font, wp } from "../services/helper";

export default ({
    lines, fontName, fontSize, color, alignSelf, backgroundColor, flex, width, height,
    marginVertical, marginHorizontal, marginTop, marginLeft, marginRight, marginBottom,
    padding, paddingTop, paddingLeft, paddingBottom, paddingRight, paddingHorizontal, paddingVertical,
    opacity, textAlign, textAlignVertical, text, fontWeight, onPress, lineHeight, textDecorationLine, underline,
    style
}) => {


    return (
        <Text numberOfLines={lines}
            onPress={onPress}
            // textDecorationLine={textDecorationLine}
            style={[{
                // fontFamily: fontName || font.interRegular,
                fontSize: fontSize || 16,
                color: color || "#fff",
                alignSelf,
                backgroundColor,
                flex,
                width, height,
                marginVertical, marginHorizontal,
                marginTop, marginLeft, marginRight, marginBottom,
                padding, paddingTop, paddingLeft, paddingBottom,
                paddingRight,
                paddingHorizontal, paddingVertical,
                opacity,
                textAlign, textAlignVertical,
                textDecorationLine,
                lineHeight,
                fontWeight
            }, style]}
        >
            {text}
        </Text >
    );
}