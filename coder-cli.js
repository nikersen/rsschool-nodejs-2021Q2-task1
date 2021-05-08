const commander = require('commander')
const chalk = require('chalk')

const { runCoderCLI } = require('./io')

const availableActions = ['encode', 'decode']

commander
  .option('-s, --shift <value>')
  .option('-i, --input <value>')
  .option('-o, --output <value>')
  .option('-a, --action <value>')
  .action((options) => {
    if (!options.shift || !options.action) {
      process.stderr.write(chalk.red('Error: Agruments "--action or -a" and "--shift or -s" required\n'))
      process.exit(200)
    }

    if (isNaN(Number(options.shift))) {
      process.stderr.write(chalk.red('Error: Shift value must be only number\n'))
      process.exit(200)
    }

    if (availableActions.indexOf(options.action) === -1) {
      process.stderr.write(chalk.red('Error: Action value may be only "encode" or "decode"\n'))
      process.exit(200)
    }

    runCoderCLI(options)
  })

commander.parse(process.argv)