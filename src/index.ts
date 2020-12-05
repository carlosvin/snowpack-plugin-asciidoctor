import { SnowpackConfig } from 'snowpack'
const fs = require('fs').promises
const path = require('path')
const asciidoctor = require('@asciidoctor/core')()
const prismExtension = require('asciidoctor-prism-extension')
const highlightJsExt = require('asciidoctor-highlight.js')

asciidoctor.SyntaxHighlighter.register('prism', prismExtension)
highlightJsExt.register(asciidoctor.Extensions)

const DEFAULTS: SnowpackPluginAsciidocOptions = {
  asciidocOptions: {
    'source-highlighter': 'highlightjs-ext', // prism
    'prism-languages':
      'py,bash,json,typescript,javascript,java,go,cpp,rust,java',
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
      const fileContents = await fs.readFile(filePath)

      const opts = {
        mkdirs: true,
        base_dir: path.dirname(filePath),
        safe: 'unsafe',
        attributes: {
          ...pluginOptions.asciidocOptions,
        },
      }
      const html = asciidoctor.convert(fileContents, opts)

      return {
        filePath,
        html,
        metadata: asciidoctor.loadFile(filePath, opts).getAttributes(),
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
