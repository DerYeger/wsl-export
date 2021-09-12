import inquirer from 'inquirer'
import { Distribution } from 'wsl-export/types'

export interface DistributionSelection {
  selectedDistros: Distribution[]
}

export async function promptDistributionSelection(
  distros: Distribution[]
): Promise<DistributionSelection> {
  return inquirer.prompt({
    type: 'checkbox',
    message: 'Select distributions to export:',
    name: 'selectedDistros',
    choices: distros,
  })
}
