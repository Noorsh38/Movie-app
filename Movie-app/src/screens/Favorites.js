import { StyleSheet, View, Image, Platform, TouchableOpacity, ScrollView, Alert } from "react-native";
import LatoText from "../components/LatoText";
import { font, sHeight, wp } from "../services/helper";
import Button from "../components/Button";
import fontPixel from "../services/fontPixel";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import actions from "../store/actions";
import { IMDb } from "../theme/images";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { deleteVideoById, getVideosByUserIdMethod } from "../api/api";
import AppLoader from "../components/AppLoader";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";

const Favorites = ({ }) => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])
    useEffect(() => {
        getVideos()
    }, [])

    // method to get favorite videos data from firebase database
    const getVideos = async () => {
        setLoading(true)
        let res = await getVideosByUserIdMethod()
        // console.log("videos", res?.data)
        if (res?.success) {
            if (res?.data.length) {
                setVideos(res?.data)
            }
        }
        else {
            alert(res?.message)
        }
        setLoading(false)
    }

    // method to remove the favorite item from list
    const deleteVideoHandler = async (videoID) => {
        let res = await deleteVideoById(videoID)
        if (res?.success) {
            getVideos()
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.baseColor, }}>
            {/* <FontAwesome onPress={() => navigation.goBack()} name='angle-left' size={fontPixel(40)} color='#000' /> */}
            {/* <View style={{flex:1, height: wp(90), justifyContent: 'space-between', }}> */}
            <View style={{}}>
                <View style={{ backgroundColor: colors.imdbColor, paddingVertical: 4, borderRadius: wp(2), alignItems: 'center', }}>
                    <LatoText text={'Movies'} fontName={font.interSemiBold} fontSize={fontPixel(28)} color={'#000'} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10 }}>
                    {
                        videos?.length > 0 &&
                        videos?.filter(item => item?.type === "Movie")?.map((item, index) => (
                            <TouchableOpacity onPress={() => navigation.navigate('FavMovieDetails', item)} key={index} style={{ marginRight: 8 }}>
                                <MaterialIcons onPress={() => deleteVideoHandler(item?.id)} name='delete-outline' size={wp(7)} color='#fff' />
                                <Image style={{ width: wp(35), height: wp(45), borderRadius: wp(2) }} source={{ uri: `https://image.tmdb.org/t/p/original/${item?.video?.poster_path}` }} resizeMode="cover" />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
            <View style={{ backgroundColor: '#fff', height: 1, width: wp(95), marginVertical: wp(8) }} />
            <View style={{}}>
                <View style={{ backgroundColor: colors.imdbColor, paddingVertical: 4, borderRadius: wp(2), alignItems: 'center', }}>
                    <LatoText text={'Series'} fontName={font.interSemiBold} fontSize={fontPixel(28)} color={'#000'} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10 }}>
                    {
                        videos.length > 0 &&
                        videos?.filter(item => item?.type === "TVSeries")?.map((item, index) => (
                            <TouchableOpacity onPress={() => navigation.navigate('FavMovieDetails', item)} key={index} style={{ marginRight: 8 }}>
                                <MaterialIcons onPress={() => deleteVideoHandler(item?.id)} name='delete-outline' size={wp(7)} color='#fff' />
                                <Image style={{ width: wp(35), height: wp(45), borderRadius: wp(2) }} source={{ uri: `https://image.tmdb.org/t/p/original/${item?.video?.poster_path}` }} resizeMode="cover" />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
            {/* </View> */}
            <AppLoader loading={loading} />
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
export default connect(null, mapDispatchToProps)(Favorites);
