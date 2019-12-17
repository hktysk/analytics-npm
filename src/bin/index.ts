#!usr/bin/env node

import commander from 'commander';
import cheerio from 'cheerio';
import axios from 'axios';
import colors from 'colors';
import render from './render';

/*******************************
* bin
/******************************/
commander.name('npm-download-analytics');
commander.on('--help', () => {
  console.log();
  console.log('For more information, see');
  console.log('https://github.com/hktysk/npm-download-analytics');
  console.log();
});

async function bin(argv: commander.Command) {
  if (!argv.args?.[0]) {
    console.log('please specify account name to first argument.');
    process.exit(0);
  }

  /******************************************
  * Get list for package name from npmjs
  ******************************************/
  let packages: string[] = [];
  const waitMessage: string = 'getting list for packages from npmjs...';
  console.log(colors.cyan(waitMessage));

  const account: string = argv.args[0];
  await axios.get(`https:\/\/www.npmjs.com/~${account}`)
  .then(r => {
    const $: CheerioStatic = cheerio.load(r.data);
    $('.w-80 h3').each(function(this: any) {
      packages.push(this.children[0].data);
      return this;
    });
  })
  .catch(_ => {
    const errMessage: string = `could not get packages of ${account} from npmjs.`;
    console.log(colors.magenta(errMessage));
    process.exit(0);
  });

  /***********************************
  * render
  /**********************************/
  if (packages.length === 0) {
    const noneMessage = 'There were no packages published.';
    console.log(colors.red(noneMessage));
    process.exit(0);
  }

  render(packages);
}

bin(commander.parse(process.argv));
