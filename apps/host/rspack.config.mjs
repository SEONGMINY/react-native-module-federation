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
    // 임시적으로 true, env 설정이후 다시 설정
    incremental: true,
  },
  output: {
    uniqueName: 'poc-host',
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
        name: 'host',
        dts: false,
        remotes: {
          home: `home@http://localhost:9000/ios/mf-manifest.json`,
        },
        shared: {
          'react': {
            singleton: true,
            version: '19.0.0',
          },
          'react-native': {
            singleton: true,
            version: '0.79.5',
          }
        }
      })
  ],
};
