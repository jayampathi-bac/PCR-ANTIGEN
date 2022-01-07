import {ref} from "vue";
// @ts-ignore
import BrandService from '/@src/service/brandService';

const getBrands = () => {
  const brands = ref([]);

  const brandService = new BrandService();

  const searchAllBrands = () => {
    console.log("searching brands")
    brandService.getBrands().then((result: { data: never[]; }) => {
      brands.value = result.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };
  // const saveCustomer = (customer: { profile_url: string; password: string; email: string; contact_number: string; name: string; }) => {
  //   console.log("searching customers")
  //   customerService.postCustomer(customer)
  //     .then(function a(response) {
  //     console.log('response',response)
  //   })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };


  return {
    searchAllBrands,
    brands
  };
};

export default getBrands;
