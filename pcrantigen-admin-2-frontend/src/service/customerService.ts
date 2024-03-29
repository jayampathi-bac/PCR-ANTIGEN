import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// // @ts-ignore
// const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
// // @ts-ignore
// const branch_id = cookies.get('admin2').branch_id

export default class CustomerService {
  getCustomers = (pageId: number) => axios.get(`${basic_url}/v1/admin/customer/all/${cookies.get('admin2').branch_id}/${pageId}`,
    {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response.data,
    }));

  postCustomer = (customer: { profile_url: string; password: string; email: string; contact_number: string; name: string}
  ) => axios.post(`${basic_url}/v1/admin/customer`, {
    name: customer.name,
    contact_number: customer.contact_number,
    email: customer.email,
    password: customer.password,
    profile_url: customer.profile_url,
    branch_id: cookies.get('admin2').branch_id
  }, {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response,
    }));

  editCustomer = (customer: { email: string; contact_number: string; name: string}
  ) => axios.put(`${basic_url}/v1/admin/customer`, {
    name: customer.name,
    contact_number: customer.contact_number,
    email: customer.email,
    profile_url: '',
  }, {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response,
    }));

}
