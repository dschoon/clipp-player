import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import image from '@rollup/plugin-image';
import autoExternal from 'rollup-plugin-auto-external';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    postcss({
      modules: true,
    }),
    image(),
    autoExternal(),
    url(),
    babel({
      exclude: /node_modules/,
      presets: ['@babel/preset-typescript', '@babel/preset-react', '@babel/preset-env'],
    }),
    resolve({
      main: true,
    }),
    commonjs({
      include: [
        'node_modules',
        'node_modules/**',
        'node_modules/**/*',
      ],
    }),
    terser(),
  ]
}
