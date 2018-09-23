import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen,
        Register: RegisterScreen
    });

export default createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        Main: MainTabNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    });
