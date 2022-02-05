import {ref} from "vue";
// @ts-ignore
import DashboardService from '/@src/service/dashboardService';

const getDashboardData = () => {
  const dashboardService = new DashboardService();

  const dashboardData = ref([]);
  const topBranches = ref([])
  const topBranchesCount = ref(0)
  const chartSeries = ref([])

  const topBranchThree = ref({
    branch_id: 0,
    branch_name: "Pending",
    branch_contact: "Pending",
    count: "Pending",
  })
  const topBranchTwo = ref({
    branch_id: 0,
    branch_name: "Pending",
    branch_contact: "Pending",
    count: "Pending",
  })
  const topBranchOne = ref({
    branch_id: 0,
    branch_name: "Pending",
    branch_contact: "Pending",
    count: "Pending",
  })

  const searchDashboardData = () => {
    dashboardService.getDashboardData().then((result: { data: never[]; }) => {
      topBranches.value = result.data[0];
      topBranchesCount.value = topBranches.value.length;
      dashboardData.value = result.data[1];
      console.log("count", topBranchesCount.value)
      if (topBranchesCount.value === 1) {
        topBranchOne.value = topBranches.value[0]
      } else if (topBranchesCount.value === 2) {
        topBranchOne.value = topBranches.value[0]
        topBranchTwo.value = topBranches.value[1]
      } else if (topBranchesCount.value === 3) {
        topBranchOne.value = topBranches.value[0]
        topBranchTwo.value = topBranches.value[1]
        topBranchThree.value = topBranches.value[2]
      }
      // @ts-ignore
      // chartSeries.value = [result.data[1].monthly_completed_test_result_count.toString(), result.data[1].monthly_incompleted_test_result_count.toString()]
      chartSeries.value.push(result.data[1].monthly_completed_test_result_count);
      chartSeries.value.push(result.data[1].monthly_incompleted_test_result_count);
      console.log('dashboardData',chartSeries.value)

    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    searchDashboardData,
    dashboardData,
    chartSeries,
    topBranchThree,
    topBranchTwo,
    topBranchOne,
  };
};

export default getDashboardData;
