import axios from 'axios';

const instance = axios.create({
  baseURL:'https://react-my-burger-26d3b.firebaseio.com/'
});


export default instance;
