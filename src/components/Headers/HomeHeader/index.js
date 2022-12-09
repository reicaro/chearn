import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import routes from '../../../config/routes';
import { Colors, Typography } from '../../../styles';
import AuthContext from '../../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';

const HomeHeader = () => {
    const navigation = useNavigation();

    const {state} = React.useContext(AuthContext);
    
    // Get User
    const user = state.user != null ? state.user : {firstname: '', lastname: '', joined: Date.now()};
    const date = new Date(user.joined);
    
    return (
        <View>
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={[Typography.H1, {color: Colors.BLUE_DARK}]}>Hey {user.firstname}!</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate(routes.Errors)} >
                    <Icon name="alert-triangle" color={Colors.BLUE_DARK} size={30} />
            </TouchableOpacity>
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
        padding: 20,
        paddingBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        textAlignVertical: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        height: 2,
        paddingBottom: 0
      },
});
 
export default HomeHeader;
 