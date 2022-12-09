import React, {useEffect, useState, useRef} from 'react';
import CardScanner from 'rn-card-scanner';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Switch,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { Colors, Typography } from '../../styles';
import { addCard, identify, fuz } from '../../dbHelpers/cardcollection';
import BackHeader from '../../components/Headers/BackHeader';
import Button from '../../components/Button';
//import {request, PERMISSIONS} from 'react-native-permissions';
//import {request} from 'react-native-permissions';
//import * as permissions from 'react-native-permissions';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const AddCard = ({navigation, route}) => {
    const [num, setNum] = useState('');
    const [company, setCompany] = useState('');
    const [type, setType] = useState('');
    const cardScannerRef = useRef(null)


    useEffect(() => {
        console.log(check, "AHHHHH");
        if (route.params?.item) {
            setType((route.params.item.type).toString());
            setNum((route.params.item.num).toString());
        }
        else {
            console.log('reached');
        }

    }, []);

    // Insert Card
    const __insert = () => {
        if (num[0] == 4) {
            var c = 'Visa';
        } else if (num[0] == 5) {
        var c = 'Mastercard';
        } else if (num[0] == 3) {
            var c = 'American Express';
        } else if (num[0] == 6) {
            var c = 'Discover';
        } else {
            console.log(num);
        }


        const stringNum = num.toString();
        const stringCompany = c;
        const stringType = fuz(type).toString();
        console.log('type: ' + stringType);
        addCard({
            num: stringNum.replace(/ /g, ''),
            company: stringCompany,
            type: stringType,
        });
        console.log(stringCompany);
    }

    // Save Card
    const __save = () => {
         __insert();
        navigation.goBack();
    }

    const formatCardNumber = (text) => {
        let newText = text?.replace(/ /g, '')?.match(/.{1,4}/g)?.join(' ');
        setNum(newText);
    }

    const TEMP__handleCardScan = () => {
        console.log("clicked");

        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            //setPermissionResult(result)
            console.log(result)
            if (result === RESULTS.GRANTED) {
                cardScannerRef.current.startCamera(); //@jack this doesn't do anything??? who knows bro
            }
        });
        console.log(PERMISSIONS.IOS.CAMERA)
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <BackHeader title={route.params?.item ? 'Edit Card' : 'New Card'} />

            {/* Body */}
            <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
                {/* Spacer */}
                <View style={styles.spacer}>

                </View>
                <CardScanner
                    style={{ flex: 1 }}
                    //useAppleVision={true}
                    ref={cardScannerRef}
                    didCardScan={(response) => {
                        console.log('Card info: ', response);
                    }}
                />
                {/* Amount */}
                <Button onPress={TEMP__handleCardScan}> HERE </Button>
                <View style={styles.inputContainer}>
                    <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>Card Number</Text>
                    <TextInput
                        value={num}
                        placeholder='eg: 1234 5678 9876 5432'
                        keyboardType='numeric'
                        onChangeText={(text) => formatCardNumber(text)}
                        placeholderTextColor={Colors.PRIMARY}
                        maxLength={19}
                        style={[styles.input, Typography.BODY]} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>Card Type - Doesn't have to be perfect, we use fuzzy search</Text>
                    <TextInput
                        value={type}
                        placeholder='eg: Sapphire, Premier, Travel Plus'
                        onChangeText={(text) => setType(text)}
                        placeholderTextColor={Colors.PRIMARY}
                        style={[styles.input, Typography.BODY]} />
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button
                    title='Save'
                    onPress={() => __save()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.MAIN
    },

    spacer: {
        paddingTop: 50
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.BLUE_DARK,
        backgroundColor: Colors.BLUE_MEDIUM
    },
    rowContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});

export default AddCard;


