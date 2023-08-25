import axios from 'axios';

let api = axios.create({
    baseURL: 'http://localhost:1234',
    timeout: 10000
})

export { api }