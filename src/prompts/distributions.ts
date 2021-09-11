import inquirer from 'inquirer'
import { getDistributions } from 'wsl-export/helpers'
import { Distribution } from 'wsl-export/types'

export interface DistributionSelection {
  distributions: Distribution[]
}

export function promptDistributionSelection(): Promise<DistributionSelection> {
  return inquirer.prompt({
    type: 'checkbox',
    message: 'Select distributions:',
    name: 'distributions',
    choices: getDistributions(),
  })
}
