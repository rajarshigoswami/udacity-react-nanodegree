import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TouchButton from './TouchButton'
import TextButton from './TextButton'
import { styles } from '../utils/styles'
import { removeDeck } from '../actions/index';
import { removeDeckAPI } from '../utils/api';
import { AppLoading } from 'expo'


export class DeckDetail extends Component {
    goToNewCard = () => {
        this.props.navigation.navigate(
            'AddCard',
            {
                id: this.props.deck.title
            }
        )
    }

    deleteCard = () => {
        debugger;
        const deckId = this.props?.route?.params?.id;
        this.props.dispatch(removeDeck(deckId));
        removeDeckAPI(deckId);
        this.props.navigation.navigate('DeckList');
    }

    goToQuiz = () => {
        if (this.props.deck.questions && this.props.deck.questions.length > 0) {
            this.props.navigation.navigate(
                'Quiz',
                {
                    questions: this.props.deck.questions
                }
            )
        }
        else {
            this.props.navigation.navigate(
                'EmptyDeck'
            )
        }
    }
    render() {
        const { deck } = this.props;
        if (!deck) return <AppLoading />
        return (
            <View style={[styles.container, { marginTop: 20 }]}>
                <Text style={styles.deckHeader}> {deck.title} </Text>
                <Text style={styles.deckHeader}> {deck.questions.length} cards</Text>
                <TouchButton onPress={this.goToNewCard}><Text>Add Card</Text></TouchButton>
                <TouchButton onPress={this.goToQuiz}><Text>Start Quiz</Text></TouchButton>
                <TextButton onPress={this.deleteCard}><Text>Delete Deck</Text></TextButton>
            </View>
        )
    }
}
function mapStateToProps(decks, props) {
    const deckId = props?.route?.params?.id;
    return {
        deck: decks[deckId]
    }
}


export default connect(mapStateToProps)(DeckDetail);
