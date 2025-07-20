import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default {
  context: __dirname,
  entry: './index.js',
  experiments: {
    incremental: true,
  },
  output: {
    uniqueName: 'poc-home',
  },
  resolve: {
    ...Repack.getResolveOptions(),
  },
  module: {
    rules: [
      ...Repack.getJsTransformRules(),
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'home',
        filename: 'home.container.js.bundle',
        dts: false,
        exposes: {
          './App': './App',
        },
        shared: {
          'react': {
            eager: true,
            singleton: true,
            version: '19.0.0',
          },
          'react-native': {
            eager: true,
            singleton: true,
            version: '0.79.5',
          },
        },
      })
  ],
};
