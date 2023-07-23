import { StyleSheet, Dimensions, Platform } from 'react-native';

import { sHeight, font } from '../services/helper';
import colors from '../theme/colors';

const baseStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.bg,
        paddingTop: sHeight,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    searchInputContainer: {
        width: "100%", height: 45, borderRadius: 6, backgroundColor: "#fff",
        paddingLeft: 18, paddingRight: 8, flexDirection: "row", alignItems: "center",
    },
    searchInput: { flex: 1, height: "100%", fontSize: 16, fontFamily: font.regular, color: '#000' }
});

export { baseStyles };
