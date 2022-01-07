import axios from 'axios';

export default class BrandService {
  getBrands = () => axios.get(`http://localhost:8080/v1/admin/testkitcontroller/all`)
    .then((response) => ({
      data: response.data.data,
    }));

  getBrandsByBranch = (branch_id: string) => axios.get(`http://localhost:8080/v1/admin/testkitcontroller/all/${branch_id}`)
    .then((response) => ({
      data: response.data.data,
    }));

  saveBrand = (brand: { brand_name: string; branch_id: string; description: string; }
  ) => axios.post(`http://localhost:8080/v1/admin/testkitcontroller`, {
    brand_name: brand.brand_name,
    branch_id: brand.branch_id,
    description: brand.description
  }).then((response) => ({
    data: response.data,
  }));

}
