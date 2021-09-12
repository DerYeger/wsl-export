import chalk from 'chalk'
import execa from 'execa'
import { Listr, ListrTask } from 'listr2'
import { Directory, Distribution } from 'wsl-export/types'

function createExportTask(
  dir: Directory,
  distro: Distribution,
  availableDistros: Distribution[]
): ListrTask {
  return {
    title: distro,
    task: async (_, task) => {
      if (availableDistros.indexOf(distro) === -1) {
        throw new Error(`${chalk.red(distro)} does not exist`)
      }
      try {
        task.output = 'This may take a while'
        await execa(`wsl --export ${distro} ${dir}\\${distro}.tar`)
      } catch (e: any) {
        throw new Error(`Could not export ${chalk.red(distro)}`)
      }
    },
  }
}

export async function exportDistributions(
  dir: Directory,
  distros: Distribution[],
  availableDistros: Distribution[]
): Promise<void> {
  return new Listr(
    [
      {
        title: 'Export',
        task: (_, task) =>
          task.newListr(
            distros.map((distro) =>
              createExportTask(dir, distro, availableDistros)
            ),
            {
              concurrent: true,
              exitOnError: false,
            }
          ),
      },
    ],
    {
      rendererOptions: {
        collapse: false,
      },
    }
  ).run()
}
