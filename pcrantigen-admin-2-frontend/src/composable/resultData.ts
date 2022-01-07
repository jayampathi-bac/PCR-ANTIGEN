import {ref} from "vue";
// @ts-ignore
import ResultService from '/@src/service/resultService';

const getResults = () => {
  const results = ref([]);

  const resultService = new ResultService();

  const search = (branch_id: string) => {
    console.log("searching Results")
    resultService.getResults(branch_id).then((result: { data: never[]; }) => {
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

  return {
    search,
    results,
    generateResult,
  };
};

export default getResults;
