export const RECEIVE_USER = 'RECEIVE_USER'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USER,
        users
    }
}

export function saveUsersAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}
export function addUserQuestion(question) {
    return {
        type: ADD_USER_QUESTION,
        question
    }
}