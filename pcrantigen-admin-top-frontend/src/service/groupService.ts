import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

// @ts-ignore
const token = cookies.get('admintop') ? cookies.get('admintop').access_token : null

const config = {headers: {Authorization: "Bearer " + token}}

export default class GroupService {
  // getGroups = (pageId: number) => axios.get(`${basic_url}/v1/admin/group/all/${pageId}/`, config)
  getGroups = (pageId: number) => axios.get(`${basic_url}/v1/admin/group/all/${pageId}/`)
    .then((response) => ({
      data: response.data,
    }));

  saveGroup = (group: { name: string; area: string; description: string; }) => axios.post(`${basic_url}/v1/admin/group/`, {
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
