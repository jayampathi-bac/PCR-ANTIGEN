import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
// @ts-ignore
const branch_id = cookies.get('admin2').branch_id

export default class AllTestsService {
  getAllTestsByBranch = (pageId: number) => axios.get(`${basic_url}/v1/admin/test/all/${branch_id}/${pageId}`, config)
    .then((response) => ({
      data: response.data,
    }));


  getAllTestsByRange = (start_date: string, end_date: string) => axios.get(`${basic_url}/v1/admin/test/allby/${branch_id}`, {
    // @ts-ignore
    params: {start_date: start_date, end_date: end_date}, config
  })
    .then((response) => ({
      data: response.data,
    }));

  getAllTestsByMonth = (selectedMonth: number) => axios.get(`${basic_url}/v1/admin/test/allbymonth/${branch_id}`, {
    // @ts-ignore
    params: {month: selectedMonth}, config
  })
    .then((response) => ({
      data: response.data,
    }));
}
