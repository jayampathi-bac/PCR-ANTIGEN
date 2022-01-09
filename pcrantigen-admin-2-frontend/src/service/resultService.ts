import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
const branch_id = cookies.get('admin2').branch_id

export default class ResultService {
  getResults = () => axios.get(`${basic_url}/v1/admin/test/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  generateResult = (result: Object) => axios.post(`${basic_url}/v1/admin/test`, result, config)
    .then((response) => ({
      data: response.data.data,
    }));
}
