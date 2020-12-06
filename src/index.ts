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
  pluginOptions: AssciidoctorAttributes,
) {
  if (!pluginOptions || Object.keys(pluginOptions).length === 0) {
    pluginOptions = DEFAULTS
  }
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
        attributes: { ...pluginOptions },
      }
      const doc = asciidoctor.loadFile(filePath, opts)

      return {
        filePath,
        html: doc.convert(),
        metadata: doc.getAttributes(),
      }
    },
  }
}

/**
 * These options are passed directly to the Asciidoctor.js compiler.
 * The full attribute catalog: https://asciidoctor.org/docs/user-manual/#attribute-catalog
 */
export interface AssciidoctorAttributes extends Record<string, any> {}
