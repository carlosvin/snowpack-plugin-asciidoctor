import { SnowpackConfig } from 'snowpack'
const path = require('path')
const asciidoctor = require('@asciidoctor/core')()

const highlightJsExt = require('asciidoctor-highlight.js')
highlightJsExt.register(asciidoctor.Extensions)

const DEFAULTS: AssciidoctorAttributes = {
  'source-highlighter': 'highlightjs-ext',
}

module.exports = function plugin(
  snowpackConfig: SnowpackConfig,
  pluginOptions: AssciidoctorAttributes = {},
) {
  return {
    name: 'snowpack-plugin-asciidoctor',
    resolve: {
      input: ['.adoc'],
      output: ['.js'],
    },
    async load({ filePath }: { filePath: string }) {
      const opts = {
        mkdirs: true,
        base_dir: path.dirname(filePath),
        safe: 'unsafe',
        attributes: { ...DEFAULTS, ...pluginOptions },
      }
      const doc = asciidoctor.loadFile(filePath, opts)
      return {
        '.js': {
          code: `export const doc = {
            filePath: "${filePath}",
            html: \`${doc.convert()}\`,
            metadata: ${JSON.stringify(doc.getAttributes(), null, 2)}
          };`,
        },
      }
    },
  }
}

/**
 * These options are passed directly to the Asciidoctor.js compiler.
 * The full attribute catalog: https://asciidoctor.org/docs/user-manual/#attribute-catalog
 */
export interface AssciidoctorAttributes extends Record<string, any> {}
