import React, {useEffect, useState} from 'react';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ScrollView
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCurrency } from '../../utils/currency';
import { getInfo, storeInfo } from '../../utils/card_factoring';
import { getTransactions, getTotalPurchases, getTotalSavings, deleteTransaction } from '../../dbHelpers/transactionHelper';
import { addCard, getCards } from '../../dbHelpers/cardcollection';

import QuickActions from '../../utils/quickActions';
import CreditCard from '../../components/Cards/CreditCard';
import HomeHeader from '../../components/Headers/HomeHeader';
import TransactionCard from '../../components/Cards/TransactionCard';
import BlockHeader from '../../components/Headers/BlockHeader';
//import CardCarousel from '../../components/Carousel';

function detColor(num) {
    if (num[0] == 4) {
        color = '#1A1F71';
    } else if (num[0] == 5) {
        color = '#EB001B';
    } else if (num[0] == 3) {
        color = '#4d4f53';
    } else if (num[0] == 6) {
        color = '#F9A021';
    } else {
        color = Colors.ALERT;
        console.log(num);
    }
    return color;
}

const Home = ({navigation}) => {
    const focused = useIsFocused();

    const [currency, setCurrency] = useState({});
    const [totalPurchases, setTotalPurchases] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [cards, setCards] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions(setTransactions);
        getCurrency(setCurrency);
        getTotalPurchases(setTotalPurchases);
        getTotalSavings(setTotalSavings);
        getCards(setCards);
    }, [focused]);

    // Delete Item
    const __delete = (id) => {
        deleteTransaction(id);
        getTransactions(setTransactions);
        getTotalPurchases(setTotalPurchases);
        getTotalSavings(setTotalSavings);
    }

    const __add = (cardnum) => {
        addCard(cardnum);
        setInfo(cardnum);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate(routes.AddTransaction, {item: item});
    }

    const __addc = () => {
        navigation.navigate(routes.AddTransaction);
    }

    return (
        <View style={styles.container}>
            <HomeHeader/>

            {/* Body */}
            <View style={styles.bodyContainer}>
                <SwipeableFlatList
                    data={transactions.slice(0, 5)}
                    maxSwipeDistance={140}
                    shouldBounceOnMount={true}
                    showsVerticalScrollIndicator={false}
                    showsIndicators={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderActions={({index, item}) => QuickActions(item, __update, __delete)}
                    ListHeaderComponent={() => {
                        return(
                            <View>
                                <View style={{padding: 15}}>
                                </View>
                                <SwipeableFlatList
                                    data={cards}
                                    maxSwipeDistance={140}
                                    horizontal={true}
                                    shouldBounceOnMount={true}
                                    showsIndicators={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListHeaderComponent={() => {
                                        return (
                                            <View style={{paddingRight: 20}}>
                                                <Pressable style={styles.addC} onPress={() => navigation.navigate(routes.AddCard)}>
                                                    <Text style={[Typography.H3, {color: Colors.WHITE, textAlign: 'center'}]}>Add Card</Text>
                                                </Pressable>
                                            </View>
                                        )
                                    }}
                                    renderItem={({item, index}) => {
                                        return <View style={styles.card} >
                                                    <CreditCard
                                                        company={item.company} num = {item.num + '      '} style={{borderRadius: 16,
                                                            paddingRight: 10,
                                                            flexDirection: 'row',
                                                            backgroundColor: detColor(item.num)}}
                                                        onPress={() => {}}
                                                    />
                                                    
                                                    </View>               
                                    }}
                                />
                                <View>
                                    <Text
                                        style={[Typography.H1, {color: Colors.BLUE_DARK}, {marginTop: 20}]}>Activity</Text>
                                </View>
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => {
                        return(
                            <View style={styles.emptyContainer}>
                                <Text style={[Typography.H4, {color: Colors.BLUE_DARK, textAlign: 'center'}]}>You haven't had any recent activity.</Text>
                            </View>
                        )
                    }}
                    renderItem={({item, index}) => {
                        return <TransactionCard currency={currency.symbol} key={index} transaction={item} />
                    }}
                    ListFooterComponent={() => { 
                        return (
                            // Statistics
                            <View style={{marginBottom: 20}}>
                                <Text
                                        style={[Typography.H1, {color: Colors.BLUE_DARK}, {marginTop: 20}]}>Analytics</Text>
                                <View style = {styles.wipstyle}>
                                <Text style={[Typography.H1, {color: Colors.WHITE, textAlign: 'center', marginTop: 80, marginBottom:80}]}>WIP</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wipstyle: {
        marginTop: 20,
        alignContent: 'center',
        backgroundColor: Colors.BLUE_DARK,
        borderRadius: 15
    },
    addC: {
        flex: 1,
        padding: 30,
        paddingTop: 62.5,
        paddingBottom: 62.5,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 16,
        alignContent: 'center',
        justifyContent: 'center'
    },
    // Body
    bodyContainer: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 0,
        backgroundColor: Colors.MAIN
    },
    emptyContainer: {
        padding: 20
    },
    separator: {
        padding: 10
    },
    card: {
        paddingRight: 20
    }
});
 
export default Home;
 