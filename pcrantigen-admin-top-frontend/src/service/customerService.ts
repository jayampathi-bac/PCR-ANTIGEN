import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const token = cookies.get('admintop') ? cookies.get('admintop').access_token : null

const config = {headers: {Authorization: "Bearer " +token}}
// @ts-ignore

export default class CustomerService {
  // getCustomers = (pageId: number) => axios.get(`${basic_url}/v1/admin/customer/all/${pageId}`, config)
  getCustomers = (pageId: number) => axios.get(`${basic_url}/v1/admin/customer/all/${pageId}`)
    .then((response) => ({
      data: response.data,
    }));

}
