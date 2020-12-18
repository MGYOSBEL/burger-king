import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burguer-king-default-rtdb.firebaseio.com/'
});

export default instance;