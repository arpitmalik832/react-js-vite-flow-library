/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';

import icons_list from '../../../static/enums/icons_list.mjs';
import svgrConfig from '../../../svgr.config.mjs';
import { ENVS } from '../../config/index.mjs';
import { pathChecks } from '../utils/pathUtils.mjs';

const config = {
  plugins: [
    svgr({
      svgrOptions: svgrConfig,
      include: '**/*.svg',
    }),
    react({
      babel: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          '@babel/preset-env',
          [
            '@babel/preset-flow',
            {
              jsxRuntime: 'automatic',
            },
          ],
        ],
        plugins: [
          '@babel/transform-runtime',
          '@babel/plugin-syntax-import-assertions',
          'babel-plugin-syntax-hermes-parser',
        ],
      },
    }),
    compression({
      deleteOriginFile: false,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  define: {
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
  },
  esbuild: {
    drop: process.env.LIB_ENV === ENVS.PROD ? ['debugger'] : [],
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnvPlugin, autoprefixerPlugin],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    minify: [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
    sourcemap: ![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
    lib: {
      entry: [...icons_list.map(i => `src/assets/icons/${i}`)],
    },
    rollupOptions: {
      external: [/node_modules/],
      output: [
        {
          format: 'esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: `esm/[name].js`,
          chunkFileNames: `esm/[name].js`,
          assetFileNames: `esm/assets/[name].[ext]`,
          paths: id => pathChecks(id),
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: `cjs/[name].js`,
          chunkFileNames: `cjs/[name].js`,
          assetFileNames: `cjs/assets/[name].[ext]`,
          paths: id => pathChecks(id),
        },
      ],
    },
  },
};

export default config;
