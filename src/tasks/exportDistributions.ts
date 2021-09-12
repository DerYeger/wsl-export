import execa from 'execa'
import { Listr, ListrTask } from 'listr2'
import { Directory, Distribution } from 'wsl-export/types'

function createExportTask(dir: Directory, distro: Distribution): ListrTask {
  return {
    title: distro,
    task: async (_, task) => {
      try {
        task.output = 'This may take a while'
        await execa(`wsl --export ${distro} ${dir}\\${distro}.tar`)
      } catch (e: any) {
        throw new Error(`Something went wrong while exporting ${distro}.`)
      }
    },
  }
}

export async function exportDistributions(
  dir: Directory,
  distros: Distribution[]
): Promise<void> {
  return new Listr([
    {
      title: 'Export',
      task: (_, task): Listr =>
        task.newListr(
          distros.map((distro) => createExportTask(dir, distro)),
          {
            concurrent: true,
            exitOnError: false,
          }
        ),
    },
  ]).run()
}
