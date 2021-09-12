import execa from 'execa'
import { readFileSync } from 'fs'
import path from 'path'
import { Directory, Distribution } from 'wsl-export/types'

export function getVersion(): string {
  return JSON.parse(
    readFileSync(path.join(__dirname, '..', 'package.json')).toString()
  ).version
}

export async function getDistributions(): Promise<string[]> {
  const { stdout } = await execa('wsl -l --all')
  return stdout
    .replace(/(\x00|\r|)/g, '')
    .replace(/\s\(Default\)/, '')
    .split('\n')
    .slice(1, -1)
}

export async function exportDistribution(dir: Directory, distro: Distribution) {
  console.log(`\nExporting ${distro}`)
  try {
    await execa(`wsl --export ${distro} ${dir}\\${distro}.tar`)
  } catch (e: any) {
    console.warn(e.stdout.toString())
  }
}
