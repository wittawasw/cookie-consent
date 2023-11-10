import * as esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import cssnano from 'cssnano';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import path from 'path';

await esbuild.build({
  entryPoints: ['src/js/*.js'],
  bundle: true,
  outdir: 'build',
  minify: true,
  minifyIdentifiers: true,
  treeShaking: true,
  plugins: [
    sassPlugin({
      type: "style",
      async transform(source, resolveDir) {
        const { css } = await postcss([cssnano, postcssPresetEnv({ stage: 0 })]).process(source, {
          from: path.join(resolveDir, 'styles.scss'),
        });
        return css
      }
    })
  ],
  define: {
    'process.env.GTAG': `"${process.env.GTAG}"`,
    'process.env.PRIVACY_POLICY_URL': `"${process.env.PRIVACY_POLICY_URL}"`
  }
})
