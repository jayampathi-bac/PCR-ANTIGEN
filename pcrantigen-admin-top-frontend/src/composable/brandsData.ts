import {ref} from "vue";
// @ts-ignore
import BrandService from '/@src/service/brandService';

const getBrands = () => {
  const brands = ref([]);
  const allBrandsCount = ref(0);

  const brandService = new BrandService();

  const searchAllBrands = (pageId: number) => {
    console.log("searching brands")
    brandService.getBrandsByBranch(pageId).then((result: { data: any; }) => {
      brands.value = result.data.data;
      allBrandsCount.value = result.data.meta;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    searchAllBrands,
    brands,
    allBrandsCount
  };
};

export default getBrands;
