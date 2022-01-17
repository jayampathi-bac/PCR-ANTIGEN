import {ref} from "vue";
// @ts-ignore
import ResultService from '/@src/service/resultService';

const getResults = () => {
  const results = ref([]);
  const brands = ref([]);

  const resultService = new ResultService();

  const search = () => {
    console.log("searching Results")
    resultService.getResults().then((result: { data: never[]; }) => {
      results.value = result.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const generateResult = (results: Object) => {
    console.log("generating results")
    resultService.generateResult(results).then((res: { data: never[]; }) => {
      return res
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  }

  const searchAllBrandsToResults = () => {
    console.log("searching brands")
    resultService.getBrandsByBranch().then(function (result){
      // brands.value = result.data;
      for (let brand of result.data) {
        brands.value.push({
          // @ts-ignore
          'value' : brand.id,
          // @ts-ignore
          'label' : brand.brand_name
        })
      }
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    results,
    brands,
    search,
    generateResult,
    searchAllBrandsToResults
  };
};

export default getResults;
