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

    // Toggle Currency Modal
    const __toggleCurrencyModal = () => {
        setCurrencyModal(!currencyModal);
    };

    // Change Currency
    const __changeCurrency = (currency) => {
        setCurrency(currency);
        storeCurrency(currency);
        __toggleCurrencyModal();
    };

    const __signOut = () => {
        authContext.signOut();
    }

    return (
        <View style={{flex: 1}}>
            {/* Currency Modal */}
            <Modal 
                isVisible={currencyModal} >
                    <ScrollView style={styles.modalContainer} showsVerticalScrollIndicator={false} >
                        {currencies.map((item, index) => (
                            <View key={index} >
                                {index != 0 ?
                                    <Bar padding={0.2} color={Colors.BLUE_THIN} /> 
                                : null }
                                <Pressable style={styles.rowContainer} onPress={() => __changeCurrency(item)} >
                                    <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>{item.name}</Text>
                                    <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{item.symbol}</Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
            </Modal>

            {/* Setting Screen */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={[Typography.H1, {color: Colors.BLUE_DARK, marginBottom: 10}]}>Settings</Text>
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
                            <Bar padding={1.5} color={Colors.BLUE_THIN} /> 
                            {/* Last Name */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Last Name</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{user.lastname}</Text>
                            </View>
                            <Bar padding={1.5} color={Colors.BLUE_THIN} /> 
                            {/* Joined at */}
                            <View style={styles.rowContainer}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Joined</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{date.toDateString()}</Text>
                            </View>
                        </View>
                    </View>


                    {/* Privacy */}
                    <View style={{marginTop: 20}}>
                        <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK, marginBottom: 10}]}>More</Text>
                        <View style={styles.blockContainer}>
                            <Pressable style={styles.rowContainer} onPress={() => Linking.openURL('https://github.com/reicaro/Chearner')}>
                                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>Github</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>Reid</Text>
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
    // Header
    headerContainer: {
        padding: 20,
        paddingBottom: 10
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    blockContainer: {
        borderRadius: 10,
        backgroundColor: Colors.BLUE_MEDIUM
    },
    rowContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: Colors.BLUE_DARK
    },
    // Modal 
    modalContainer: {
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        backgroundColor: Colors.MAIN
    },
});
 
export default Settings;
 