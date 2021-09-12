#!/usr/bin/env node

import chalk from 'chalk'
import { Command, OptionValues } from 'commander'
import { clear } from 'console'
import figlet from 'figlet'
import { getVersion } from 'wsl-export/helpers'
import { promptDistributionSelection } from 'wsl-export/prompts/distributionSelection'
import { promptTargetDirectoryInput } from 'wsl-export/prompts/targetDirectoryInput'
import { checkTargetDirectory } from 'wsl-export/tasks/checkTargetDirectory'
import { exportDistributions } from 'wsl-export/tasks/exportDistributions'
import { fetchDistributions } from 'wsl-export/tasks/fetchDistributions'

export interface Options extends OptionValues {
  all: boolean
  targetDir?: string
  help?: boolean
}

export function parseCommand(): { options: Options } {
  const version = getVersion()

  const command = new Command()
    .version(version)
    .name('wsle')
    .option('-a --all', 'export all distributions', false)
    .option(
      '-t --target-dir <target-directory>',
      'set directory of exported files'
    )
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

  const selectedDistros = options.all
    ? distros
    : (await promptDistributionSelection(distros)).selection

  if (selectedDistros.length === 0) {
    console.log('No distribution selected')
    return
  }

  const { targetDir } = await promptTargetDirectoryInput()

  console.log()
  await checkTargetDirectory(targetDir)

  console.log()
  await exportDistributions(targetDir, selectedDistros)
}

main().catch(() => {})
