import execa from 'execa'
import { Listr, ListrTask } from 'listr2'
import { Directory, Distribution } from 'wsl-export/types'

export function createBackupTask(
  dir: Directory,
  distro: Distribution
): ListrTask {
  return {
    title: distro,
    task: async (_, task) => {
      try {
        task.output = 'Export started. This may take a while.'
        await execa(`wsl --export ${distro} ${dir}\\${distro}.tar`)
      } catch (e: any) {
        return Promise.reject(`Something went wrong while exporting ${distro}.`)
      }
    },
  }
}

export async function exportDistributions(
  destination: Directory,
  distros: Distribution[]
): Promise<void> {
  return new Listr(
    distros.map((distro) => createBackupTask(destination, distro)),
    {
      concurrent: true,
    }
  ).run()
}
