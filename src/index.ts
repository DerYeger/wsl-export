#!/usr/bin/env node

import chalk from 'chalk'
import { clear } from 'console'
import figlet from 'figlet'
import { exportDistribution } from 'wsl-export/helpers'
import { promptDestinationInput } from 'wsl-export/prompts/destination'
import { promptDistributionSelection } from 'wsl-export/prompts/distributions'

const header = chalk.blue(
  figlet.textSync('wsl-export', {
    horizontalLayout: 'fitted',
  })
)

async function main() {
  clear()

  console.log(header)

  const { distributions } = await promptDistributionSelection()
  if (distributions.length === 0) {
    console.log('No distribution selected.')
    return
  }

  const { destination } = await promptDestinationInput()
  distributions.forEach((distro) => {
    exportDistribution(destination, distro)
  })
}

main().catch(console.error)
