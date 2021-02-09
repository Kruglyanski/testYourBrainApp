import React from 'react'
import classes from './AnswerItem.css'

const AnswerItem = props => {

    const cls = [classes.AnswerItem]
    if (props.ansStateValue) {
        cls.push(classes[props.ansStateValue])
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem