import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect, useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import LatoText from "../components/LatoText";
import fontPixel from "../services/fontPixel";
import { font, sHeight, wp } from "../services/helper";
import actions from "../store/actions";
import colors from "../theme/colors";
import { FAVORITES, HOME, IMDb, PROFILE } from "../theme/images";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Favorites from "./Favorites";
import Profile from "./Profile";


function Home({ navigation, ...props }) {

    const dispatch = useDispatch()
    const isMovie = useSelector(state => state.movie)
    const [inputs, setInputs] = useState({
        title: '', loading: false, filteredData: null, isHome: true,
        isFavorites: false, isProfile: false, isMovie: true, isTV: false
    })
    const onInputChange = (field, val) => {
        setInputs({ ...inputs, [field]: val })
    }
    const [page, setPage] = useState(1)

    const getMovies = async () => {
        const url = 'https://api.themoviedb.org/3/discover/movie';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjBjMjgzOGRiODdiMGZlNjZjNDY5YWZlYTgwN2VhOCIsInN1YiI6IjY0YWQ0NDVjNjZhMGQzMDEzYTc0MzZjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fwg70NL3YG390_R-Dw6QDdVBgTpuUeFaCRu8rBfiaE8'
            }
        };

        await fetch(url, options)
            .then(res => res.json())
            .then(json => {
                // console.log(json.results[0].genre_ids)
                onInputChange('filteredData', json?.results)
            })
            .catch(err => console.error('error:' + err));
    }

    useEffect(() => {
        // getMovies()
    }, [])

    const searchHandler = async () => {
        const url = isMovie ? `https://api.themoviedb.org/3/search/movie?query=${inputs.title}&include_adult=false&language=en-US&page=${page}` :
            `https://api.themoviedb.org/3/search/tv?query=${inputs.title}&include_adult=false&language=en-US&page=${page}`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjBjMjgzOGRiODdiMGZlNjZjNDY5YWZlYTgwN2VhOCIsInN1YiI6IjY0YWQ0NDVjNjZhMGQzMDEzYTc0MzZjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fwg70NL3YG390_R-Dw6QDdVBgTpuUeFaCRu8rBfiaE8'
            }
        };

        await fetch(`${url}`, options)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                onInputChange('filteredData', response?.results)
            })
            .catch(err => console.error(err));
        setShowInput(false);

    }



    const bottomNavClickHandler = (btn) => {
        switch (btn) {
            case 'home': {
                setInputs({ ...inputs, isHome: true, isFavorites: false, isProfile: false })
                break;
            } case 'favorites': {
                setInputs({ ...inputs, isHome: false, isFavorites: true, isProfile: false })
                break;
            } case 'profile': {
                setInputs({ ...inputs, isHome: false, isFavorites: false, isProfile: true })
                break;
            }
        }
    }

    const btnsHandler = (btn) => {
        switch (btn) {
            case 'movie': {
                setInputs({ ...inputs, isMovie: true, isTV: false, filteredData: null })
                dispatch(actions.setMovie(true))
                break;
            } case 'tv': {
                setInputs({ ...inputs, isMovie: false, isTV: true, filteredData: null })
                dispatch(actions.setMovie(false))
                break;
            }
        }
    }

    const [showInput, setShowInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchButtonPress = () => {
        setShowInput(true);
    };
    const handleInputChange = (text) => {
        setSearchQuery(text);
        // Perform your search logic here, such as updating search results.
    };

    const handleInputBlur = () => {
        setShowInput(false);
        setSearchQuery('');
    };
    const handleInputSubmit = () => {
        // Perform your search logic here, using the searchQuery state.
        setShowInput(false);
        setSearchQuery('');
    };



    return (
        <View style={{ flex: 1, backgroundColor: colors.baseColor, paddingTop: sHeight + 5, paddingHorizontal: 14 }}>

            <View style={[styles.bottomNav, styles.shadow]}>
                <TouchableOpacity onPress={() => bottomNavClickHandler('home')}
                    style={[{ backgroundColor: inputs.isHome ? colors.imdbColor : '#fff', }, styles.bottomBtn]}>
                    <Image source={HOME} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => bottomNavClickHandler('favorites')}
                    style={[{ backgroundColor: inputs.isFavorites ? colors.imdbColor : '#fff', }, styles.bottomBtn]}>
                    {/* <Image source={FAVORITES} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' /> */}
                    <MaterialIcons size={wp(10)} name='favorite-outline' color='#000' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{ backgroundColor: inputs.isProfile ? colors.imdbColor : '#fff', }, styles.bottomBtn]}
                    onPress={() => bottomNavClickHandler('profile')}>
                    {/* <Image source={PROFILE} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' /> */}
                    <FontAwesome name='user-circle-o' size={wp(9)} color='#000' />
                </TouchableOpacity>
            </View>

            {inputs.isHome && <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <FontAwesome onPress={() => navigation.goBack()} name='angle-left' size={fontPixel(40)} color='#fff' />
                    <View style={{ flexDirection: 'row' }}>
                        <Button onPress={() => btnsHandler('movie')} text={'Movies'} width={wp(28)} height={wp(10)} marginHorizontal={3} backgroundColor={isMovie ? colors.gold : 'gray'} />
                        <Button onPress={() => btnsHandler('tv')} text={'TV Series'} width={wp(28)} height={wp(10)} backgroundColor={!isMovie ? colors.gold : 'gray'} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, alignItems: 'center', }}>
                    {showInput ? <Input width={'100%'} height={wp(12)}
                        value={inputs.title}
                        onChangeText={val => onInputChange('title', val)}
                        onSubmitPressed={searchHandler}
                        placeholder={'Enter Title'}
                    /> :
                        <FontAwesome onPress={() => handleSearchButtonPress()} style={{ transform: [{ rotateY: '180deg' }] }} name='search' size={fontPixel(34)} color='#fff' />}
                </View>
                <View style={{ backgroundColor: '#fff', height: 1, width: wp(93), marginVertical: wp(5) }} />
                <View style={{ flex: 1, marginBottom: 80 }}>
                    <FlatList
                        data={inputs?.filteredData}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity key={index} onPress={() => navigation.navigate("MovieDetails", item)}
                                style={{ flex: 1, padding: 12, borderBottomWidth: 0.5, borderColor: '#000', backgroundColor: index % 2 == 0 ? colors.imdbColor : "transparent", }}>
                                <LatoText text={isMovie ? item?.title : item?.name} fontSize={fontPixel(18)} color={index % 2 == 0 ? '#000' : "#fff"} />
                            </TouchableOpacity>
                        }
                        showsVerticalScrollIndicator={false}
                        // onEndReached={() => {
                        //     setPage(page + 1)
                        //     console.log(page)
                        //     searchHandler()
                        // }}
                        contentContainerStyle={{ flexGrow: 1, }}
                    />
                </View>
            </>}
            {inputs.isFavorites && <Favorites />}
            {inputs.isProfile && <Profile />}
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
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        elevation: 25,
    },
    bottomNav: {
        position: 'absolute', width: wp(100), height: wp(16), flexDirection: 'row', zIndex: 20,
        alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10,
        bottom: 0, backgroundColor: '#fff'
    },
    bottomBtn: {
        borderRadius: 8, padding: 8
    },
});
const mapDispatchToProps = (dispatch) => {
    return {
        _logout: () => dispatch(actions.logoutUser())
    }
}
export default connect(null, mapDispatchToProps)(Home);
