import React, { useState, useEffect } from "react";
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Pressable,
    Linking
} from 'react-native';
import Modal from "react-native-modal";

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';

import Bar from '../../components/Bar';
import { currencies, getCurrency, storeCurrency } from '../../utils/currency';
import LinearGradient from 'react-native-linear-gradient';

const Settings = ({navigation}) => {
    const {state, authContext} = React.useContext(AuthContext);

    // Get User
    const user = state.user != null ? state.user : {firstname: '', lastname: '', joined: Date.now()};
    const date = new Date(user.joined);

    const [currency, setCurrency] = useState({});
    const [currencyModal, setCurrencyModal] = useState(false);

    useEffect(() => {
        getCurrency(setCurrency);
    }, []);

    const __signOut = () => {
        authContext.signOut();
    }

    return (
        <View style={{flex: 1}}>
            {/* Setting Screen */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {/* Header */}
                <View>
                <View style={styles.headcontainer}>
                    <View style={{flex: 1}}>
                        <Text style={[Typography.H1, {color: Colors.BLUE_DARK}]}>Settings</Text>
                    </View>
                </View>
                <LinearGradient
                colors={['#D100F9', Colors.PRIMARY, Colors.BLUE_DARK]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                </LinearGradient>
                </View>
                

                {/* Body */}
                <View style={styles.bodyContainer}>
                    {/* Account */}
                    
                    <View>
                        <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK, marginBottom: 10}]}>Account</Text>
                        <View style={styles.blockContainer}>
                            {/* First Name */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>First Name</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{user.firstname}</Text>
                            </View>
                            <Bar padding={3} color={Colors.BLUE_THIN} /> 
                            {/* Last Name */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Last Name</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{user.lastname}</Text>
                            </View>
                            <Bar padding={3} color={Colors.BLUE_THIN} /> 
                            {/* Joined at */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Joined</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{date.toDateString()}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK, marginBottom: 10, marginTop: 20}]}>Stats</Text>
                        <View style={styles.blockContainer}>
                            {/* First Name */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Total Spent</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>$142.48</Text>
                            </View>
                            <Bar padding={3} color={Colors.BLUE_THIN} /> 
                            {/* Last Name */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Total Savings</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>$24.91</Text>
                            </View>
                            <Bar padding={3} color={Colors.BLUE_THIN} /> 
                            {/* Joined at */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Cards</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>3</Text>
                            </View>
                        </View>
                    </View>



                    {/* Privacy */}
                    <View style={{marginTop: 20}}>
                        <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK, marginBottom: 10}]}>More</Text>
                        <View style={styles.blockContainer}>
                            <Pressable style={styles.rowContainer} onPress={() => Linking.openURL('https://github.com/reicaro/Chearner')}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Github</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>Reicaro</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Sign out */}
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        style={styles.btnContainer}
                        onPress={() => __signOut()} >
                            <Text style={[Typography.H3, {color: Colors.WHITE}]}>Sign out</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.MAIN
    },
    headcontainer: {
        padding: 20,
        paddingBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        textAlignVertical: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE
    },
    // Header
    headerContainer: {
        padding: 20,
        paddingBottom: 10
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 20
    },
    blockContainer: {
        borderRadius: 20,
        backgroundColor: Colors.BLUE_MEDIUM
    },
    rowContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: Colors.BLUE_MEDIUM
    },
    btnContainer: {
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: Colors.BLUE_DARK
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        height: 2,
        paddingBottom: 0
    },
});
 
export default Settings;
 