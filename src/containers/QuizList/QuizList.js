import React, {useEffect, useState} from 'react';
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";

const QuizList = (props) => {

    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)

    const renderQuizes = quizzes.map(quiz =>
        <li key={quiz.id}>
            <NavLink
                to={'/quiz' + quiz.id}
            >
                {quiz.name}
            </NavLink>
        </li>)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('quizzes.json')

                const quizzes = []
                Object.keys(response.data).forEach((key, index) => {
                    quizzes.push({
                        id: key,
                        name: `Test № ${index + 1}`
                    })
                    // console.log(key, index)
                })
                setQuizzes(quizzes)
                setLoading(false)
                //console.log(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()

    }, [])

    return (
        <div className={classes.QuizList}>
            <div>
                <h1>List of test</h1>

                {
                    loading
                        ? <Loader/>
                        : <ul> {renderQuizes} </ul>
                }

            </div>
        </div>
    )
};

export default QuizList;