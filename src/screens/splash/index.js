import React from 'react';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

import { Colors } from '../../styles';

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image 
                resizeMode='cover'
                style={{ width: 250, height: 250}}
                source={require('../../assets/images/logo.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.MAIN
    },
});
 
export default Splash;
 