import React from 'react';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';

import Button from '../../components/Button';

const GetStarted = ({navigation, route}) => {

    return (
        <View style={styles.container}>
            {/* Body */}
            <View style={styles.bodyContainer} >
                <Image 
                    resizeMode='cover'
                    style={{ width: 200, height: 200}}
                    source={require('../../assets/images/logo.png')} />
                
                <Text style={[Typography.H5,{color: Colors.BLUE_DARK}]}>ch
                <Text style ={{color: Colors.PRIMARY}}>earn</Text>
                </Text>
                
                
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
            <TouchableOpacity style={[Typography.H1, {padding: 20,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',backgroundColor: Colors.PRIMARY}]} onPress={() => navigation.navigate(routes.Login)}>
                <Text style={[Typography.H1, {textAlign: 'center', color: Colors.WHITE}]}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        color: Colors.WHITE
    },
    // Footer
    footerContainer: {
        padding: 30,
    },
});
 
export default GetStarted;
 