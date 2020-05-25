import { white, purple, gray } from './colors';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            textAlign: 'center'
        },
        deckHeader: {
            fontSize: 22,
            fontWeight: 'bold'
        },
        deckCount: {
            fontSize: 18
        },
        deckContainer: {
            margin: 20,
            textAlign: 'center'
        },
        inputField: {
            borderWidth: 1,
            borderColor: gray,
            backgroundColor: white,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 5,
            fontSize: 20,
            height: 40,
            marginBottom: 20
        },
        btn: {
            width: 200,
            height: 50,
            backgroundColor: 'red',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            margin: 20
        },
        disabledBtn: {
            width: 200,
            height: 50,
            backgroundColor: 'gray',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            margin: 20
        },
        btnTxt: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        btnContainer: {
            alignItems: 'center',
        },
        reset: {
            textAlign: 'center',
            color: purple,
            fontSize: 20,
            fontWeight: 'bold',

        },
        btnContainer: {
            marginTop: 20
        }
    }
)