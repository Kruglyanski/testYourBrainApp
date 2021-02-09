import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    console.log("answers", props.answersObj)
    const successCount = Object.keys(props.answersObj).reduce((total, key) => {
        if (props.answersObj[key] === 'success'){
            total++
        }
        return total
    }, 0)

    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.answersObj[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                         classes[props.answersObj[quizItem.id]]
                    ]

                    return (
                        <li
                            key = {index}
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />

                        </li>
                    )
                }) }
            </ul>

            <p> Right {successCount} of {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type ="primary">Retry</Button>
                <Link to={'/'}>
                    <Button  type ="success">Go to test list</Button>
                </Link>

            </div>
        </div>
    )
}

export default FinishedQuiz