import path from 'path'
import { promises as fs } from 'fs'
const snowpackPluginAdoc = require('../index.ts')

describe('snowpack-plugin-asciidoctor', () => {
  it('should compile .adoc files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.adoc')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginAdoc({}, {})
    const result = await plugin.load({ contents, filePath })
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should include files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.adoc')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginAdoc(
      {},
      {
        include: ['**/*.adoc'],
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).not.toBeNull()
  })

  it('should exclude files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.adoc')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginAdoc(
      {},
      {
        exclude: ['**/*.adoc'],
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).toBeNull()
  })

  it('should ignore files not explicitly included', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.adoc')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginAdoc(
      {},
      {
        include: ['**/*.adoc'],
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).toBeNull()
  }) 
})