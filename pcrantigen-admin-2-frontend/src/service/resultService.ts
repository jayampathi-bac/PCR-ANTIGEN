import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
// const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
// // @ts-ignore
// const branch_id = cookies.get('admin2').branch_id

export default class ResultService {

  getResults = () => axios.get(`${basic_url}/v1/admin/availablecustomer/all/${cookies.get('admin2').branch_id}`,
    {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response.data.data,
    }));

  generateResult = (result: Object) => axios.post(`${basic_url}/v1/admin/test`, result,
    {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response.data,
    }));

  updateAvailableLogStatus = (result: Object) => axios.put(`${basic_url}/v1/admin/availablelog`, result,
    {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response.data,
    }));

  getBrandsByBranch = () => axios.get(`${basic_url}/v1/admin/testkit/all/${cookies.get('admin2').branch_id}`,
    {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response.data.data,
    }));

}
