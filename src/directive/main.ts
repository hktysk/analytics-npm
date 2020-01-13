import colors from 'colors';
import Screen from '../screen'
import { Downloads } from '../types';
import BarChartGenerate, { Props as BarChartProps } from '../lib/BarChart';

export default class main {

  constructor(
    public s: Screen
  ) {}

  packages = {
    addList: (packageName: string) => {
      this.s.Main.packages.addItem(packageName);
      this.s.Main.packages.setLabel(` packages `);
      this.s.render();
    },

    updateLineChartForWeek: (week: Downloads[], lastWeek: Downloads[]) => {
      week = week.map(v => ({
        day: v.day.slice(5).replace('-', '/'),
        downloads: v.downloads
      }));
      lastWeek = lastWeek.map(v => ({
        day: v.day.slice(5).replace('-', '/'),
        downloads: v.downloads
      }));

      const days = week.map(v => v.day);
      this.s.Main.lineChart.setData([
        {
          title: 'last week',
          x: days,
          y: lastWeek.map(v => v.downloads),
          style: { line: 'cyan' }
        },
        {
          title: 'this week',
          x: days,
          y: week.map(v => v.downloads),
          style: { line: 'green' }
        },
      ]);

      this.s.render();
    },

    updateBarChart: (
      screen: any,
      latest: number,
      old: number,
      label: {latest: string, old: string}
    ) => {
      const props: BarChartProps = {
        numberToCompare: {
          latest,
          old
        },
        label,
        width: 11
      }

      let BarChart = BarChartGenerate(props);
      BarChart = BarChart.map((v, k) => {
        if (k === BarChart.length - 1) return ` ${v}`;
        return colors.cyan(` ${v}`);
      })

      screen.setContent(`\n${BarChart.join('\n')}`);
      this.s.render();
    }
  }
}
