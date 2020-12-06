## Quick start

```bash
yarn add snowpack-plugin-ascciidoctor --dev
```

Update your snowpack config:

```js
// snowpack.config.json
{
  "plugins": [
    ...
    ["snowpack-plugin-ascciidoctor", { /* see "Plugin Options" below */ }],
    ...
  ]
}
```

### Plugin Options

Plugin options are passed directly to the Asciidoctor.js compiler. You can find the full attribute catalog at https://asciidoctor.org/docs/user-manual/#attribute-catalog.

### Acknowledgements

- Inspired and guided by [snowpack-plugin-mdsvex](https://github.com/Studiobear/snowpack-plugin-mdsvex)

## LICENSE

[MIT](./LICENSE)
