import React, {useContext} from "react";
import classes from './AnswerItem.module.scss'
import Context from "../../../../context";

const AnswerItem = (props) => {
    const {onAnswerClickHandler} = useContext(Context)

    const cls = [classes.AnswerItem]

    if (props.state) {
        cls.push(classes[props.state])
    }

    return (
        <li className={cls.join(' ')}
            onClick={onAnswerClickHandler.bind(null, props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem