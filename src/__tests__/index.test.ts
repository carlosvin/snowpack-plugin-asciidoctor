import path from 'path'
import { promises as fs } from 'fs'
const snowpackPluginAdoc = require('../index.ts')

Date.now = jest.fn(() => 1482363367071)

describe('snowpack-plugin-asciidoctor', () => {
  it('should compile .adoc files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.adoc')
    const plugin = snowpackPluginAdoc({}, {})
    const result = await plugin.load({ filePath })
    expect(result).toMatchSnapshot()
  })

  it('should include files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/a-post.adoc')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginAdoc(
      {},
      {
        include: ['**/*.adoc'],
      },
    )
    const result = await plugin.load({ contents, filePath })
    expect(result).not.toBeNull()
    expect(result).toMatchSnapshot()
  })
})
