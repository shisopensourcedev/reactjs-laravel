import axios from 'axios';


const restapi = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json'
    },
});
export default {
    fatch: () =>
        restapi({
            'method': 'GET',
            'url': '/users'
        }),
    store: (data: any) =>
        restapi({
            'method': 'POST',
            'url': '/users/store',
            'data': data
        })
}