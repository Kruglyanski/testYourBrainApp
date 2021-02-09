import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    RETRY_QUIZ
} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            await axios.get('/quizes.json').then(response => {
                console.log(response.data)
                const quizes = []
                Object.keys(response.data).forEach((key, index) => {
                    quizes.push({
                        id: key,
                        name: `Test ${index + 1}`
                    })
                })
                dispatch(fetchQuizesSuccess(quizes))
            })
            } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart()) // изменяем лоадинг на тру
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizeSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e)) // уже есть
        }

    }

}

export function fetchQuizeSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }

}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}



export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, answers) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        answers
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            console.log('answerId', typeof answerId)
            if (state.answerState[key] === 'success') {
                return
            }

        }
        const ans = state.answers
        const question = state.quiz[state.activeQuestion]
        console.log('question.rightAnswerId ', question )
        if (question.rightAnswer === answerId) {
            if (!ans[question.id]) {
                ans[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, ans))
            // this.setState({
            //     answerState: {[answerId]: 'success'},//квадратные скобки потому что это ключ, без них - просто строка
            //     answers: ans
            // })
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                    // this.setState({
                    //     isFinished: true
                    // })

                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: {[answerId]: null}
                    //
                    // })
                }
                window.clearTimeout(timeout)
            }, 100)

        } else {

            ans[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, ans))
            // this.setState({
            //     answerState: {[answerId]: 'error'},
            //     answers: ans
            // })

        }
    }

}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}
function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}