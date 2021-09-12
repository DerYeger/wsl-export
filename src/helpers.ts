import { readFileSync } from 'fs'
import path from 'path'

export function getVersion(): string {
  return JSON.parse(
    readFileSync(path.join(__dirname, '..', 'package.json')).toString()
  ).version
}
