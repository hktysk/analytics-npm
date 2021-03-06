import blessed from 'blessed';
import axios from 'axios';
import moment from 'moment';
import lodash from 'lodash';
import CreateScreen from '../screen';
import Directive from '../directive';
import { InformationAboutDownload, Downloads } from '../types';

/***********************************************
* this function create screen,
* and update information asynchronously
/**********************************************/

function render(packages: string[]) {
  /*******************************
  * Initial setting
  /******************************/
  const s = new CreateScreen(
    blessed.screen({
      smartCSR: true,
      title: 'giv'
    })
  );

  s.init(); // Show Main screen and hide other screens

  const directive = new Directive(s);
  directive.main.packages.addList('All');

  /********************************
  * Prepare state
  /*******************************/
  let state: {
    downlodedPackages: {
      [name: string]: {
        latest: InformationAboutDownload,
        old: InformationAboutDownload
      }
    }
  } = {
    downlodedPackages: {}
  }

  const dispatch: {
    addDownloadPackages(
      packageName: string,
      latest: InformationAboutDownload,
      old: InformationAboutDownload
    ): void
  } = {
    addDownloadPackages: (packageName, latest, old) => {
      state.downlodedPackages[packageName] = {latest, old};
    }
  }

  /*********************************
  * Function for re render
  *********************************/
  function api(range: string, packageName: string): string {
    return `https://api.npmjs.org/downloads/range/${range}/${packageName}`;
  }

  function updateDisplayInformation(
    packageName: string,
    year: string,
    lastYear: string
  ) {
    let latest: Downloads[] = [];
    let old: Downloads[] = [];

    if (packageName === 'All') {
      for (const key in state.downlodedPackages) {
        if (latest.length > 0) {
          state.downlodedPackages[key].latest.downloads.forEach((v, k) => latest[k].downloads += v.downloads);
          state.downlodedPackages[key].old.downloads.forEach((v, k) => old[k].downloads += v.downloads);
        } else {
          latest = lodash.cloneDeep(state.downlodedPackages[key].latest.downloads);
          old = lodash.cloneDeep(state.downlodedPackages[key].old.downloads);
        }
      }
    } else {
      latest = lodash.cloneDeep(state.downlodedPackages[packageName].latest.downloads);
      old = lodash.cloneDeep(state.downlodedPackages[packageName].old.downloads);
    }

    /* year */
    const latestDownloads: number = latest.map(v => v.downloads).reduce((a, b) => a + b, 0);
    const oldDownloads: number = old.map(v => v.downloads).reduce((a, b) => a + b, 0);

    directive.main.packages.updateBarChart(
      s.Main.YoY,
      latestDownloads,
      oldDownloads,
      {
        latest: year,
        old: lastYear
      }
    );

    /* month */
    const month = latest.slice(0, -2).slice(-31);
    const lastMonth = latest.slice(0, -33).slice(-31);
    const monthDownloads: number = month.map(v => v.downloads).reduce((a, b) => a + b, 0);
    const lastMonthDownloads: number = lastMonth.map(v => v.downloads).reduce((a, b) => a + b, 0);

    directive.main.packages.updateBarChart(
      s.Main.MoM,
      monthDownloads,
      lastMonthDownloads,
      {
        latest: 'latest',
        old: 'before'
      }
    );

    /* day */
    const day = latest.slice(0, -2).slice(-1);
    const lastDay = latest.slice(0, -3).slice(-1);
    const dayDownloads: number = day.map(v => v.downloads).reduce((a, b) => a + b, 0);
    const lastDayDownloads: number = lastDay.map(v => v.downloads).reduce((a, b) => a + b, 0);

    directive.main.packages.updateBarChart(
      s.Main.DoD,
      dayDownloads,
      lastDayDownloads,
      {
        latest: 'latest',
        old: 'before'
      }
    );

    /* week */
    const week = latest.slice(0, -2).slice(-7);
    const lastWeek = latest.slice(0, -9).slice(-7);

    directive.main.packages.updateLineChartForWeek(week, lastWeek);
  }

  /*********************************
  * Get information from API
  *********************************/
  const year: string = `${moment.utc().year()}`;
  const lastYear: string = `${moment.utc().year() - 1}`;
  type PInfomation = Promise<InformationAboutDownload | null>;

  function getInformation(year: string, packageName: string): PInfomation {
    return new Promise<InformationAboutDownload | null>(async resolve => {
      const r = await axios.get(api(`${year}-01-01:${year}-12-31`, packageName));
      return resolve(r ? r.data : null);
    }).catch(_ => null);
  }

  packages.forEach(v => {
    const promises: PInfomation[] = [
      getInformation(year, v),
      getInformation(lastYear, v)
    ];

    Promise.all(promises).then(r => {
      if (!r?.[0] || !r?.[1]) return;
      dispatch.addDownloadPackages(v, r[0], r[1]);
      directive.main.packages.addList(v);
      updateDisplayInformation('All', year, lastYear);
    });
  });

  /*****************************
  * Events
  /****************************/

  /* Main screen events */
  s.Main.packages.key('d', () => s.Main.packages.scroll(10));
  s.Main.packages.key('u', () => s.Main.packages.scroll(-10));
  s.Main.packages.key('g', () => s.Main.packages.resetScroll());

  s.Main.packages.on('select item', function(this: any) {
    const packageName: string = s.Main.packages.getItem(this.selected).content;
    updateDisplayInformation(packageName, year, lastYear);
  });

  /* Exit */
  s.key(['escape', 'q', 'C-[', 'C-c'], () => process.exit(0));
}

export default render;
