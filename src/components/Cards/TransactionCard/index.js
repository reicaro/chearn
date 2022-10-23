import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../../styles';

const TransactionCard = (props) => {
    const transaction = props.transaction;
    const currency = props.currency;

    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={[Typography.BODY, {color: Colors.BLUE_DARK}]}>{transaction.place}</Text>
                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{transaction.date}</Text>
            </View>

            <Text style={[Typography.H4, transaction.type == 'Purchases' ? {color: Colors.ALERT} : {color: Colors.SUCCESS}]}>
                {transaction.type == 'Purchases' ? (transaction.amount != null ? '-' : '') : (transaction.amount != null ? '+' : '')}{transaction.amount != null ? currency : ''}{transaction.amount} {' '}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.BLUE_MEDIUM,
        borderRadius: 10
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY
    },
    detailsContainer: {
        flex: 1, 
        marginLeft: 10, 
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        justifyContent: 'space-between'
    }
});
 
export default TransactionCard;
 