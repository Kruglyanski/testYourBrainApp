import axios from 'axios'

export default axios.create({
    baseURL: 'https://test-ce86f-default-rtdb.europe-west1.firebasedatabase.app/'
    // baseURL: 'https://react-quiz-fa011.firebaseio.com/'
})