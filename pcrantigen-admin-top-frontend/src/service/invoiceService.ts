import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

// @ts-ignore
const token = cookies.get('admintop') ? cookies.get('admintop').access_token : null

const config = {headers: {Authorization: "Bearer " + token}}

export default class branchInvoiceService {


  getBranchInvoice = (invoiceData: { branch_id: number; start_date: string; end_date: string; }) => axios.post(`${basic_url}/v1/invoice/byBranch/`, {
    name: group.name,
    area: group.area,
    description: group.description,
    // }, config).then((response) => ({
  }).then((response) => ({
    data: response.data,
  }));

  editGroup = (group) => axios.put(`${basic_url}/v1/admin/group/`, {
    id: group.id,
    name: group.name,
    area: group.area,
    description: group.description,
    // }, config).then((response) => ({
  }).then((response) => ({
    data: response.data,
  }));

  // deleteGroup = (group_id: number) => axios.delete(`${basic_url}/v1/admin/group/${group_id}`, config)
  deleteGroup = (group_id: number) => axios.delete(`${basic_url}/v1/admin/group/${group_id}`)
    .then((response) => ({
      data: response.data,
    }));

}
