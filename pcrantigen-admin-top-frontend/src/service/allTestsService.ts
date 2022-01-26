import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const token = cookies.get('admin2') ? cookies.get('admin2').access_token : null
const config = {headers: {Authorization: "Bearer " + token}}


export default class AllTestsService {
  // getAllTests = (pageId: number) => axios.get(`${basic_url}/v1/admin/test/all/${pageId}`, config)
  getAllTests = (pageId: number) => axios.get(`${basic_url}/v1/admin/test/all/${pageId}`)
    .then((response) => ({
      data: response.data,
    }));
}
