import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// // @ts-ignore
// const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
// // @ts-ignore
// const branch_id = cookies.get('admin2').branch_id

export default class DashboardService {

  getDashboardData = () => axios.get(`${basic_url}/v1/dashboard/${cookies.get('admin2').branch_id}`,
    {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}})
    .then((response) => ({
      data: response.data.data,
    }));

}
