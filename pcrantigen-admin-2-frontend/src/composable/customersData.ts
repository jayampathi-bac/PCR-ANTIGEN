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
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };
  const saveCustomer = (customer: { profile_url: string; password: string; email: string; contact_number: string; name: string; }) => {
    console.log("searching customers")
    customerService.postCustomer(customer)
      .then(function a(response) {
      console.log('response',response)
    })
      .catch(function (error) {
        console.log(error);
      });
  };


  return {
    saveCustomer,
    search,
    customers,
    allCustomerCount
  };
};

export default getCustomers;
