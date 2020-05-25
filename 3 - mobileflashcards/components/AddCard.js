import React, { Component } from 'react'
import { Switch, Text, View, TextInput } from 'react-native';
import TouchButton from './TouchButton'
import { addCardToDeck } from '../actions/index';
import { addCardToDeckAPI } from '../utils/api';
import { connect } from 'react-redux'
import { styles } from '../utils/styles'

export class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        isCorrect: false
    }
    handleQuestionInput = (text) => {
        this.setState((prevState) => ({
            question: text.trim()
        }));
    }
    handleAnswerInput = (text) => {
        this.setState((prevState) => ({
            answer: text.trim()
        }));
    }
    handleSwitchInput = (evt) => {
        this.setState((prevState) => ({
            isCorrect: evt
        }));
    }
    addCard = (evt) => {
        const { id } = this.props.route.params;
        const { question, answer, isCorrect } = this.state;
        const card = {
            question,
            answer,
            isCorrect
        }
        this.props.dispatch(addCardToDeck(id, card));
        addCardToDeckAPI(id, card);
        this.props.navigation.navigate(
            'DeckDetail',
            {
                id: id
            }
        );
    }
    render() {
        const { question, answer, isCorrect } = this.state;
        return (
            <View style={[styles.container, { paddingTop: 20 }]}>
                <Text style={[styles.deckHeader, { margin: 15 }]}>Question : </Text>
                <TextInput style={[styles.inputField]} value={question} id='question' onChangeText={this.handleQuestionInput} placeholder='Enter your question' />
                <Text style={[styles.deckHeader, { margin: 15 }]}>Answer : </Text>
                <TextInput style={[styles.inputField]} value={answer} id='answer' onChangeText={this.handleAnswerInput} placeholder='Enter your question' />
                <Text style={[styles.deckHeader, { margin: 15 }]}>Is Answer Correct : </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isCorrect ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.handleSwitchInput}
                    value={isCorrect}
                />
                <TouchButton onPress={this.addCard} disabled={question.length === 0 || answer.length === 0}><Text>Add Question</Text></TouchButton>
            </View>
        )
    }
}

export default connect()(AddCard);
