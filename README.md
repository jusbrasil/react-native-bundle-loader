# react-native-bundle-loader

Allows to load remote bundle via URL.
Useful for testing a [Metro](https://github.com/facebook/metro) bundler running remotely.

## Installation

```sh
yarn add react-native-bundle-loader
```

## Usage

```js
import BundleLoader, { BundlePrompt } from 'react-native-bundle-loader';

// ...

// You can use the component to provide the remote URL:
function SomeScreen() {
  return <BundlePrompt />;
}

// Or call the `load` method explictly in your own prompt:
BundleLoader.load('https://some-remote-url/bundle.js');
```

## Accessing a running react-native packager

With `react-native-bundle-loader` you can also allow remote bundle accessing of a metro server running on a developer's machine.
Note: the app binary running on cellphone already has the react-native-bundle-loader lib installed and configured properly.


### Exposing the metro server

1. Ensure that a metro server is running on the developer machine (`yarn start`);
2. Expose the running metro server to the world. You can use any tool for generating a secure tunnel from a public endpoint to the locally running metro server like [ngrok](https://ngrok.com/):  `ngrok http 8081`
3. With `BundlePrompt` (or via `BundleLoader.load()`) pass the URL of the exposed metro server. Provide the params to the metro server:
  - `dev`: based on the mode the binary was built `true` for development or `false` for release
  - `excludeSource`: `true`
  - `platform`: `ios` or `android` (currently only iOS is supported).

Example URL: `https://example.ngrok.io/index.bundle?dev=false&platform=ios&excludeSource=true`

Every accessing to the metro server will return the updated version of the code :slightly_smiling_face:

## :warning: Disclaimer

Be careful about publishing binary versions with `react-native-bundle-loader` supporting in the stores. A malicious code could be injected to your app and affect the users. We **strictly** recommend to distribute versions with custom bundle supporting enabled only internally.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
