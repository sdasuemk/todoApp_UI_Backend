import axios from "axios";

export const signup = (data) => axios.post('/user/signup', data);