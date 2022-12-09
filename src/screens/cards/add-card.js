import React, {useEffect, useState} from 'react';
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
import CreditCard from '../../components/Cards/CreditCard';
import BackHeader from '../../components/Headers/BackHeader';
import Button from '../../components/Button';

function detColor(num) {
    if (num[0] == 4) {
        color = '#1A1F71';
    } else if (num[0] == 5) {
        color = '#EB0012';
    } else if (num[0] == 3) {
        color = '#4d4f53';
    } else if (num[0] == 6) {
        color = '#F9A021';
    } else {
        console.log(num);
        color = Colors.BLUE_DARK;
    }
    return color;
}

function detCompany(num) {
    if (num[0] == 4) {
        return 'Visa';
    } else if (num[0] == 5) {
        return 'Mastercard';
    } else if (num[0] == 3) {
        return 'American Express';
    } else if (num[0] == 6) {
        return 'Discover';
    } else {
        console.log('Not yet supported');
        return '';
    }
}

const AddCard = ({navigation, route}) => {
    const [num, setNum] = useState('');
    const [info, setInfo] = useState(['Enter Details', '--']);
    const [type, setType] = useState('');

    useEffect(() => {
        cardinfo = info;
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
        

       
        const stringNum = num.toString();
        const stringCompany = detCompany(num);
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
        setInfo([detCompany(text), text]);
        console.log(info);
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <BackHeader title={route.params?.item ? 'Edit Card' : 'New Card'} />

            {/* Body */}
            <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
                {/* Title */}
                <Text style={[Typography.H1, {color: Colors.BLUE_DARK}, {marginTop: 10}]}>Scan Card Coming Soon</Text>
                {/* Spacer */}
                <View style={styles.spacer}>

                </View>
                {/* Amount */}
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
                        placeholder='eg: Chase Sapphire'
                        keyboardType='default'
                        onChangeText={(text) => setType(text)}
                        placeholderTextColor={Colors.PRIMARY}
                        style={[styles.input, Typography.BODY]} />
                </View>
                    <Text style={[Typography.H1, {color: Colors.BLUE_DARK}, {marginTop: 30}, {marginBottom: 30}, {textAlign: 'center'} ]}>Card</Text>
                    <View style={styles.cardspace}>
                        <CreditCard
                        company={info[0]} num = {info[1]} style={{borderRadius: 16,
                        paddingRight: 10,
                        flexDirection: 'row',
                        backgroundColor: detColor(info[1])}}
                        onPress={() => {}}
                        />
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
    cardspace: {
        paddingLeft: 30,
        paddingRight: 30
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
 

