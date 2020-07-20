import React, {useContext} from "react";
import classes from './FinishedQuiz.module.scss'
import Context from "../../context";
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = (props) => {
    const {onRetry} = useContext(Context)
    const successCount = Object.values(props.results).filter(result => result === 'success').length

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                            const cls = [
                                'fa',
                                props.results[index + 1] === 'success' ? 'fa-check' : 'fa-times',
                                classes[props.results[index + 1]]
                            ]

                            return (
                                <li key={index}>
                                    <strong>{index + 1}.&nbsp;</strong>
                                    {quizItem.question}
                                    <i className={cls.join(' ')}/>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <p>{successCount} of {props.quiz.length}</p>
            <Button onClick={onRetry.bind(null)} type='primary'>Repeat</Button>
            <Link to={'/'}>
                <Button type='success'>Go to tests</Button>
            </Link>
        </div>
    )
}

export default FinishedQuiz