import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://projet-react-50524-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;