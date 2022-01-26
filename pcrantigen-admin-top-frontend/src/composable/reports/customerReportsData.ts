import {ref} from "vue";
// @ts-ignore
import CustomerReportsService from '/@src/service/reports/customerReportsService';

const getCustomersReport = () => {
  const customers = ref([]);
  const allCustomerCount = ref(0);
  const allBranches = ref([]);


  const customerReportsService = new CustomerReportsService();

  const searchCustomers = (pageId: number, searchData: {branch_id: string, start_date: any, end_date: any}) => {
    console.log("searching customers")
    customerReportsService.getCustomersNormal(pageId, searchData).then((result: { data: any; }) => {
      customers.value = result.data.data;
      allCustomerCount.value = result.data.meta;
      console.log("customers count",result.data.meta)
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const searchBranches = () => {
    console.log("searchBranches")
    customerReportsService.getAllBranches().then((result: { data: any; }) => {
      // console.log("searchBranches",result.data.data)
      allBranches.value = result.data.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };



  return {
    searchCustomers,
    searchBranches,
    customers,
    allBranches,
    allCustomerCount
  };
};

export default getCustomersReport;
