import path from 'path'
import { promises as fs } from 'fs'
const snowpackPluginAdoc = require('../index.ts')

describe('snowpack-plugin-asciidoctor', () => {
  it('should compile .adoc files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.adoc')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginAdoc({}, {})
    const result = await plugin.load({ contents, filePath })
    expect(result.html).toMatchSnapshot('html')
    /* TODO remove those properties
    expect(result.meta).toMatchSnapshot({
      localdate: expect.any(String),
      localdatetime: expect.any(String),
      localtime: expect.any(String),
      localyear: expect.any(String),
    })*/
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
    expect(result.html).toMatchSnapshot('include')
  })
})
