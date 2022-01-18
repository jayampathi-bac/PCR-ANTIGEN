import {ref} from "vue";
// @ts-ignore
import DashboardService from '/@src/service/dashboardService';

const getDashboardData = () => {
  const dashboardData = ref([]);

  const dashboardService = new DashboardService();

  const totalResultData = ref([])
  const completeResultData = ref([])
  const inCompleteResultData = ref([])
  const customerData = ref([])
  const testCompletedProportion = ref([])

  const searchDashboardData = () => {
    dashboardService.getDashboardData().then((result: { data: never[]; }) => {
      dashboardData.value = result.data;
      console.log("dashboardData", dashboardData.value[0])
      let x = dashboardData.value[0]
      let y = dashboardData.value[2]
      testCompletedProportion.value.push(dashboardData.value[1])
      console.log('testCompletedProportion', dashboardData.value[1])
      x.map((item) => {
        // console.log("item", item.total_count);
        for (let i = 1; i <= 12; i++) {
          if (item.month === i) {
            setData(item.total_count, item.complete_count, item.incomplete_count)
          } else {
            setData(0, 0, 0)
          }
        }
        console.log("series", series.value)
      })
      y.map((item) => {
        for (let i = 1; i <= 12; i++) {
          if (item.month === i) {
            customerData.value.push(item.count)
          } else {
            customerData.value.push(0)
          }
        }
        console.log("series", series.value)
      })
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const setData = (total: number, completed: number, uncompleted: number) => {
    totalResultData.value.push(total)
    completeResultData.value.push(completed)
    inCompleteResultData.value.push(uncompleted)
  }

  const series = ref([
    {
      name: 'Total',
      data: totalResultData.value,
    },
    {
      name: 'Completed',
      data: completeResultData.value,
    },
    {
      name: 'Incomplete',
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
    testCompletedProportion
  };
};

export default getDashboardData;
