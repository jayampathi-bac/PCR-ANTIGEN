import {ref} from "vue";
// @ts-ignore
import CustomerService from '/@src/service/customerService';

const getCustomers = () => {
  const customers = ref([]);

  const customerService = new CustomerService();

  const search = () => {
    console.log("searching customers")
    customerService.getCustomers().then((result: { data: never[]; }) => {
      customers.value = result.data;
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
  };
};

export default getCustomers;
