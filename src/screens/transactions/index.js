import React, {useEffect, useState} from 'react';
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

import Purchases from './purchases';
import Savings from './savings';

// Top Tabs
const Tab = createMaterialTopTabNavigator();

function TopTabs(props) {
    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarLabelStyle: [Typography.TAGLINE, {color: Colors.BLUE_DARK}],
                tabBarStyle: { 
                    backgroundColor: Colors.MAIN,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.PRIMARY
                },
                swipeEnabled: false,
                animationEnabled: true,
            }}>
            <Tab.Screen name={routes.Purchases} options={{ tabBarLabel: 'Purchases' }} component={Purchases} />
            <Tab.Screen name={routes.Savings} options={{ tabBarLabel: 'Savings' }} component={Savings} />
        </Tab.Navigator>
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
                <Text style={[Typography.H1, {color: Colors.BLUE_DARK, marginBottom: 20}]}>Transactions</Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.iconContainer}
                    onPress={() => {[navigation.navigate(routes.AddTransaction, {cards: cards}), __setCardL(cards)]}}>
                        <Icon name="plus" color={Colors.BLUE_DARK} size={15} />
                </TouchableOpacity>
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
        backgroundColor: Colors.MAIN
    },
    // Header
    headerContainer: {
        padding: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BLUE_MEDIUM
    },
});
 
export default Transactions;
 