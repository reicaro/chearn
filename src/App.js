import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar
} from 'react-native';

import { Colors } from './styles';

import RootNavigator from './navigations';
import AuthProvider from './context/AuthProvider';
import { LocationProvider }  from './context/LocationContext.js'; // LocationContext exports the chooresponding provider as well

const App = () => {
    return (
        <AuthProvider>
            <LocationProvider>
                <SafeAreaView style={styles.container}>
                    <StatusBar StatusBarStyle='light-content' backgroundColor={Colors.MAIN} />
                    <RootNavigator />
                </SafeAreaView>
            </LocationProvider>
        </AuthProvider>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
});

export default App;
