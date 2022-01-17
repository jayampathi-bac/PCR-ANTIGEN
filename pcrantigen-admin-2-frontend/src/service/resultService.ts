import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
// @ts-ignore
const branch_id = cookies.get('admin2').branch_id

export default class ResultService {

  getResults = () => axios.get(`${basic_url}/v1/admin/availablecustomer/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  generateResult = (result: Object) => axios.post(`${basic_url}/v1/admin/test`, result, config)
    .then((response) => ({
      data: response.data,
    }));

  updateAvailableLogStatus = (result: Object) => axios.put(`${basic_url}/v1/admin/availablelog`, result, config)
    .then((response) => ({
      data: response.data,
    }));

  getBrandsByBranch = () => axios.get(`${basic_url}/v1/admin/testkit/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

}
