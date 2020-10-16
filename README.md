# react-native-bundle-loader

Allows to load remote bundle via http URL.
Useful for testing a metro bundler running remotely.

## Installation

```sh
yarn add react-native-bundle-loader
```

## Usage

```js
import BundleLoader from "react-native-bundle-loader";

// ...

BundleLoader.load('http://some-remote-url/ios.bundle.js');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
