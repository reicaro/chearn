import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCardList = async (setCardList) => {
    try {
        const jsonCardList = await AsyncStorage.getItem('cards');
        if(jsonCardList !== null) {
            const cardlist = JSON.parse(jsonCardList);
            setCardList(cardlist);
        }
        else {
            setCardList(null);
        }
    } catch(error) {
        console.log(error);
    }
}

export const storeCardList = async (cardlist) => {
    try {
        const jsonCardList = JSON.stringify(cardlist);
        await AsyncStorage.setItem('cards', jsonCardList);
    } catch (error) {
        console.log(error);
    }
}