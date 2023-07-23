import { StyleSheet, View, Image, Platform, TouchableOpacity, ScrollView, Alert } from "react-native";
import LatoText from "../components/LatoText";
import { font, sHeight, wp } from "../services/helper";
import Button from "../components/Button";
import fontPixel from "../services/fontPixel";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import actions from "../store/actions";
import { IMDb } from "../theme/images";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import Input from "../components/Input";

function LandingPage({ ...props }) {

    const navigation = useNavigation()
    const user = useSelector(state => state.user)
    const onLogoutPressed = () => {
        props._logout()
    }
    const [inputs, setInputs] = useState({ name: '' || user?.username, email: '', loading: false })
    const onInputChange = (val, field) => {
        setInputs({ ...inputs, [field]: val })
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
        <View style={{ flex: 1, backgroundColor: colors.baseColor, paddingTop: sHeight, alignItems: 'center', justifyContent: 'space-between', paddingBottom: wp(20) }}>
            {/* <ScrollView contentContainerStyle={styles.container}> */}
            <View style={{ alignItems: 'center', }}>
                <Image style={{ width: wp(40), height: wp(40), borderRadius: wp(20) }} source={IMDb} />
                <View style={{ width: wp(90), borderColor: colors.imdbColor, borderWidth: 1, borderRadius: wp(2), alignItems: 'center', marginTop: wp(3), paddingVertical: 14 }}>
                    {/* <Input width={wp(80)} value={inputs.name} onChangeText={val => onInputChange(val, 'name')} placeholder={'Name'} /> */}
                    <LatoText fontWeight={'bold'} text={`User Name : ${user?.username}`} marginTop={wp(3)} />
                    <LatoText fontWeight={'bold'} text={`Email Address : ${user?.email}`} marginTop={wp(3)} />
                    <LatoText fontWeight={'bold'} text={"Department : Software Engineering "} marginTop={wp(3)} />
                </View>

            </View>
            <View style={{ width: "100%", alignItems: 'center', marginTop: 64 }}>
                {/* <Button onPress={onHomePressed} text={"Home"} fontSize={fontPixel(24)} width={'70%'} height={wp(15)} /> */}
                <Button onPress={onLogoutPressed} text={"Sign Out"} fontSize={fontPixel(24)} marginTop={14} width={'70%'} height={wp(15)} />
            </View>
            {/* </ScrollView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
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
