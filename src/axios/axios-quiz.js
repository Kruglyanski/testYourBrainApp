import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-48fc2-default-rtdb.europe-west1.firebasedatabase.app/'
    // baseURL: 'https://react-quiz-fa011.firebaseio.com/'
})
