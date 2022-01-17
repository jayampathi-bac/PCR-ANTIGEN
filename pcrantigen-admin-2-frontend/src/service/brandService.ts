import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
// @ts-ignore
const branch_id = cookies.get('admin2').branch_id

export default class BrandService {
  getBrands = () => axios.get(`${basic_url}/v1/admin/testkit/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  getBrandsByBranch = () => axios.get(`${basic_url}/v1/admin/testkit/all/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

  saveBrand = (brand: { brand_name: string; branch_id: string; description: string; brand_company_name: string; }
  ) => axios.post(`${basic_url}/v1/admin/testkit/`, {
    brand_name: brand.brand_name,
    brand_company_name: brand.brand_company_name,
    branch_id: brand.branch_id,
    description: brand.description,
  }, config).then((response) => ({
    data: response.data,
  }));

  editBrand = (brand: { brand_name: string; branch_id: string; description: string; brand_company_name: string; }
  ) => axios.put(`${basic_url}/v1/admin/testkit/`, {
    brand_name: brand.brand_name,
    brand_company_name: brand.brand_company_name,
    branch_id: brand.branch_id,
    description: brand.description,
  }, config).then((response) => ({
    data: response.data,
  }));

  deleteBrand = (testkit_id: string) => axios.delete(`${basic_url}/v1/admin/testkit/${testkit_id}/${branch_id}`, config)
    .then((response) => ({
      data: response.data.data,
    }));

}
