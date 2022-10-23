import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../../styles';

const ErrorCard = (props) => {
    const Error = props.Error;
    const date = new Date(Error.date)

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={Error.icon} color={Colors.BLUE_DARK} size={15} />
            </View>

            <Text style={{flex: 1, marginLeft: 5}}>
                {Error.type == 'Purchases' ?
                    <Text style={[Typography.TAGLINE, {color: Colors.BLUE_MEDIUM}]}>You received </Text>
                :
                    <Text style={[Typography.TAGLINE, {color: Colors.BLUE_MEDIUM}]}>You spent </Text>
                }
                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{Error.amount}$</Text>
                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_MEDIUM}]}> for </Text>
                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{Error.place}</Text>
                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_MEDIUM}]}> at </Text>
                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_DARK}]}>{date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</Text>
                <Text style={[Typography.TAGLINE, {color: Colors.BLUE_MEDIUM}]}>.</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.MAIN
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
 
export default ErrorCard;
 