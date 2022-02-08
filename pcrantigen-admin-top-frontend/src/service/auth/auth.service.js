import axios from 'axios';
import {useCookies} from "vue3-cookies";
import {basic_url} from "/@src/utils/basic_config";

const { cookies } = useCookies();


class AuthService {
    login(admintop) {
      let data = new FormData();
      data.set("username",admintop.username);
      data.set("password",admintop.password);
      data.set("grant_type","password");
      let admintopStore = null
      return axios.post(`${basic_url}/oauth/token`,data,{auth:{username:'pcr',password:'1234'}})
        .then(response=>{
          if (response.data.access_token){
            const admintop = {
              name:'Admin',
              access_token:response.data.access_token ,
              profile_url: 'https://sample.jvpdtest.com/User.jpg',
            };
            admintopStore = {
              name:'Admin',
              access_token:response.data.access_token ,
              profile_url: 'https://sample.jvpdtest.com/User.jpg',
            };
            cookies.set("admintop",admintop,60 * 60 * 24 * 1);
            console.log("name cookie",cookies.get('admintop').name)
          }
          return admintopStore;
        })
    }
  logout() {
    cookies.remove("admintop");
  }
}

export default new AuthService();
