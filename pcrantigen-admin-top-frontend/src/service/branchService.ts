import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

// @ts-ignore
const token = cookies.get('admintop') ? cookies.get('admintop').access_token : null

const config = {headers: {Authorization: "Bearer " + token}}

export default class BranchService {
  // getBranches = (pageId: number) => axios.get(`${basic_url}/v1/admin/branch/all/${pageId}`, config)
  getBranches = (pageId: number) => axios.get(`${basic_url}/v1/admin/branch/all/${pageId}`)
    .then((response) => ({
      data: response.data,
    }));

  getGroups = () => axios.get(`${basic_url}/v1/admin/group/all/`)
    .then((response) => ({
      data: response.data,
    }));


  saveBranch = (branch) => axios.post(`${basic_url}/v1/admin/branch`, {
    company_name: branch.company_name,
    address: branch.address,
    contact_number: branch.contact_number,
    group_id: branch.group_id,
    username: branch.username,
    password: branch.password,
    start_date: branch.start_date,
    end_date: branch.end_date,
    start_time: branch.start_time,
    end_time: branch.end_time,
    profile_url: branch.profile_url,
  // }, config).then((response) => ({
  }).then((response) => ({
    data: response.data,
  }));

  editBranch = (branch) => axios.put(`${basic_url}/v1/admin/branch/`, {
    branch_id: branch.branch_id,
    company_name: branch.company_name,
    address: branch.address,
    contact_number: branch.contact_number,
    group_id: branch.group_id,
    start_date: branch.start_date,
    end_date: branch.end_date,
    start_time: branch.start_time,
    end_time: branch.end_time,
    profile_url: branch.profile_url,
  // }, config).then((response) => ({
  }).then((response) => ({
    data: response.data,
  }));

  // deleteBranch = (branch_id: number) => axios.delete(`${basic_url}/v1/admin/branch/${branch_id}`, config)
  deleteBranch = (branch_id: number) => axios.delete(`${basic_url}/v1/admin/branch/${branch_id}`)
    .then((response) => ({
      data: response.data,
    }));

}
