import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

export default axios;
