import axios from 'axios';
import {useCookies} from "vue3-cookies";
import {basic_url} from "/@src/utils/basic_config";

const { cookies } = useCookies();


class AuthService {
    login(admin2) {
      let data = new FormData();
      data.set("username",admin2.username);
      data.set("password",admin2.password);
      data.set("grant_type","password");
      let admin2Store = null
      return axios.post(`${basic_url}/oauth/token`,data,{auth:{username:'pcr',password:'1234'}})
        .then(response=>{
          console.log("login response",response)
          if (response.data.access_token){
            const admin2 = {
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
            admin2Store = {
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
            cookies.set("admin2",admin2,60 * 60 * 24 * 1);
            console.log("name cookie",cookies.get('admin2').name)
          }
          return admin2Store;
        })
    }
  logout() {
    cookies.remove("admin2");
  }
}

export default new AuthService();
