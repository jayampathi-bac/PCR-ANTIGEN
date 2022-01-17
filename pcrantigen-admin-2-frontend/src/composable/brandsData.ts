import {ref} from "vue";
// @ts-ignore
import BrandService from '/@src/service/brandService';

const getBrands = () => {
  const brands = ref([]);

  const brandService = new BrandService();

  const searchAllBrands = () => {
    console.log("searching brands")
    brandService.getBrandsByBranch().then((result: { data: never[]; }) => {
      brands.value = result.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    searchAllBrands,
    brands
  };
};

export default getBrands;
