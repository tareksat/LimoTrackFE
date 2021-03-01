import axios from 'axios';
import {toast} from 'react-toastify';
import * as auth from '../config/auth.json';

axios.defaults.headers.common['x-auth-token'] = auth.token;

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        toast.error('Server error');
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};