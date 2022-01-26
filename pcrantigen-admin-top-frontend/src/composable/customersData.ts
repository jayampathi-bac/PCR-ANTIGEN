import {ref} from "vue";
// @ts-ignore
import CustomerService from '/@src/service/customerService';

const getCustomers = () => {
  const customers = ref([]);
  const allCustomerCount = ref(0);


  const customerService = new CustomerService();

  const search = (pageId: number) => {
    console.log("searching customers")
    customerService.getCustomers(pageId).then((result: { data: any; }) => {
      customers.value = result.data.data;
      allCustomerCount.value = result.data.meta;
      console.log("customers count",result.data.meta)
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };



  return {
    search,
    customers,
    allCustomerCount
  };
};

export default getCustomers;
