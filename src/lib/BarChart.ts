import colors from 'colors';

const square: string = '█';

function BarChartGenerate(num1: number, num2: number, label1: string, label2: string, width: number): string[] {
  let blocks
  if (num1 > 0 || num2 > 0) {
    const isNum1Large: boolean = (num1 > num2);
    let compare: number = isNum1Large
      ? num2 / num1 * 100 - 100
      : num1 / num2 * 100 - 100;

    compare = Math.round(compare / 10);
    if (compare <= -10) compare = 9;
    compare = Math.abs(compare);

    if (num1 === 0 || num2 === 0) {
      compare = 10;
    }

    const base: string = square.repeat(width);

    blocks = {
      num1: isNum1Large
        ? Array(10).fill(base)
        : Array(10 - compare).fill(base),
      num2: isNum1Large
        ? Array(10 - compare).fill(base)
        : Array(10).fill(base)
    }

  } else {
    const base: string = ' '.repeat(width);

    blocks = {
      num1: Array(10).fill(base),
      num2: Array(10).fill(base)
    }
  }

  let r: string[] = [];
  const max: number = Math.max(blocks.num1.length, blocks.num2.length);
  for (let i = 0; i < max; i++) {
    const num1 = i > blocks.num1.length - 1
      ? ' '.repeat(width)
      : blocks.num1[i];
    const num2 = i > blocks.num2.length - 1
      ? ' '.repeat(width)
      : blocks.num2[i];

    r.push(`${num1}  ${num2}`);
  }

  function padBoth(s: string, width: number): string {
    const diff: number = width - s.length;
    if (diff <= 0) return s;

    s = ' '.repeat(Math.floor(diff / 2)) + s;
    s = s + ' '.repeat(Math.ceil(diff / 2));

    return s;
  }

  function paintCompare(s: string) {
    return s.indexOf('-') > -1 ? colors.magenta(s) : colors.green(s);
  }
  const resultCompare = {
    num1: num1 > 1
      ? num2 > 0 ? Math.round(num1 / num2 * 100 - 100) : 100
      : 0,
    num2: num2 > 1
      ? num1 > 0 ? Math.round(num2 / num1 * 100 - 100) : 100
      : 0
  }
  const resultCompareString = {
    num1: paintCompare(padBoth(`(${resultCompare.num1}%)`, width)),
    num2: paintCompare(padBoth(`(${resultCompare.num2}%)`, width))
  }
  return [
    `${padBoth(`${num1}`, width)}  ${padBoth(`${num2}`, width)}`,
    ...r.reverse(),
    `${padBoth(`${label1}`, width)}  ${padBoth(`${label2}`, width)}`,
    `${resultCompareString.num1}  ${resultCompareString.num2}`
  ]
}

export default BarChartGenerate;
