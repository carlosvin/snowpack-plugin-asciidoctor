import { SnowpackConfig } from 'snowpack'
const path = require('path')
const asciidoctor = require('@asciidoctor/core')()

const highlightJsExt = require('asciidoctor-highlight.js')
highlightJsExt.register(asciidoctor.Extensions)

const DEFAULTS: SnowpackPluginAsciidocOptions = {
  asciidocOptions: {
    'source-highlighter': 'highlightjs-ext',
  },
}

module.exports = function plugin(
  snowpackConfig: SnowpackConfig,
  pluginOptions: SnowpackPluginAsciidocOptions,
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
        attributes: {
          ...pluginOptions.asciidocOptions,
        },
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

export interface SnowpackPluginAsciidocOptions {
  /**
   * These options are passed directly to the Asciidoctor.js compiler.
   */
  asciidocOptions?: Record<string, any>
}
