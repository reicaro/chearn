import React, {useEffect, useState} from 'react';
import { Colors, Typography } from '../../styles';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const BackgroundActivity = () => {
    useEffect(() => {
        console.log("mounting background activity");
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: true,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
            url: 'http://192.168.81.15:3000/location',
            httpHeaders: {
                'X-FOO': 'bar'
            },
            // customize post properties
            postTemplate: {
                lat: '@latitude',
                lon: '@longitude',
                foo: 'bar' // you can also add your own properties
            }
        });


        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
        });


        return () => {
            BackgroundGeolocation.removeAllListeners();
        };

    }, []);
}

export default BackgroundActivity;
