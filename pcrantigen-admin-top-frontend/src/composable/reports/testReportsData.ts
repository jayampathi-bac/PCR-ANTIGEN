import {ref} from "vue";
// @ts-ignore
import TestReportsService from '/@src/service/reports/testReportsService';
import CustomerReportsService from '/@src/service/reports/customerReportsService';

const getTestsReport = () => {
  const tests = ref([]);
  const allTestsCount = ref(0);
  const allBranches = ref([]);
  const branchesFromGroup = ref([]);


  const testReportsService = new TestReportsService();
  const customerReportsService = new CustomerReportsService();


  const searchTests = (pageId: number, searchData: {result: number,status: number, start_date: string, end_date: string, branch_id: number, group_id: number}) => {
    console.log("searchTests")
    testReportsService.getTestsNormal(pageId, searchData).then((result: { data: any; }) => {
      tests.value = result.data.data;
      allTestsCount.value = result.data.meta;
      // console.log("allTestsCount",result.data.meta)
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const searchAllBranches = () => {
    console.log("searchBranches")
    customerReportsService.getAllBranches().then((result: { data: any; }) => {
      // console.log("searchBranches",result.data.data)
      allBranches.value = result.data.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const loadBranchesFromGroup = (group_id: number) => {
    console.log("loadBranchesFromGroup")
    testReportsService.getBranchesFromGroup(group_id).then((result: { data: any; }) => {
      // console.log("getBranchesFromGroup",result.data.data)
      // branchesFromGroup.value = result.data.data;
      allBranches.value = result.data.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    tests,
    allTestsCount,
    allBranches,
    branchesFromGroup,
    searchTests,
    searchAllBranches,
    loadBranchesFromGroup,
  };
};

export default getTestsReport;
