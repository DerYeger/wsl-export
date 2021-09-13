<h1 align="center">wsl-export</h1>

<p align="center">
  Interactive CLI for exporting WSL distributions.
</p>

<p align="center">
  <a href="https://github.com/DerYeger/wsl-export/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/DerYeger/wsl-export/CI?label=ci&logo=github&color=#4DC71F">
  </a>
  <a href="https://www.npmjs.com/package/wsl-export">
    <img alt="NPM" src="https://img.shields.io/npm/v/wsl-export?logo=npm">
  </a>
  <a href="https://lgtm.com/projects/g/DerYeger/wsl-export">
    <img alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/github/DerYeger/wsl-export?logo=lgtm">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="MIT" src="https://img.shields.io/npm/l/wsl-export?color=%234DC71F">
  </a>
</p>

<p align="center"><img src="/docs/demo.gif?raw=true"/></p>

## Installation

```bash
# yarn
$ yarn add global wsl-export

# npm
$ npm install -g wsl-export
```

## Usage

```bash
wsle [options] [target-directory] [distributions...]
```

For help run:

```bash
wsle -h
```

### Examples

Export `Ubuntu-20.04` and `docker-desktop` to `D:\backup`:

```bash
wsle D:\backup Ubuntu-20.04 docker-desktop
```

Export all installed distributions to `D:\backup`:

```bash
wsle -a D:\backup
```

Export all installed distributions with interactive target directory prompt:

```bash
wsle -a
```

Export with interactive target directory and distribution prompt:

```bash
wsle
```

## License

[MIT](./LICENSE) - Copyright &copy; Jan Müller
