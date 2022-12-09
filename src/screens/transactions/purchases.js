import React, {useEffect, useState} from 'react';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCurrency } from '../../utils/currency';
import { getPurchases, deleteTransaction } from '../../dbHelpers/transactionHelper';

import QuickActions from '../../utils/quickActions';
import TransactionCard from '../../components/Cards/TransactionCard';

const Purchases = ({navigation, route}) => {
    const focused = useIsFocused();

    const [currency, setCurrency] = useState({});
    const [Purchases, setPurchases] = useState([]);
    
    useEffect(() => {
        getCurrency(setCurrency);
        getPurchases(setPurchases);
    }, [focused]);

    // Delete Item
    const __delete = (id) => {
        deleteTransaction(id);
        getPurchases(setPurchases);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate(routes.AddTransaction, {item: item});
    }

    return (
        <View style={styles.container}>
            {Purchases.length == 0 ?
                <View style={styles.emptyContainer}>
                    <Text style={[Typography.H3, {color: Colors.BLUE_DARK, textAlign: 'center'}]}>You haven't made any purchases</Text>
                </View>
            :
                <SwipeableFlatList
                    data={Purchases}
                    maxSwipeDistance={140}
                    shouldBounceOnMount={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderQuickActions={({index, item}) => QuickActions(item, __update, __delete)}
                    renderItem={({item, index}) => {
                        return <TransactionCard currency={currency.symbol} key={index} transaction={item} />
                    }}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.MAIN
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
 
export default Purchases;
 