import React from 'react';
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";

const QuizList = (props) => {

    const renderQuizes = [1, 2, 3].map((quiz, index) =>
        <li key={index}>
            <NavLink
                to={'/quiz' + quiz}
            >
                Test № {quiz}
            </NavLink>
        </li>)

    return (
        <div className={classes.QuizList}>
            <div>
                <h1>List of test</h1>
                <ul>
                    {renderQuizes}
                </ul>
            </div>
        </div>
    )
};

export default QuizList;