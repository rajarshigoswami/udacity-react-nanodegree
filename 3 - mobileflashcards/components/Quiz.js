import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import TouchButton from './TouchButton'
import TextButton from './TextButton'
import { AppLoading } from 'expo'
import { styles } from '../utils/styles'
import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/notification';

export class Quiz extends Component {
    state = {
        questionIdx: 0,
        correctAnswers: 0,
        seeAnswer: false,
        currentQuestion: null,
        ready: false
    }
    componentDidMount() {
        const { questions } = this.props;
        this.setState((prevState) => {
            return {
                currentQuestion: questions[0],
                ready: true
            }
        })
    }
    viewAnswer = () => {
        this.setState(currState => ({
            seeAnswer: true
        }))
    }
    viewQuestion = () => {
        this.setState(currState => ({
            seeAnswer: false
        }))
    }
    goToList = () => {
        this.props.navigation.navigate(
            'DeckList'
        )
        clearLocalNotification()
            .then(setLocalNotification);
    }
    resetQuiz = () => {
        const { questions } = this.props;
        this.setState(() => ({
            questionIdx: 0,
            correctAnswers: 0,
            seeAnswer: false,
            currentQuestion: questions[0],
            ready: true
        }))
        clearLocalNotification()
            .then(setLocalNotification);
    }
    getScore = () => {
        const { correctAnswers } = this.state;
        const { questions } = this.props;
        return (
            <React.Fragment>
                <Text style={[styles.deckHeader, { margin: 15 }]}>Congratulations. You have answered all the questions</Text>
                <Text style={[styles.deckHeader, { margin: 15 }]}>You have scored {correctAnswers} out of {questions.length}</Text>
                <TouchButton onPress={this.resetQuiz}><Text>Reset Quiz</Text></TouchButton>
                <TouchButton onPress={this.goToList}><Text>Go Back to Deck List</Text></TouchButton>
            </React.Fragment>
        )
    }
    answerHandler = (selected) => {
        const { currentQuestion } = this.state;
        const { isCorrect } = currentQuestion;
        const { questions } = this.props;
        if (selected === isCorrect) {
            this.setState((prevState) => {
                const newIdx = prevState.questionIdx + 1;
                return {
                    correctAnswers: prevState.correctAnswers + 1,
                    questionIdx: newIdx,
                    seeAnswer: false,
                    currentQuestion: questions[newIdx]
                }
            })
        } else {
            this.setState((prevState) => {
                const newIdx = prevState.questionIdx + 1;
                return {
                    questionIdx: newIdx,
                    seeAnswer: false,
                    currentQuestion: questions[newIdx]
                }
            })
        }
    }
    render() {
        const { questionIdx, correctAnswers, seeAnswer, currentQuestion, ready } = this.state;
        const { questions } = this.props;
        if (!ready)
            return <AppLoading />
        if (questionIdx >= questions.length) {
            return <View style={[styles.container, {}]}>{this.getScore()}</View>
        }
        const { question, answer } = currentQuestion;
        return (
            <View style={styles.container}>
                <Text style={{ alignSelf: 'flex-start' }}>{questionIdx + 1}/{questions.length}</Text>
                {seeAnswer ?
                    <View>
                        <Text style={[styles.deckHeader, { margin: 20 }]}>Answer : {answer}</Text>
                        <TextButton onPress={this.viewQuestion}><Text>See Question</Text></TextButton>
                    </View>
                    :
                    <View>
                        <Text style={[styles.deckHeader, { margin: 20 }]}>Question : {question}</Text>
                        <TextButton onPress={this.viewAnswer}><Text>See Answer</Text></TextButton>
                    </View>
                }
                <TouchButton onPress={() => this.answerHandler(true)}><Text>Correct</Text></TouchButton>
                <TouchButton onPress={() => this.answerHandler(false)}><Text>Wrong</Text></TouchButton>
            </View>
        )
    }
}


function mapStateToProps(state, props) {
    const name = props?.route?.name;
    const questions = props?.route?.params?.questions

    return {
        name,
        questions
    }
}
export default connect(mapStateToProps)(Quiz)
