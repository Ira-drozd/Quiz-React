import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export const createQuizQuestion = item => ({
    type: CREATE_QUIZ_QUESTION,
    item
})

export const resetQuizCreation = () => ({
    type: RESET_QUIZ_CREATION
})

export const finishCreateQuiz = () => async (dispatch, getState) => {
    await axios.post('quizzes.json', getState().create.quiz)
    dispatch(resetQuizCreation())
}