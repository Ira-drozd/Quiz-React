import React, {useEffect, useState} from "react";
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Context from "../../context";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
//import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";


const Quiz = (props) => {

    useEffect(() => {
        props.retryQuiz()
        props.fetchQuizById(props.match.params.id)

    }, [])

    const onAnswerClickHandler = (answerId) => {
        props.quizAnswerClick(answerId)
    }

    const onRetry = () => {
        props.retryQuiz()
    }


    return (
        <Context.Provider value={{
            onAnswerClickHandler,
            onRetry
        }}>
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions
                    </h1>
                    {
                        props.loading || !props.quiz
                            ? <Loader/>
                            : props.isFinished
                            ? <FinishedQuiz
                                results={props.results}
                                quiz={props.quiz}
                            />
                            : <ActiveQuiz
                                answers={props.quiz[props.activeQuestion].answers}
                                question={props.quiz[props.activeQuestion].question}
                                quizLength={props.quiz.length}
                                answerNumber={props.activeQuestion + 1}
                                state={props.answerState}
                            />
                    }
                </div>
            </div>
        </Context.Provider>
    )
}

const mapStateToProps = state => ({
    loading: state.quiz.loading,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    quiz: state.quiz.quiz
})

const mapDispatchToProps = dispatch => ({
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: ()=> dispatch(retryQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)