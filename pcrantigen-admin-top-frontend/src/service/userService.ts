import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
// @ts-ignore
const config = {headers: {Authorization: "Bearer " + cookies.get('admin2').access_token}}
// @ts-ignore
const branch_id = cookies.get('admin2').branch_id

export default class UserService {

  editUserProfile = (company: { company_name: string; address: string; contact_number: string; profile_url: string; }
  ) => axios.put(`${basic_url}/v1/admin/level2`, {
    company_name: company.company_name,
    address: company.address,
    contact_number: company.contact_number,
    profile_url: company.profile_url,
    branch_id: branch_id,
  }, config)
    .then((response) => ({
      data: response.data,
    }));

  editUserAccount = (user: { current_password: string; new_password: string; contact_number: string; }
  ) => axios.put(`${basic_url}/v1/admin/level2/updatePassword`, {
    current_password: user.current_password,
    new_password: user.new_password,
    contact_number: user.contact_number
  }, config)
    .then((response) => ({
      data: response.data,
    }));
}
