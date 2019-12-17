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

export default class Main implements Frames {

  constructor(
    public screen: blessed.Widgets.Screen,
    public grid: contrib.grid
  ) {}

  packages = this.grid.set(0, 0, height, packages, blessed.list, {
    keys: true,
    parent: this.screen,
    scrollable: true,
    alwaysScroll: true,
    label: 'PACKAGE',
    width: '48%',
    height: '100%',
    selectedFg: 'black',
    selectedBg: 'white',
    align: 'left',
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
    tags: true,
    wrap: false,
    vi: true,
    search: true
  })

  YoY = blessed.text({
    keys: true,
    parent: this.screen,
    label: ' Year ',
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
    tags: true,
  })

  MoM = blessed.text({
    keys: true,
    parent: this.screen,
    label: ' 31 days ',
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
    tags: true,
  })

  DoD = blessed.text({
    keys: true,
    parent: this.screen,
    label: ' 1 day ',
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
    tags: true,
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
