import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { readFileSync } from 'fs'

const meta = readFileSync('src/meta.ts', 'utf8')
const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const banner = meta
  .match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/)?.[0]
  ?.replace('{{version}}', pkg.version)

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/WME-E85.user.js',
    format: 'iife',
    banner,
    sourcemap: false,
  },
  plugins: [
    postcss({
      inject: false,
    }),
    typescript(),
  ],
}
