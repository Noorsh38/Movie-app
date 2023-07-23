import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import LandingPage from './screens/LandingPage'
import Home from './screens/Home'
import MovieDetails from './screens/MovieDetails'
import Favorites from './screens/Favorites'
import FavMovieDetails from './screens/FavMovieDetails'
import Login from './screens/Login'
import Signup from './screens/Signup'
import actions from './store/actions'


const Stack = createStackNavigator()

const RootNavigator = ({ ...props }) => {
    // console.log("props",props)
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LandingPage' screenOptions={{ headerShown: false }} >
                {/* checks if user is logged in or not. different stack is shown to user based on logged status */}
                {
                    !!props.logged ? (
                        <>
                            <Stack.Screen name='LandingPage' component={LandingPage} />
                            <Stack.Screen name='Home' component={Home} />
                            <Stack.Screen name='MovieDetails' component={MovieDetails} />
                            <Stack.Screen name='Favorites' component={Favorites} />
                            <Stack.Screen name='FavMovieDetails' component={FavMovieDetails} />
                        </>
                    )
                        :
                        (
                            <>
                                <Stack.Screen name='Login' component={Login} />
                                <Stack.Screen name='Signup' component={Signup} />
                            </>
                        )}

            </Stack.Navigator>
        </NavigationContainer>
    )
}


const mapStateToProps = (state) => {
    return {
        logged: state.logged,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _logout: () => dispatch(actions.logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator)
