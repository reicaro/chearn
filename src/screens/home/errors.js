import React from 'react';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import { Colors, Typography } from '../../styles';

import BackHeader from '../../components/Headers/BackHeader';

const Errors = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <BackHeader title='Errors' />

            {/* Body */}
            <View style={styles.bodyContainer}>
                <Text style={[Typography.BODY, {textAlign: 'center', color: Colors.BLUE_DARK}]}>Errors will be stored here</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.MAIN
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
 
export default Errors;
 