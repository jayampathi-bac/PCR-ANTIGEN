import {ref} from "vue";
// @ts-ignore
import TestReportsService from '/@src/service/reports/testReportsService';

const getTestsReport = () => {
  const tests = ref([]);
  const allTestsCount = ref(0);


  const testReportsService = new TestReportsService();

  const searchTests = (pageId: number, searchData: {result: number,status: number, start_date: string, end_date: string, branch_id: number, group_id: number}) => {
    console.log("searchTests")
    testReportsService.getTestsNormal(pageId, searchData).then((result: { data: any; }) => {
      tests.value = result.data.data;
      allTestsCount.value = result.data.meta;
      console.log("allTestsCount",result.data.meta)
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    tests,
    allTestsCount,
    searchTests,
  };
};

export default getTestsReport;
