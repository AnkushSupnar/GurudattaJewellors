import axios from 'axios'
const LOGIN_REST_API_URL="http://192.168.43.47:8080/guru/logins/logins";
class LoginService{
    getLogins()
    {
       return axios.get(LOGIN_REST_API_URL);
    }
}
export default new LoginService();