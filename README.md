## Quick start

```bash
yarn add snowpack-plugin-ascciidoctor --dev
```

Update your snowpack config:

./snowpack.config.json

```json
{
  "plugins": [
    ...
    ["snowpack-plugin-ascciidoctor", { /* see "Plugin Options" below */ }],
    ...
  ]
}
```

./test.adoc

```adoc

= My Asciidoctor File

:myVar: 'a value for my variable'
```

./your-file.js

```js
import { doc } from './test.adoc'

console.log('Doc', doc)

// Prints (output)
{
  filePath: '/home/your/test.adoc'
  html: '<h1>My Asciidoctor File</h1>'
  metadata: {
    //  asciidoctor document attributes https://asciidoctor.org/docs/user-manual/#attribute-catalog
    // it contains also any attribute you declared in the asciidoctor file, e.g:
    myVar: 'a value for my variable'
  }
}
```

### Plugin Options

Plugin options are passed directly to the Asciidoctor.js compiler. You can find the full attribute catalog at https://asciidoctor.org/docs/user-manual/#attribute-catalog.

### Acknowledgements

- Inspired and guided by [snowpack-plugin-mdsvex](https://github.com/Studiobear/snowpack-plugin-mdsvex)

## LICENSE

[MIT](./LICENSE)
