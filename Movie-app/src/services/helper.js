import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const sHeight = getStatusBarHeight()
const font = {
    interRegular: 'Inter-Regular',
    interMedium: 'Inter-Medium',
    interSemiBold: 'Inter-SemiBold',
    interExtraBold: 'Inter-ExtraBold',
    PoppinsRegular: 'Poppins-Regular',
    PoppinsSemiBold: 'Poppins-SemiBold',
    PoppinsBold: 'Poppins-Bold',
    PoppinsExtraBold: 'Poppins-ExtraBold',
}

// const sHeight = getStatusBarHeight()
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const wp = float => WIDTH * float / 100
const hp = float => HEIGHT * float / 100

const APP_NAME = "Movie App"
function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export {
    WIDTH,
    HEIGHT,
    wp,
    hp,
    font,
    validateEmail,
    sHeight
}