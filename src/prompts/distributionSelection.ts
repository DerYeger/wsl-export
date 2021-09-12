import inquirer from 'inquirer'
import { Distribution } from 'wsl-export/types'

export async function promptDistributionSelection(
  distros: Distribution[]
): Promise<{ selection: Distribution[] }> {
  return inquirer.prompt({
    type: 'checkbox',
    message: 'Select distributions to export:',
    name: 'selection',
    choices: distros,
  })
}
