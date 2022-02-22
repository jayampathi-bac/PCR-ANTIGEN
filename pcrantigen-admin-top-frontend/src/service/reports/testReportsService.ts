import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const token = cookies.get('admintop') ? cookies.get('admintop').access_token : null

const config = {headers: {Authorization: "Bearer " +token}}
// @ts-ignore

export default class TestReportsService {
  // getCustomers = (pageId: number) => axios.get(`${basic_url}/v1/admin/customer/all/${pageId}`, config)
  getTestsNormal = (pageId: number,searchData: {result: number,status: number, start_date: string, end_date: string}) => axios.post(`${basic_url}/v1/report/test/${pageId}`,searchData)
    .then((response) => ({
      data: response.data,
    }));

  getBranchesFromGroup = (group_id: number) => axios.get(`${basic_url}/v1/admin/branch/allbranch/${group_id}`)
    .then((response) => ({
      data: response.data,
    }));

  getAllTestsReportsForCSV = () => axios.get(`${basic_url}/v1/report/allTestCsv/`)
    .then((response) => ({
      data: response.data,
    }));
}
