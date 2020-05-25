import { AsyncStorage } from 'react-native';
import { data } from './_DATA';

const STORAGE_KEY = 'UdacityFlashCards:decks';

export function getDecksAPI() {
    return AsyncStorage.getItem(STORAGE_KEY).then(decks => {
        if (decks) {
            return JSON.parse(decks)
        } else {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            return data;
        }
    })
}

export async function getDeckAPI(id) {
    try {
        const storeResults = await AsyncStorage.getItem(STORAGE_KEY);

        return JSON.parse(storeResults)[id];
    } catch (err) {
        console.err(err);
    }
}

export async function saveDeckTitleAPI(title) {
    try {
        await AsyncStorage.mergeItem(
            STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            })
        );
    } catch (err) {
        console.err(err);
    }
}

export async function removeDeckAPI(key) {
    try {
        const results = await AsyncStorage.getItem(STORAGE_KEY);
        const data = JSON.parse(results);
        data[key] = undefined;
        delete data[key];
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        console.err(err);
    }
}

export async function addCardToDeckAPI(title, card) {
    try {
        const deck = await getDeck(title);

        await AsyncStorage.mergeItem(
            STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        );
    } catch (err) {
        console.err(err);
    }
}
