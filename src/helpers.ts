import fs, { readFileSync } from 'fs'
import path from 'path'
import { Directory } from 'wsl-export/types'

export function getVersion(): string {
  return JSON.parse(
    readFileSync(path.join(__dirname, '..', 'package.json')).toString()
  ).version
}

export function accessDirectory(dir: Directory): Promise<void> {
  return new Promise<void>((resolve, reject) =>
    fs.access(dir, (err) => {
      if (err) {
        reject()
      }
      resolve()
    })
  )
}
