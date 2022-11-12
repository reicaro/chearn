import React, { useState, useEffect } from 'react';

// bottom natigator
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

// Create the location context
const LocationContext = React.createContext(null);

function LocationProvider({children}) {

    const [location, setLocation] = useState(undefined);

    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
            stationaryRadius: 200,
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
                // send google API call
                let res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&rankby=distance&key=${googleKey}`);
                let locations = await res.json();
                // get location name and results
                let current_location = locations.results[0].name;
                // update the location state
                setLocation({currentLocation: current_location,
                             currentChoords: [lat, long],
                             rawResults: locations});
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
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
}

export default LocationContext;
export { LocationProvider };
