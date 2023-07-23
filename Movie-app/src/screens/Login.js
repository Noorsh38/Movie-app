import { auth, firestore } from '../../config/firebase';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { getUserById } from "../api/api";
import AppLoader from "../components/AppLoader";
import Input from "../components/Input";
import LatoText from "../components/LatoText";
import fontPixel from "../services/fontPixel";
import { font, wp } from "../services/helper";
import actions from "../store/actions";
import Button from '../components/Button';
import { getDoc, doc, setDoc } from "firebase/firestore"
import colors from '../theme/colors';

function Login({ navigation, ...props }) {
    const [inputs, setInputs] = useState({ email: '', password: '', loading: false })
    const onInputChange = (val, field) => {
        setInputs({ ...inputs, [field]: val })
    }


    // method to login user using firebase auth
    const signInWithEmail = async () => {
        onInputChange(true, 'loading')
        try {
            if (inputs.email.length > 0 && inputs.password.length > 0) {
                const res = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
                // console.log("logged user", res)
                const userId = res?.user?.uid;
                const userRef = doc(firestore, "Users", userId)
                const userDoc = await getDoc(userRef)
                const user = userDoc?.data()
                if (user) {
                    props._login(user)
                }
                else {
                    alert('Something went wrong')
                }

            } else {
                alert("Email/Password Required")
            }
        } catch (error) {
            alert(error);
        }
        onInputChange(false, 'loading')

    }

    // method to handle forgot password using firebase auth
    const handleForgetPassByEmail = async () => {
        onInputChange(true, 'loading')
        try {
            if (inputs.email.length > 0) {
                const res = sendPasswordResetEmail(auth, inputs.email)
                    .then((user) => {
                        Alert.alert('Forget Password', "An email with instructions to reset your password has been sent to your email address. Please check your inbox.")
                    }).catch((e) => {
                        console.log(e)
                        Alert.alert("Error", "We couldn't find an account associated with this email address.")
                    })
                console.log(res)
            } else {
                Alert.alert("Forgot Password", "Provide a valid email address")
            }
        } catch (error) {
            alert(error);
        }
        onInputChange(false, 'loading')

    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.baseColor, }} behavior={Platform.OS === "ios" ? "padding" : ''}>
            {Platform.OS === 'ios' && <View style={{ width: '100%', paddingHorizontal: 18, paddingTop: 30, backgroundColor: 'transparent' }}>
            </View>}
            <View style={styles.container}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{}}>
                        <Input width={'85%'} height={wp(14)} value={inputs.email} onChangeText={val => onInputChange(val, 'email')} placeholder={'Email'} marginTop={30} />
                        <Input password width={'85%'} height={wp(14)} value={inputs.password} onChangeText={val => onInputChange(val, 'password')} placeholder={'Password'} marginTop={30} />
                        <LatoText onPress={() => handleForgetPassByEmail()} text={'Forgot password?'} fontSize={fontPixel(18)} color={'#3D8EF5'} fontWeight={'600'} textAlign={'right'} marginTop={3} />
                    </View>
                    <Button onPress={signInWithEmail} width={wp(80)} height={wp(15)} text={'Login'} fontSize={fontPixel(30)} marginTop={18} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 'auto', marginTop: 20 }}>
                        <LatoText text={`Don't have an account? `} fontSize={fontPixel(15)} fontWeight={'600'} />
                        <LatoText onPress={() => navigation.navigate('Signup')} text={'Signup'} fontSize={fontPixel(15)} color={'#3D8EF5'} fontWeight={'600'} />
                    </View>
                </View>
            </View>

            <AppLoader loading={inputs.loading} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        flex: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    loginBtn: {
        marginTop: 20,
        backgroundColor: '#000',
        // height: wp(8),
        // width: wp(40),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 50,
        flexDirection: 'row',
        paddingHorizontal: 50,
    }
});


const mapStateToProps = (state) => {
    return {
        user: state.user,
        logged: state.logged,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _login: data => dispatch(actions.loginUser(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
