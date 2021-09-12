import execa from 'execa'
import { Listr } from 'listr2'
import { Distribution } from 'wsl-export/types'

export async function fetchDistributions(): Promise<{
  distros: Distribution[]
}> {
  return new Listr<{ distros: Distribution[] }>([
    {
      title: 'Fetching installed distributions',
      task: async (ctx, task) => {
        try {
          const { stdout } = await execa('wsl --list --all')
          const distros = stdout
            .replace(/(\x00|\r|)/g, '')
            .replace(/\s\(Default\)/, '')
            .split('\n')
            .slice(1, -1)
          task.title = `Found ${distros.length} distributions`
          ctx.distros = distros
        } catch (_) {
          throw new Error(
            'Could not fetch distributions. Check your WSL installation.'
          )
        }
      },
    },
  ]).run()
}
