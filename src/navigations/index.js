import React, {useEffect, useState} from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import routes from '../config/routes';
import { Colors, Typography } from '../styles';
import AuthContext from '../context/AuthContext';

// Import Screens
import Home from '../screens/home';
import Transactions from '../screens/transactions';
import Settings from '../screens/settings';
import Errors from '../screens/home/errors';
import AddTransaction from '../screens/transactions/add-transaction';
import Splash from '../screens/splash';
import GetStarted from '../screens/auth';
import Login from '../screens/auth/login';
import AddCard from '../screens/cardnav/add-card';

// HTML tools
import axios from 'axios';
// bottom natigator
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Bottom Tab Bar Navigator

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName={routes.Home}
            activeColor={Colors.PRIMARY}
            inactiveColor={Colors.BLUE_DARK}
            barStyle={[Typography.BODY, { backgroundColor: Colors.MAIN, borderTopWidth: 0.5, borderTopColor: Colors.Primary}]}>
            <Tab.Screen 
                name={routes.Home} 
                component={Home}
                options={{
                    tabBarLabel: <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{routes.Home}</Text>,
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={23} />
                    ),
                }} />
            <Tab.Screen 
                name={routes.Transactions} 
                component={Transactions}
                options={{
                    tabBarLabel: <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{routes.Transactions}</Text>,
                    tabBarIcon: ({ color }) => (
                        <Icon name="repeat" color={color} size={23} />
                    ),
                }} />
            <Tab.Screen 
                name={routes.Settings} 
                component={Settings}
                options={{
                    tabBarLabel: <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{routes.Settings}</Text>,
                    tabBarIcon: ({ color }) => (
                        <Icon name="settings" color={color} size={23} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

const RootNavigator = () => {
    const {state} = React.useContext(AuthContext);

    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
            stationaryRadius: 100,
            distanceFilter: 500,
            startOnBoot: true,
            stopOnTerminate: false,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStationary: true
        });

        BackgroundGeolocation.start();

        BackgroundGeolocation.on('location', (location) => {
            // to perform long running operation on iOS
            // you need to create background task
            BackgroundGeolocation.startTask(async (taskKey) => {
                // get google API key
                const googleKey = process.env.GOOGLE_API_KEY;
                // serialize location
                const [lat,long] = [location.latitude, location.longitude];
                // TODO send google API call
                // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${info?.coords?.latitude},${info?.coords?.longitude}&rankby=distance&key=${googleKey}`)
                // IMPORTANT: task has to be ended by endTask
                BackgroundGeolocation.endTask(taskKey);
                // otherwise ye shall have :tada: memeory leaks :tada:
            });
        });

        BackgroundGeolocation.on('background', () => {
            // now this looks like its doing nothing.
            // you would be right. its not
            //
            // However, without a background hook, there
            // will not be a way for the app to access
            // what is happening in the background.
            console.log('[INFO] App is in background');
        });

        return () => {
            console.log("unmounting background-activity");
            BackgroundGeolocation.removeAllListeners();
        };

    }, []);



    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                animation="fade"
            >
                
                {state.isLoading ?
                 <Stack.Screen name={routes.Splash} component={Splash} />
                 : state.user == null ? 
                 <>
                     <Stack.Screen name={routes.GetStarted} component={GetStarted} />
                     <Stack.Screen name={routes.Login} component={Login}/>
                 </>
                 : 
                 <>
                     <Stack.Screen name='MyTabs' component={MyTabs}/>
                     <Stack.Screen name={routes.Errors} component={Errors}/>
                     <Stack.Screen name={routes.AddTransaction} component={AddTransaction} />
                     <Stack.Screen name={routes.AddCard} component={AddCard} />
                 </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};
  
export default RootNavigator;
