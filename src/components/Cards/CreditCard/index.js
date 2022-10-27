import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Icon
} from 'react-native';

import { Colors, Typography } from '../../../styles';

const CreditCard = (props) => {
    const company = props.company;
    const num = props.num;

    const censoredNum = num.trim().replace(/ /g, '').replace(/\d(?=\d{4})/g, "*");
    let numberDesign = new Array()
    for(i = 0; i < censoredNum.length; i++) {
        if(censoredNum[i] == "*") {
            numberDesign.push(
                <View key={i} style={{height: 8, width: 8, borderRadius: 4, marginHorizontal: 2, backgroundColor: 'white', alignSelf: 'center', marginRight: (i+1)%4 == 0 ? 4 : 0}}></View>
            )
        }else{
            numberDesign.push(
                <Text key={i} style={[Typography.H3, {color: Colors.WHITE, marginRight: (i+1)%4 == 0 ? 4 : 0}]}>{censoredNum[i]}</Text>
            );
        }
    }

    return (
        <View style={[props.style]}>
            {props?.onPress ?
                <Pressable 
                    style={styles.rowContainer}
                    onPress={props.onPress}>
                        <View style={styles.blockContainer}>
                            <Text style={[Typography.H3, {color: Colors.WHITE, marginBottom: 60}]}>{company}</Text>
                            <View style={{flexDirection: 'row'}}>
                                {numberDesign}
                            </View>
                        </View>
                </Pressable>
            : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -5, height: -5},
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    blockContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
});
 
export default CreditCard;