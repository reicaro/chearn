import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Typography } from '../../../styles';

const BackHeader = (props) => {
    const navigation = useNavigation();

    return (
        <View>
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 5, alignItems: 'flex-start'}}
                onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" color={Colors.BLUE_DARK} size={20} />
            </TouchableOpacity>

            <Text style={[Typography.H3, {color: Colors.BLUE_DARK}]}>{props.title}</Text>
            
            <Icon name="chevron-right" color={Colors.WHITE} size={25} />
            </View>
            <LinearGradient
          colors={['#D100F9', Colors.PRIMARY, Colors.BLUE_DARK]}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}>
        </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        height: 2,
        paddingBottom: 0
      },
});
 
export default BackHeader;
 