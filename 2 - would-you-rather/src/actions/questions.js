import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserQuestion } from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_VOTE = 'SAVE_QUESTION_VOTE' //keeping the name different to not clash with SaveQuestionAnswer
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function saveQuestionVote(authedUser, qid, answer) {
    return {
        type: SAVE_QUESTION_VOTE,
        authedUser,
        qid,
        answer
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}


export function handleSaveQuestion({ optionOne, optionTwo }) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const question = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        }
        dispatch(showLoading())
        return saveQuestion(question)
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addUserQuestion(question))
            })
            .then(() => dispatch(hideLoading()))
    }

}