import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../../styles';

const BlockHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={[Typography.H1, {color: Colors.BLUE_DARK}]}>{props.title}</Text>
            
            {props?.onPress ?
                <Pressable 
                    style={styles.rowContainer}
                    onPress={props.onPress}>
                        <Text style={[Typography.TAGLINE, {color: props.color, marginRight: 5}]}>All</Text>
                        <Icon name="chevron-right" color={Colors.BLUE_DARK} size={10} />
                </Pressable>
            : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
 
export default BlockHeader;
 