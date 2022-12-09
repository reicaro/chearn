import React, {useEffect, useState, useRef} from 'react';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCards } from '../../dbHelpers/cardcollection';
import { getCardList, storeCardList } from '../../utils/card_factoring';
import LinearGradient from 'react-native-linear-gradient';
import { Animated } from 'react-native';

import Purchases from './purchases';
import Savings from './savings';

// Top Tabs
const Tab = createMaterialTopTabNavigator();

function TopTabs(props) {
    return (
        <Purchases style/>
    );
}

const Transactions = ({navigation}) => {
    const [cards, setCards] = useState([]);
    const [cardl, setCardList] = useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCards(setCards);
            getCardList(setCardList);
        })
        return unsubscribe;
    }, [navigation]);

    const __setCardL = (cardl) => {
        setCardList(cardl);
        storeCardList(cardl);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={[Typography.H1, {color: Colors.BLUE_DARK, marginBottom: 5}]}>Transactions</Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.iconContainer}
                    onPress={() => {[navigation.navigate(routes.AddTransaction, {cards: cards}), __setCardL(cards)]}}>
                        <Icon name="plus" color={Colors.BLUE_DARK} size={15} />
                </TouchableOpacity>
            </View>
            <View>
            <LinearGradient
          colors={['#D100F9', Colors.PRIMARY, Colors.BLUE_DARK]}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}>
        </LinearGradient>
            </View>
            
            {/* Body */}
            <View style={{flex: 1}}>
                <TopTabs />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    // Header
    headerContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 35,
        height: 35,
        marginBottom: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BLUE_MEDIUM
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        height: 2,
        paddingBottom: 0
      },
});

export default Transactions;

