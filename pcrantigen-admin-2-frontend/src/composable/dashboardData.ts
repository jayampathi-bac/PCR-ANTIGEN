import {ref} from "vue";
// @ts-ignore
import DashboardService from '/@src/service/dashboardService';

const getDashboardData = () => {
  const dashboardData = ref([]);

  const dashboardService = new DashboardService();

  const totalResultData = ref([0,0,0,0,0,0,0,0,0,0,0,0])
  const completeResultData = ref([0,0,0,0,0,0,0,0,0,0,0,0])
  const inCompleteResultData = ref([0,0,0,0,0,0,0,0,0,0,0,0])
  const customerData = ref([0,0,0,0,0,0,0,0,0,0,0,0])
  const testCompletedProportion = ref([])
  const dashboardQuickStats = ref({})

  const searchDashboardData = () => {
    dashboardService.getDashboardData().then((result: { data: never[]; }) => {
      dashboardData.value = result.data;
      // console.log("dashboardData", dashboardData.value[3])
      let x = dashboardData.value[0]
      let y = dashboardData.value[2]
      testCompletedProportion.value.push(dashboardData.value[1])
      dashboardQuickStats.value =dashboardData.value[3]
      // console.log('testCompletedProportion', dashboardData.value[1])
      x.map((item) => {

        for (let i = 1; i <= 12; i++) {
          if (item.month === i) {
            // console.log("item", item.month);
            setData(item.total_count, item.complete_count, item.incomplete_count, i)
          }
        }
        // console.log("series x", series.value)
      })
      y.map((item) => {
        for (let i = 1; i <= 12; i++) {
          if (item.month === i) {
            customerData.value[i-1] = item.count;
          }
        }
        // console.log("series y", series.value)
      })
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const setData = (total: number, completed: number, uncompleted: number, index: number) => {
    totalResultData.value[index-1] = total
    completeResultData.value[index-1] = completed
    inCompleteResultData.value[index-1] = uncompleted
  }

  const series = ref([
    {
      name: '全て',
      data: totalResultData.value,
    },
    {
      name: '完成',
      data: completeResultData.value,
    },
    {
      name: '削除（未完成）',
      data: inCompleteResultData.value,
    },
  ]);

  const customerSeries = ref([
    {
      name: 'Ratio',
      data: customerData,
    },
  ]);

  return {
    searchDashboardData,
    dashboardData,
    series,
    customerSeries,
    testCompletedProportion,
    dashboardQuickStats
  };
};

export default getDashboardData;
