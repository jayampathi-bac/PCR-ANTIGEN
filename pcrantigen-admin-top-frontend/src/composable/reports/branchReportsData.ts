import {ref} from "vue";
// @ts-ignore
import BranchReportsService from '/@src/service/reports/branchReportsService';

const getBranchesReport = () => {
  const branches = ref([]);
  const allBranchesCount = ref(0);
  const allGroups = ref([]);


  const branchReportsService = new BranchReportsService();

  const searchBranches = (pageId: number, searchData: {group_id: number, orderby: number}) => {
    console.log("searching customers")
    branchReportsService.getBranchesNormal(pageId, searchData).then((result: { data: any; }) => {
      branches.value = result.data.data;
      allBranchesCount.value = result.data.meta;
      console.log("allBranchesCount",result.data.meta)
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const searchGroupsToBranch = () => {
    console.log("searchGroups")
    branchReportsService.getAllGroups().then((result: { data: any; }) => {
      console.log("searchGroups",result.data.data)
      allGroups.value = result.data.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };



  return {
    searchBranches,
    searchGroupsToBranch,
    branches,
    allGroups,
    allBranchesCount
  };
};

export default getBranchesReport;
