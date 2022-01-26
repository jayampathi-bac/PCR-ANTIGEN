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
          console.log("login response",response)
          if (response.data.access_token){
            const admintop = {
              name:response.data.branch.company_name,
              contact:response.data.branch.contact_number,
              access_token:response.data.access_token ,
              profile_url:response.data.branch.profile_url ,
              branch_id:response.data.branch.branch_id ,
              address:response.data.branch.address,
              group_id:response.data.branch.group_id,
              start_time:response.data.login.start_time,
              end_time:response.data.login.end_time,
              period_of_use:response.data.login.period_of_use,
            };
            admintopStore = {
              name:response.data.branch.company_name,
              contact:response.data.branch.contact_number,
              profile_url:response.data.branch.profile_url ,
              branch_id:response.data.branch.branch_id ,
              address:response.data.branch.address,
              group_id:response.data.branch.group_id,
              start_time:response.data.login.start_time,
              end_time:response.data.login.end_time,
              period_of_use:response.data.login.period_of_use,
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
