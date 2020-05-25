import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveQuestions, saveQuestionVote } from './questions'
import { receiveUsers, saveUsersAnswer } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'



export function handleInitialDataAction() {
    return dispatch => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const info = {
            authedUser,
            qid,
            answer
        }
        dispatch(showLoading())
        return saveQuestionAnswer(info)
            .then(() => {
                dispatch(saveUsersAnswer(authedUser, qid, answer))
                dispatch(saveQuestionVote(authedUser, qid, answer))
                dispatch(hideLoading())
            })
    }
}
