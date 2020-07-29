import React, {useEffect, useState} from 'react';
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizzes} from "../../store/actions/quiz";

const QuizList = (props) => {
    const renderQuizzes = props.quizzes.map(quiz =>
        <li key={quiz.id}>
            <NavLink
                to={'/quiz' + quiz.id}
            >
                {quiz.name}
            </NavLink>
        </li>)

    useEffect(() => {
        props.fetchQuizzes()
    }, [])

    return (
        <div className={classes.QuizList}>
            <div>
                <h1>List of test</h1>

                {
                    props.loading && props.quizzes.length !==0
                        ? <Loader/>
                        : <ul> {renderQuizzes} </ul>
                }

            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    quizzes: state.quiz.quizzes,
    loading: state.quiz.loading
})

const mapDispatchToProps = dispatch => ({
    fetchQuizzes: () => dispatch(fetchQuizzes())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);