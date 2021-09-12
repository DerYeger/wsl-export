#!/usr/bin/env node

import chalk from 'chalk'
import { Command, OptionValues } from 'commander'
import { clear } from 'console'
import figlet from 'figlet'
import { getVersion } from 'wsl-export/helpers'
import { promptDestinationInput } from 'wsl-export/prompts/destination'
import { promptDistributionSelection } from 'wsl-export/prompts/distributions'
import { exportDistributions } from 'wsl-export/tasks/exportDistributions'
import { fetchDistributions } from 'wsl-export/tasks/fetchDistributions'

export interface Options extends OptionValues {
  all: boolean
  destination?: string
  help?: boolean
}

export function parseCommand(): { options: Options } {
  const version = getVersion()

  const command = new Command()
    .version(version)
    .option('-a --all', 'Export all distributions', false)
    .option('-d --destination <destination>', 'Destination of exported files')
    .option('-h --help')

  const options = command.parse().opts<Options>()

  if (options.help) {
    command.help()
  }

  return {
    options,
  }
}

const header = chalk.blue(
  figlet.textSync('wsl-export', {
    horizontalLayout: 'fitted',
  })
)

async function main() {
  clear()

  console.log(header)

  const { options } = parseCommand()

  const { distros } = await fetchDistributions()
  console.log()

  const { selectedDistros } = options.all
    ? { selectedDistros: distros }
    : await promptDistributionSelection(distros)

  if (selectedDistros.length === 0) {
    console.log('No distribution selected.')
    return
  }

  const { destination } = await promptDestinationInput()

  console.log()
  await exportDistributions(destination, selectedDistros)
}

main().catch(console.error)
