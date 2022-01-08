import axios from 'axios';
import {basic_url} from "../utils/basic_config";

export default class CustomerService {
  signupCustomer(user) {
    console.log("signupCustomer Service",user)
    return axios
      .post(`${basic_url}/v1/customer`, {
        name: user.name,
        contact_number: user.contact_number,
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log("signup response : ",response)
        return response.data.data;
      });
  };
}
