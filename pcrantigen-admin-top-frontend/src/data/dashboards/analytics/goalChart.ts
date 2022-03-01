import { themeColors } from '/@src/utils/themeColors'

export const gaugeOptions = {
  series: [100, 50],
  chart: {
    height: 220,
    type: 'radialBar',
    offsetY: -10,
  },
  colors: [themeColors.accent, themeColors.green],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      inverseOrder: true,
      dataLabels: {
        show: true,
        name: {
          show: true,
          fontSize: '14px',
          fontWeight: 500,
          offsetY: -10,
        },
        value: {
          show: true,
          fontWeight: 600,
          color: themeColors.lightText,
          fontSize: '16px',
          offsetY: -5,
        },
        total: {
          show: true,
          fontSize: '14px',
          fontWeight: 500,
          color: themeColors.lightText,
          label: 'Percentages',
          formatter: function (w) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return ''
          }
        },
      },
      hollow: {
        margin: 15,
        size: '60%',
      },
      track: {
        strokeWidth: '100%',
      },
    },
  },

  stroke: {
    lineCap: 'round',
  },
  labels: ['検査済み', '削除'],
}
