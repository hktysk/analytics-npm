import colors from 'colors';
import padBoth from './padBoth';

export type Props = {
  numberToCompare: {
    latest: number,
    old: number
  },
  label: {
    latest: string
    old: string
  },
  width: number
}

const square: string = '█';
const height = 10;
function BarChartGenerate(props: Props): string[] {
  const { numberToCompare: { latest, old }, label, width } = props;
  let barChart: string[] = [];

  /* initialize */
  let barBlock: { // Store blocks for bar chart to this.
    latest: string[]
    old: string[]
  } = {
    latest: Array(height).fill(' '.repeat(width)),
    old: Array(height).fill(' '.repeat(width))
  }

  /* Compare */
  if (latest > 0 || old > 0) {
    const isGreaterThenOld: boolean = (latest > old);
    const ratio: number = (isGreaterThenOld ? old / latest : latest / old) * 100 - 100;
    let blockCount: number = Math.round(ratio / height); // height means 100%

    if (blockCount <= -height) blockCount = height - 1;
    blockCount = Math.abs(blockCount);

    if (latest === 0 || old === 0) {
      blockCount = height;
    }

    const blocks: string = square.repeat(width);
    barBlock = {
      latest: Array(isGreaterThenOld ? height : height - blockCount).fill(blocks),
      old: Array(isGreaterThenOld ? height - blockCount : height).fill(blocks)
    }
  }

  /* place side by side two bar charts. */
  for (let i = 0; i < height; i++) {
    const latest = i < barBlock.latest.length ? barBlock.latest[i] : ' '.repeat(width);
    const old = i < barBlock.old.length ? barBlock.old[i] : ' '.repeat(width);

    barChart.push(`${latest}  ${old}`);
  }

  /* display to bar chart bottom that ratio only latest */
  function paintCompare(ratio: string) {
    return ratio.indexOf('-') > -1
      ? colors.magenta(ratio) // negative number
      : colors.green(ratio);
  }

  const ratio: number = latest > 1
    ? (old > 0 ? Math.round(latest / old * 100 - 100) : 100)
    : 0;

  return [
    `${padBoth(`${latest}`, width)}  ${padBoth(`${old}`, width)}`,
    ...barChart.reverse(),
    `${padBoth(`${label.latest}`, width)}  ${padBoth(`${label.old}`, width)}`,
    `${paintCompare(padBoth(`(${ratio}%)`, width))}`
  ];
}

export default BarChartGenerate;
