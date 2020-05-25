import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../utils/styles'

export default class EmptyDeck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.deckHeader}> Sorry you cannot take a quiz because there are no cards in the deck </Text>
            </View>
        )
    }
}
