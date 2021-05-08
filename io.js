const fs = require('fs')
const chalk = require('chalk')
const { encode, decode } = require('./cipher')

const coder = (action, shift, input) => {
  switch (action) {
    case 'encode':
      return encode(input, shift)
    case 'decode':
      return decode(input, shift)
  }
}

const outputFunc = (result, output, callback) => {
  if (output) {
    fs.open(output, (err, file) => {
      if (err) {
        process.stderr.write(chalk.red(`Error: Output file '${output}' not found.\n`))
        process.exit(200)
      } else {
        fs.appendFile(output, result, () => {
          process.stdout.write(chalk.yellow(`\nSuccess write to '${output}':\n`))
          callback?.()
          process.stdout.write(chalk.blue('\nType text here again:\n'))
        })
      }
    })
    return
  }

  process.stdout.write(chalk.yellow('\nResult:\n'))
  process.stdout.write(`${result}\n`)
  callback?.()
  process.stdout.write(chalk.blue('Type text here again:\n'))
}

const input = ({ shift, action, input, output }) => {
  if (input) {
    fs.open(input, 'r', (err, file) => {
      if (err) {
        process.stderr.write(chalk.red(`Error: Input file '${input}' not found.\n`))
        process.exit(200)
      } else {
        fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
          const result = coder(action, shift, data)
          outputFunc(result, output, () => {
            process.exit(0)
          })
        })
      }
    })
  } else {
    process.stdout.write(chalk.blue(`Please type text here... \n`))
    process.stdin.on('data', data => {
      const result = coder(action, shift, data.toString())
      outputFunc(result, output)
    })
  }
}

module.exports = {
  runCoderCLI: input
}