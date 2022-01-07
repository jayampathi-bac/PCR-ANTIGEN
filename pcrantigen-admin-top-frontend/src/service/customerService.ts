import axios from 'axios';

export default class CustomerService {
  getCustomers = () => axios.get(`http://localhost:8080/v1/admin/customer/all`)
    .then((response) => ({
      data: response.data.data,
    }));

  postCustomer = (customer: { profile_url: string; password: string; email: string; contact_number: string; name: string; }
  ) => axios.post(`http://localhost:8080/v1/admin/customer`, {
    name: customer.name,
    contact_number: customer.contact_number,
    email: customer.email,
    password: customer.password,
    profile_url: customer.profile_url,
  })
    .then((response) => ({
      data: response,
    }));

}
