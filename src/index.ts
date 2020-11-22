import { SnowpackConfig } from "snowpack"
const fs = require("fs").promises
const path = require("path")
const Asciidoctor = require('asciidoctor')
const prismExtension = require('asciidoctor-prism-extension');

const DEFAULTS: SnowpackPluginAsciidocOptions = {
  langs: 'py,bash,json,typescript,javascript,java,go,cpp,rust,java'
}
module.exports = function plugin(
  snowpackConfig: SnowpackConfig,
  pluginOptions = DEFAULTS,
) {
  const adoc = Asciidoctor()
  adoc.SyntaxHighlighter.register('prism', prismExtension)
  
  return {
    name: 'snowpack-plugin-asciidoctor',
    resolve: {
      input: ['.adoc'],
      output: ['.js'],
    },
    async load({ filePath }: { filePath: string }) {
      const fileContents = await fs.readFile(filePath);

      const opts = { 
        mkdirs: true,
        base_dir: path.dirname(filePath),
        safe: 'unsafe',
        attributes: {
          // ...pluginOptions.asciidocOptions,
          'source-highlighter': 'prism',
          'prism-languages': pluginOptions.langs,
        }
      }
      const html = adoc.convert(fileContents, { 
        mkdirs: true,
        base_dir: path.dirname(filePath),
        safe: 'unsafe',
        'attributes': { 
          'source-highlighter': 'prism',
          'prism-languages': 'py,bash,json,typescript,javascript,java,go,c,clike,cpp,rust,java'
        }
      })
      // const doc = adoc.loadFile(filePath, opts)
      // console.info("DOC", doc.getAttributes())
      
      return {
        filePath,
        html,
        metadata: adoc.loadFile(filePath, opts).getAttributes()
      }
    },
  }
}

export interface SnowpackPluginAsciidocOptions {

  /**
   * These options are passed directly to the Asciidoctor.js compiler.
   */
  asciidocOptions?: Record<string, any>
  /**
   * Comma separated Prism languages
   */
  langs: string
}
