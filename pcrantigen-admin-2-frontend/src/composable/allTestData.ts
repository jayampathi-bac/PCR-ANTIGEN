import {ref} from "vue";
// @ts-ignore
import AllTestsService from '/@src/service/allTestsService';

const getAllTests = () => {
  const allTests = ref([]);
  const allTestsByRange = ref([]);
  const totalTests = ref(0);


  const allTestsService = new AllTestsService();

  const searchAllTests = (pageId: number) => {
    console.log("searching Results")
    allTestsService.getAllTestsByBranch(pageId).then((result: { data: never[]; }) => {
      allTests.value = result.data.data;
      // console.log("meta",result.data.meta)
      totalTests.value = result.data.meta;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const searchAllTestsByRange = (start_date: string,end_date: string) => {
    console.log("searching Results by range")
    allTestsService.getAllTestsByRange(start_date, end_date).then((result: { data: never[]; }) => {
      allTests.value = result.data.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const searchAllTestsByMonth = (selectedMonth: number) => {
    console.log("searching Results by selectedMonth")
    allTestsService.getAllTestsByMonth(selectedMonth).then((result: { data: never[]; }) => {
      allTests.value = result.data.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    allTests,
    allTestsByRange,
    searchAllTests,
    searchAllTestsByRange,
    searchAllTestsByMonth,
    totalTests,
  };
};

export default getAllTests;
