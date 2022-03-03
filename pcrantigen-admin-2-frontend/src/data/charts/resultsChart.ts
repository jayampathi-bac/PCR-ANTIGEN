import { themeColors } from '/@src/utils/themeColors'

export const resultOptions = {
  // series: [
  //   {
  //     name: 'Total',
  //     data: [31, 40, 28, 51, 42, 109, 100, 28, 51, 42, 109, 100],
  //   },
  //   {
  //     name: 'Completed',
  //     data: [11, 32, 45, 32, 34, 52, 41, 45, 32, 34, 52, 41],
  //   },
  //   {
  //     name: 'Incomplete',
  //     data: [78, 53, 36, 10, 14, 5, 2, 36, 10, 14, 5, 2],
  //   },
  // ],
  chart: {
    height: 295,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: [themeColors.accent, themeColors.info, themeColors.green],
  title: {
    text: '検査結果送信集計',
    align: 'left',
  },
  legend: {
    position: 'top',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [2, 2, 2],
    curve: 'smooth',
  },
  xaxis: {
    type: 'month',
    categories: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
}
