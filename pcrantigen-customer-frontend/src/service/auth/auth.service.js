import axios from 'axios';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import {basic_url} from "../../utils/basic_config";

class AuthService {
    login(user) {
      let data = new FormData();
      data.set("username",user.username);
      data.set("password",user.password);
      data.set("grant_type","password");

      return axios.post( `${basic_url}/oauth/token`,data,{auth:{username:'pcr',password:'1234'}})
        .then(response=>{
          // console.log("login response",response)
          if (response.data.access_token){
            // localStorage.setItem('user',JSON.stringify(response.data.access_token));
            // localStorage.setItem('contact',JSON.stringify(response.data.contact_number));
            const user = {
              name:response.data.name,
              contact:response.data.contact_number,
              email:response.data.email ,
              access_token:response.data.access_token ,
              profile_url:response.data.profile_url ,
            };
            cookies.set("user",user,60 * 60 * 24 * 3);
            console.log("name cookie",cookies.get('user').name)
          }
          return response.data;
        })
    }


    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();
