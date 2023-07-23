import { auth, firestore } from '../../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useEffect, useState } from "react";
import { Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AppLoader from "../components/AppLoader";
import Input from "../components/Input";
import LatoText from "../components/LatoText";
import fontPixel from "../services/fontPixel";
import { font, validateEmail, wp } from "../services/helper";
import Button from '../components/Button';
import { getDoc, doc, setDoc } from "firebase/firestore"
import colors from '../theme/colors';

const Signup = ({ navigation }) => {
    const [inputs, setInputs] = useState({ firstName: '', lastName: '', age: 0, email: '', password: '', c_pass: '', loading: false })
    const onInputChange = (val, state) => {
        setInputs({ ...inputs, [state]: val })
    }
    // method to register user using firebase auth
    const signUpWithEmail = async () => {
        onInputChange(true, 'loading')
        try {
            if (inputs.email.length > 0 && inputs.password.length > 0 && inputs.c_pass.length > 0) {
                if (!validateEmail(inputs.email)) {
                    alert("Invalid Email")
                }
                else if (inputs.age < 18) {
                    alert("Your age should be 18 or above to register to this app")
                }
                else if (inputs.password === inputs.c_pass) {
                    if (inputs.password.length >= 6) {
                        const isUserCreated = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
                        const user = isUserCreated.user;
                        // await sendEmailVerification(user)
                        const userDocRef = doc(firestore, "Users", user.uid)
                        let body = {
                            "username": inputs.firstName + ' ' + inputs.lastName,
                            "email": isUserCreated.user.email,
                            // "emailVerified": isUserCreated.user.emailVerified,
                            "uid": isUserCreated.user.uid,
                        }
                        await setDoc(userDocRef, body)
                        Alert.alert('Sign up', 'Signed up successfully', [
                            { text: 'OK', onPress: () => navigation.navigate('Login') },])
                    } else {
                        alert('Password should contain at least 6 characters')
                    }
                } else {
                    alert('Password and Confirm Password should be same')
                }

            } else {
                alert("Email/Password & Confirm Password Required")
            }
        } catch (error) {
            alert(error);
        }
        onInputChange(false, 'loading')

    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.baseColor }} behavior={Platform.OS === "ios" ? "padding" : 'height'}>
            {Platform.OS === 'ios' && <View style={{ width: '100%', paddingHorizontal: 18, paddingTop: 40, backgroundColor: 'transparent' }}>
            </View>}
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <LatoText text={'Let’s Create Your Account'} fontSize={fontPixel(28)} fontWeight={'600'} />
                    <Input width={'85%'} height={wp(16)} value={inputs.firstName} onChangeText={val => onInputChange(val.replace(/\s/g, ''), 'firstName')} placeholder={'First Name'} marginTop={30} />
                    <Input width={'85%'} height={wp(16)} value={inputs.lastName} onChangeText={val => onInputChange(val.replace(/\s/g, ''), 'lastName')} placeholder={'Last Name'} marginTop={30} />
                    <Input keyboardType={'numeric'} width={'85%'} height={wp(16)} value={inputs.age} onChangeText={val => onInputChange(val.replace(/[^0-9]/g, ''), 'age')} placeholder={'Age'} marginTop={30} />
                    <Input width={'85%'} height={wp(16)} value={inputs.email} onChangeText={val => onInputChange(val, 'email')} placeholder={'Email'} marginTop={30} />
                    <Input password width={'85%'} height={wp(16)} value={inputs.password} onChangeText={val => onInputChange(val, 'password')} placeholder={'New Password'} marginTop={30} />
                    <Input password width={'85%'} height={wp(16)} value={inputs.c_pass} onChangeText={val => onInputChange(val, 'c_pass')} placeholder={'Confirm Password '} marginTop={30} />

                    <Button onPress={signUpWithEmail} width={wp(80)} height={wp(15)} text={'Signup'} fontSize={fontPixel(30)} marginTop={18} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 'auto', marginTop: 20 }}>
                        <LatoText text={`Already have an account? `} fontSize={fontPixel(15)} fontWeight={'600'} />
                        <LatoText onPress={() => navigation.navigate('Login')} text={'Login'} fontSize={fontPixel(15)} color={'#3D8EF5'} fontWeight={'600'} />
                    </View>
                </View>
            </ScrollView>
            <AppLoader loading={inputs.loading} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20
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
        // paddingBottom:30
    }
});

export default connect(null, null)(Signup);
