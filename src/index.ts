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
import { Directory, Distribution } from 'wsl-export/types'

interface Arguments {
  targetDir: Directory | undefined
  distros: Distribution[] | undefined
}

export interface Options extends OptionValues {
  help?: boolean
}

async function main(args: Arguments, options: Options, command: Command) {
  clear()
  const header = chalk.blue(
    figlet.textSync('wsl-export', {
      horizontalLayout: 'fitted',
    })
  )
  console.log(header)

  if (options.help) {
    command.help()
  }

  const { distros } = await fetchDistributions()

  const selectedDistros: Distribution[] = []
  if (options.all) {
    selectedDistros.push(...distros)
  } else if (args.distros !== undefined && args.distros.length > 0) {
    selectedDistros.push(...args.distros)
  } else {
    const { selection } = await promptDistributionSelection(distros)
    selectedDistros.push(...selection)
  }

  if (selectedDistros.length === 0) {
    console.log('No distributions selected')
    return
  }

  const targetDir: string =
    args.targetDir !== undefined
      ? args.targetDir!!
      : (await promptTargetDirectoryInput()).targetDir

  await checkTargetDirectory(targetDir)

  await exportDistributions(targetDir, selectedDistros, distros)
}

new Command()
  .version(getVersion())
  .name('wsle')
  .argument('[target-directory]', 'directory of exported files')
  .argument('[distributions...]', 'distributions to export')
  .option('-a --all', 'export all distributions', false)
  .option('-h --help')
  .action(
    (
      targetDir: string | undefined,
      distros: Distribution[] | undefined,
      options: Options,
      command
    ) => main({ targetDir, distros }, options, command).catch(() => {})
  )
  .parse()
