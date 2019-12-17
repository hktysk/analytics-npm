import blessed from 'blessed'
import contrib from 'blessed-contrib'

/* grid.set() returns any type */
export interface Frames {
  packages: any
  lineChart: any
}

const max = 20;
const packages = 8;
const height = 10;
const bar = 4;
const barHeight = 10;

export default class Main implements Frames {

  constructor(
    public screen: blessed.Widgets.Screen,
    public grid: contrib.grid
  ) {}

  packages = this.grid.set(0, 0, height, packages, blessed.list, {
    keys: true,
    //mouse: true,
    parent: this.screen,
    scrollable: true,
    alwaysScroll: true,
    label: 'PACKAGE',
    width: '48%',
    height: '100%',
    selectedFg: 'black',
    selectedBg: 'white',
    align: 'left',
    //interactive: false,
    border: { type: 'line' },
    style: {
      fg: 'white',
      bg: 234,
      border: {
        fg: 'cyan',
        bg: 234
      },
      label: {
        bg: 234
      }
    },
    noCellBorders: true,
    tags: true, // 色付けする場合は必須,
    wrap: false,
    vi: true,
    search: true
  })

  YoY = blessed.text({
    keys: true,
    //mouse: true,
    parent: this.screen,
    label: 'YoY',
    top: '0',
    left: '40%',
    width: '21%',
    height: '50%',
    border: { type: 'line' },
    style: {
      fg: 'white',
      bg: 234,
      border: {
        fg: 'cyan',
        bg: 234
      },
      label: {
        bg: 234
      }
    },
    tags: true, // 色付けする場合は必須,
  })

  MoM = blessed.text({
    keys: true,
    //mouse: true,
    parent: this.screen,
    label: 'MoM',
    top: '0',
    left: '60%',
    width: '21%',
    height: '50%',
    border: { type: 'line' },
    style: {
      fg: 'white',
      bg: 234,
      border: {
        fg: 'cyan',
        bg: 234
      },
      label: {
        bg: 234
      }
    },
    tags: true, // 色付けする場合は必須,
  })

  DoD = blessed.text({
    keys: true,
    //mouse: true,
    parent: this.screen,
    label: 'DoD',
    top: '0',
    left: '80.5%',
    width: '20%',
    height: '50%',
    border: { type: 'line' },
    style: {
      fg: 'white',
      bg: 234,
      border: {
        fg: 'cyan',
        bg: 234
      },
      label: {
        bg: 234
      }
    },
    tags: true, // 色付けする場合は必須,
  })

  lineChart = this.grid.set(height, 0, height, max, contrib.line, {
    keys: true,
    parent: this.screen,
    scrollable: true,
    alwaysScroll: true,
    width: '48%',
    height: '100%',
    style: {
      line: "cyan",
      text: 'cyan',
      baseline: 'black',
      fg: 'white',
      bg: 234,
      border: {
        fg: 'cyan',
        bg: 234
      },
      label: {
        bg: 234
      }
    },
    xLabelPadding: 1,
    xPadding: 2,
    showLegend: true,
    wholeNumbersOnly: false,
  })
}
