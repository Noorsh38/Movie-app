import { StyleSheet, View, Image, Platform, TouchableOpacity, ScrollView, Alert } from "react-native";
import LatoText from "../components/LatoText";
import { font, sHeight, wp } from "../services/helper";
import Button from "../components/Button";
import fontPixel from "../services/fontPixel";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import actions from "../store/actions";
import { IMDb } from "../theme/images";
import colors from "../theme/colors";

function LandingPage({ navigation, ...props }) {

    const user = useSelector(state => state.user)
    const onLogoutPressed = () => {
        props._logout()
    }

    const homeNavHandler = async () => {
        navigation.navigate('Home')
    }
    const onHomePressed = async () => {
        Alert.alert(
            "Alert",
            "Are you sure you want to want to continue to the application?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => homeNavHandler() }
            ]
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.baseColor, paddingTop: sHeight }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={{ width: wp(40), height: wp(40), borderRadius: wp(20) }} source={IMDb} />
                <LatoText text={`Full Name : ${user?.username}`} marginTop={10} />
                <LatoText text={`Email Address : ${user?.email}`} />
                <LatoText text={"Department : Software Engineering "} />

                <View style={{ width: "100%", alignItems: 'center', marginTop: 64 }}>
                    <Button onPress={onHomePressed} text={"Home"} fontSize={fontPixel(24)} width={'70%'} height={wp(15)} />
                    <Button onPress={onLogoutPressed} text={"Sign Out"} fontSize={fontPixel(24)} marginTop={14} width={'70%'} height={wp(15)} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // backgroundColor: "#fff",
        paddingBottom: 40,
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 10
    },
});
const mapDispatchToProps = (dispatch) => {
    return {
        _logout: () => dispatch(actions.logoutUser())
    }
}
export default connect(null, mapDispatchToProps)(LandingPage);
