import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";

export const fetchQuizzes = () => (async dispatch => {
    dispatch(fetchQuizzesStart())
    try {
        const response = await axios.get('quizzes.json')
        const quizzes = []
        Object.keys(response.data).forEach((key, index) => {
            quizzes.push({
                id: key,
                name: `Test № ${index + 1}`
            })
        })
        dispatch(fetchQuizzesSuccess(quizzes))
    } catch (e) {
        dispatch(fetchQuizzesError(e))
    }
})

export const fetchQuizById = quizId => (async dispatch => {
        dispatch(fetchQuizzesStart())
        try {

            const response = await axios.get(`quizzes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))

        } catch (e) {
            dispatch(fetchQuizzesError(e))
        }
    }

)

const fetchQuizzesStart = () => ({
    type: FETCH_QUIZZES_START
})

const fetchQuizzesSuccess = (quizzes) => ({
    type: FETCH_QUIZZES_SUCCESS,
    quizzes
})

const fetchQuizzesError = (e) => ({
    type: FETCH_QUIZZES_ERROR,
    error: e
})

const fetchQuizSuccess = (quiz) => ({
    type: FETCH_QUIZ_SUCCESS,
    quiz
})

export const quizSetState = (answerState, results) => ({
    type: QUIZ_SET_STATE,
    answerState,
    results
})

export const finishQuiz = () => ({
    type: FINISH_QUIZ
})

export const quizNextQuestion = (number) => ({
    type: QUIZ_NEXT_QUESTION,
    number
})

export const retryQuiz = () => ({
    type: QUIZ_RETRY
})

export const quizAnswerClick = (answerId) => ((dispatch, getState) => {
    // const subRes = results
    const state = getState().quiz
    if (state.answerState) {
        const key = Object.keys(state.answerState)[0]
        if (state.answerState[key] === 'success') {
            return
        }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {

        if (!results[question.id]) {
            results[question.id] = 'success'
        }

        dispatch(quizSetState({[answerId]: 'success'}, results))

    } else {
        results[question.id] = 'error'
        dispatch(quizSetState({[answerId]: 'error'}, results))
    }

    const timeout = setTimeout(() => {
        if (isQuizFinished(state)) {
            dispatch(finishQuiz())
        } else {
            dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        clearTimeout(timeout)
    }, 800)
})

const isQuizFinished = (state) => {
    return state.activeQuestion + 1 === state.quiz.length
}
