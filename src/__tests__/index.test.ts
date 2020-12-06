import path from 'path'
import { promises as fs } from 'fs'
const snowpackPluginAdoc = require('../index.ts')
import MockDate from 'mockdate'

MockDate.set(1482363367071)

describe('snowpack-plugin-asciidoctor', () => {
  it('should compile .adoc files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.adoc')
    const plugin = snowpackPluginAdoc({}, {})
    const result = await plugin.load({ filePath })
    expect(result).toMatchSnapshot()
  })

  it('should add asciidoctor attributes', async () => {
    const filePath = path.join(__dirname, '__fixtures__/a-post.adoc')
    const plugin = snowpackPluginAdoc(
      {},
      {
        authorinitials: 'CMS',
        copyright: 'Carlos MS 2020',
        toclevels: 5,
      },
    )
    const result = await plugin.load({ filePath })
    expect(result).toMatchSnapshot()
  })
})
