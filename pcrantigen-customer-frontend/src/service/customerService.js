import axios from 'axios';

export default class CustomerService {
  signupCustomer(user) {
    console.log("signupCustomer Service",user)
    return axios
      .post(`http://localhost:8080/v1/customer`, {
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
