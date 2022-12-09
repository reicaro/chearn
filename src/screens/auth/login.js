import React, {useState} from 'react';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';

import Button from '../../components/Button';

const Login = ({navigation}) => {
    const {authContext} = React.useContext(AuthContext);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    // Login
    const __login = () => {
        if (firstname != '' && lastname != '') {
            const user = {
                firstname: firstname,
                lastname: lastname,
                joined: new Date()
            }
            authContext.signIn(user);
        }
        else {
            Alert.alert('Please enter a name');
        }
    }

    return (
        <View style={styles.container}>
            {/* Body */}
            <View style={styles.bodyContainer} >
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.goBack()} >
                            <Icon name="arrow-left" color={Colors.BLUE_DARK} size={25} />
                    </TouchableOpacity>
                    <Text style={[Typography.H1, {marginLeft: 10, color: Colors.BLUE_DARK}]}>Login</Text>
                </View>

                {/* First Name */}
                <View style={{marginTop: 20}}>
                    <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>First Name</Text>
                    <TextInput
                        value={firstname}
                        placeholder='eg: Jogn'
                        keyboardType='name-phone-pad'
                        onChangeText={(text) => setFirstname(text)}
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.PRIMARY} />
                </View>

                {/* Last Name */}
                <View style={{marginTop: 20}}>
                    <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>Last Name</Text>
                    <TextInput
                        value={lastname}
                        placeholder='eg: Doe'
                        keyboardType='name-phone-pad'
                        onChangeText={(text) => setLastname(text)}
                        style={[styles.input, Typography.BODY]}
                        placeholderTextColor={Colors.PRIMARY} />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
            <TouchableOpacity style={[Typography.H1, {padding: 20,
                marginTop: 20,
                borderRadius: 10,
                alignItems: 'center',backgroundColor: Colors.PRIMARY}]} onPress={() => __login()}>
                <Text style={[Typography.H1, {textAlign: 'center', color: Colors.WHITE}]}>Login</Text>
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
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.BLUE_DARK,
        backgroundColor: Colors.BLUE_MEDIUM
    },
    // Footer
    footerContainer: {
        padding: 30,
    },
});
 
export default Login;
 