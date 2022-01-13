import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
const branch_id = cookies.get('admin2').branch_id

export default class CustomerService {
  getCustomers = () => axios.get(`${basic_url}/v1/admin/customer/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  postCustomer = (customer: { profile_url: string; password: string; email: string; contact_number: string; name: string; branch_id:string}
  ) => axios.post(`${basic_url}/v1/admin/customer`, {
    name: customer.name,
    contact_number: customer.contact_number,
    email: customer.email,
    password: customer.password,
    profile_url: customer.profile_url,
    branch_id: customer.branch_id
  }, config)
    .then((response) => ({
      data: response,
    }));

  editCustomer = (customer: { email: string; contact_number: string; name: string}
  ) => axios.put(`${basic_url}/v1/admin/customer`, {
    name: customer.name,
    contact_number: customer.contact_number,
    email: customer.email,
    profile_url: '',
  }, config)
    .then((response) => ({
      data: response,
    }));

}
