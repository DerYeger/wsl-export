import chalk from 'chalk'
import { Listr } from 'listr2'
import { accessDirectory } from 'wsl-export/helpers'
import { Directory } from 'wsl-export/types'

export async function checkTargetDirectory(dir: Directory): Promise<void> {
  console.log()
  return new Listr([
    {
      title: 'Checking target directory',
      task: async (_, task) => {
        try {
          await accessDirectory(dir)
          task.title = `Target directory ${chalk.cyan(dir)} exists`
        } catch (_) {
          throw new Error(`Invalid target directory ${chalk.red(dir)}`)
        }
      },
    },
  ]).run()
}
