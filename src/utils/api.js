import axios from 'axios';

let apiOld = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 10000
})

let api = axios.create({
    baseURL: 'http://localhost:1234',
    timeout: 10000
})

export { api }