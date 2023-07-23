import React from 'react'
import { ActivityIndicator, Modal, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Image } from 'react-native'
import colors from '../theme/colors'

export default ({ loading, progress }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={loading}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }} >
                <ActivityIndicator
                    animating={loading}
                    size="small"
                    color={colors.white}
                />
                <Text style={{ color: '#fff', fontSize: 16 }} >{progress ? `Getting things ready ` : 'Please wait'}</Text>
            </View>
        </Modal>
    )
}