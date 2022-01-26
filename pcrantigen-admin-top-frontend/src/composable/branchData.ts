import {ref} from "vue";
// @ts-ignore
import BranchService from '/@src/service/branchService';

const getBranches = () => {
  const branches = ref([]);
  const groups = ref([]);
  const allBranchesCount = ref(0);

  const branchService = new BranchService();

  const searchAllBranches = (pageId: number) => {
    console.log("searchAllBranches")
    branchService.getBranches(pageId).then((result) => {
      console.log("getBranches",result)
      branches.value = result.data.data;
      allBranchesCount.value = result.data.meta;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const searchAllGroupsToBranch = () => {
    console.log("searchAllGroupsToBranch")
    branchService.getGroups().then((result: { data: any; }) => {
      // groups.value = result.data.data;
      for (const group of result.data.data) {
        groups.value.push({
          // @ts-ignore
          'value' : group.id,
          // @ts-ignore
          'label' : group.name
        })
      }
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    searchAllBranches,
    searchAllGroupsToBranch,
    branches,
    allBranchesCount,
    groups
  };
};

export default getBranches;
