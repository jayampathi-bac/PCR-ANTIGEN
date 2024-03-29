import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

// @ts-ignore
const token = cookies.get('admintop') ? cookies.get('admintop').access_token : null

const config = {headers: {Authorization: "Bearer " + token}}

export default class InvoiceService {


  generateBranchInvoice = (invoiceData: { branch_id: number; start_date: string; end_date: string; }) => axios.post(`${basic_url}/v1/invoice/pdfBranch/`, invoiceData)
    .then((response) => ({
      data: response.data,
    }));

  generateGroupInvoice = (invoiceData: { group_id: number; start_date: string; end_date: string; }) => axios.post(`${basic_url}/v1/invoice/pdfGroup/`, invoiceData)
    .then((response) => ({
      data: response.data,
    }));

}
