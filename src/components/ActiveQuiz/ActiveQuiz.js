import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'
const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>
                    {props.answerNumber}.
                </strong>&nbsp;
                {props.question}
            </span>
            <small>
                {props.answerNumber} of {props.quizLenght}
            </small>
        </p>

        <ul>
            <AnswersList
                answers ={props.answers}
                onAnswerClick = {props.onAnswerClick}
                ansState = {props.ansState}

            />
        </ul>

    </div>
)



export default ActiveQuiz
