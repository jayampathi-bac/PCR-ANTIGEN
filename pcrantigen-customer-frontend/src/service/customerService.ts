import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
let config = {headers: {Authorization: "Bearer " + cookies.get('user').access_token}}

export default class CustomerService {
  signupCustomer(user: { name: any; contact_number: any; email: any; password: any; }) {
    // console.log("signupCustomer Service",user)
    return axios
      .post(`${basic_url}/v1/customer`, {
        name: user.name,
        contact_number: user.contact_number,
        email: user.email,
        password: user.password
      })
      .then(response => {
        // console.log("signup response : ",response)
        return response.data.data;
      });
  };

  getCustomerIDCard(contact: any) {
    return axios
      .get(`${basic_url}/v1/test/${contact}`, config)
      .then(response => {
        console.log("getCustomerIDCard response : ", response)
        return response.data;
      });
  }

}
