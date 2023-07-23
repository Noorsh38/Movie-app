import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { font, wp } from '../services/helper';
import colors from '../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontPixel from '../services/fontPixel';


export default function Input({ width = '85%', height = 75, value, onChangeText, marginTop, marginBottom, placeholder, onSubmitPressed, keyboardType, borderRadius, editable, user, mail, password, eye
}) {
    const [passVisible, setPassVisible] = useState(true)
    return (
        <View
            style={[
                styles.inputContainerStyle,
                {
                    width,
                    height,
                    marginTop,
                    marginBottom,
                    borderRadius: borderRadius || 5,
                    borderColor: '#D8D8D8',
                    borderWidth: 2
                },
            ]}>
            <TextInput
                autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={password && passVisible}
                placeholderTextColor={'#000'}
                value={value}
                onChangeText={e => onChangeText(e)}
                onSubmitEditing={onSubmitPressed}
                editable={editable}
                placeholder={placeholder || 'Email'}
                style={{ flex: 1, height: '100%', fontSize: fontPixel(22), paddingLeft: 18, color: '#000' }}
            />
            {
                password && <View style={{ position: 'absolute', right: 15 }}>
                    <MaterialIcons onPress={() => setPassVisible(!passVisible)} name='remove-red-eye' size={fontPixel(24)} color={passVisible ? colors.opecBlack : colors.black} />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        // paddingHorizontal: 15,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.10,
        // // shadowRadius: 3.84,
        // elevation: 5,
    },
});
