import { RECEIVE_USER, SAVE_USER_ANSWER, ADD_USER_QUESTION } from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                ...action.users
            }
        case SAVE_USER_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser]["answers"],
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_USER_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat(action.question.id)
                }
            }

        default:
            return state
    }
}