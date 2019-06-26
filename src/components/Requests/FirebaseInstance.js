import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://quest-103b9.firebaseio.com'
})

export default instance