import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
const branch_id = cookies.get('admin2').branch_id

export default class AllTestsService {
  getAllTestsByBranch = () => axios.get(`${basic_url}/v1/admin/test/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  getAllTestsByRange = (start_date: string, end_date: string) => axios.get(`${basic_url}/v1/admin/test/allby/${branch_id}`, {
    params: {start_date: start_date, end_date: end_date}, config
  })
    .then((response) => ({
      data: response.data.data,
    }));

  getAllTestsByMonth = (selectedMonth: number) => axios.get(`${basic_url}/v1/admin/test/allbymonth/${branch_id}`, {
    params: {month: selectedMonth}, config
  })
    .then((response) => ({
      data: response.data.data,
    }));
}
