import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import path from 'path'
import { Directory, Distribution } from 'wsl-export/types'

export function getVersion(): string {
  return JSON.parse(
    readFileSync(path.join(__dirname, '..', 'package.json')).toString()
  ).version
}

export function getDistributions(): string[] {
  return execSync('wsl -l --all')
    .toString()
    .replace(/(\x00|\r|)/g, '')
    .replace(/\s\(Default\)/, '')
    .split('\n')
    .slice(1, -1)
}

export function exportDistribution(dir: Directory, distro: Distribution) {
  console.log(`\nExporting ${distro}`)
  try {
    execSync(`wsl --export ${distro} ${dir}\\${distro}.tar`).toString()
  } catch (e: any) {
    console.warn(e.stdout.toString())
  }
}
