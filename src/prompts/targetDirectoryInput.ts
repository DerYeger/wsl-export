import inquirer from 'inquirer'
import { Directory } from 'wsl-export/types'

export function promptTargetDirectoryInput(): Promise<{
  targetDir: Directory
}> {
  return inquirer.prompt({
    type: 'input',
    message: 'Target directory:',
    name: 'targetDir',
  })
}
