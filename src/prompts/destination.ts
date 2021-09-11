import inquirer from 'inquirer'
import { Directory } from 'wsl-export/types'

export interface DestinationInput {
  destination: Directory
}

export function promptDestinationInput(): Promise<DestinationInput> {
  return inquirer.prompt({
    type: 'input',
    message: 'Target directory:',
    name: 'destination',
  })
}
