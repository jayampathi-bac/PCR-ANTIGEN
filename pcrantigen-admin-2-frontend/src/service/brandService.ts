import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
const branch_id = cookies.get('admin2').branch_id

export default class BrandService {
  getBrands = () => axios.get(`${basic_url}/v1/admin/testkitcontroller/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  getBrandsByBranch = () => axios.get(`${basic_url}/v1/admin/testkitcontroller/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  saveBrand = (brand: { brand_name: string; branch_id: string; description: string; }
  ) => axios.post(`${basic_url}/v1/admin/testkitcontroller/`, {
    brand_name: brand.brand_name,
    branch_id: brand.branch_id,
    description: brand.description,
  }, config).then((response) => ({
    data: response.data,
  }));

}
