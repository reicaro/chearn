import React, {useEffect, useState} from 'react';
import { Colors, Typography } from '../../styles';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const BackgroundActivity = () => {
    useEffect(() => {
        console.log("mounting background-activity");
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: true,
            startOnBoot: true,
            stopOnTerminate: false,
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

        return () => {
            console.log("unmounting background-activity");
            BackgroundGeolocation.removeAllListeners();
        };

    }, []);

    BackgroundGeolocation.on('background', () => {
        console.log('[INFO] App is in background');
    });



    BackgroundGeolocation.on('location', (location) => {
        // handle your locations here
        // to perform long running operation on iOS
        // you need to create background task
        console.log(location, "THIS IS RUNNING")
        //BackgroundGeolocation.startTask(taskKey => {
        //    // execute long running task
        //    // eg. ajax post location
        //    // IMPORTANT: task has to be ended by endTask
        //    BackgroundGeolocation.endTask(taskKey);
        //});
    });


    BackgroundGeolocation.checkStatus(status => {
        console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
        console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
        console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

        // you don't need to check status before start (this is just the example)
        if (!status.isRunning) {
            BackgroundGeolocation.start(); //triggers start on start event
        }
    });

    return <></>;
}

export default BackgroundActivity;
