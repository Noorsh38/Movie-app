import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { font, wp } from '../services/helper'
import LatoText from './LatoText'

export default function Button({ width = wp(100),
    height = 112,
    backgroundColor = '#f3ce13',
    borderRadius = 50,
    marginTop,
    marginVertical,
    marginHorizontal,
    text, onPress,
    fontSize = 18,
    fontName = font.interExtraBold,
    textColor = '#000',
    disabled,
    borderWidth,
    borderColor,
    padding,
    paddingVertical,
    paddingHorizontal, }) {
    return (
        <TouchableOpacity {...{ onPress }} disabled={disabled}
            style={[{
                width, height, marginVertical, marginHorizontal, backgroundColor,
                borderRadius, justifyContent: "center", alignItems: "center", marginTop,
                borderWidth, borderColor, padding, paddingVertical, paddingHorizontal,
            }, styles.shadow]} >
            <LatoText text={text || "Log in"} color={textColor} fontSize={fontSize} fontWeight={'600'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})