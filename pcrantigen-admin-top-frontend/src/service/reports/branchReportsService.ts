import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const token = cookies.get('admintop') ? cookies.get('admintop').access_token : null

const config = {headers: {Authorization: "Bearer " +token}}
// @ts-ignore

export default class BranchReportsService {
  // getCustomers = (pageId: number) => axios.get(`${basic_url}/v1/admin/customer/all/${pageId}`, config)
  getBranchesNormal = (pageId: number,searchData: {group_id: number, orderby: number}) => axios.post(`${basic_url}/v1/report/branch/${pageId}`,searchData)
    .then((response) => ({
      data: response.data,
    }));

  getAllGroups = () => axios.get(`${basic_url}/v1/report/allgroup/`)
    .then((response) => ({
      data: response.data,
    }));

  getBranchesForCSV = () => axios.get(`${basic_url}/v1/report/allBranchCsv/`)
    .then((response) => ({
      data: response.data,
    }));
}
