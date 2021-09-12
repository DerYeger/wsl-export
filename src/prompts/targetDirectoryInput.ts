import inquirer from 'inquirer'
import { Directory } from 'wsl-export/types'

export function promptTargetDirectoryInput(): Promise<{
  targetDir: Directory
}> {
  console.log()
  return inquirer.prompt({
    type: 'input',
    message: 'Target directory:',
    name: 'targetDir',
  })
}
