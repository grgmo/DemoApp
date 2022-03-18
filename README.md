# DemoApp

## Getting started

To get started, follow the React Native official [`Setting up the development environment`](https://reactnative.dev/docs/environment-setup#development-os) to install all dependencies for Android and iOS.

## Development

To get started with the project, run `yarn` in the root directory to install the required dependencies:

```
yarn
```

To start the packager:

```
yarn start
```

To run the DemoApp app on Android:

```
yarn android
```

To run the DemoApp app on iOS:

```
yarn ios
```

To run unit tests:

```
yarn test
```

To run TypeScript and ESLint checks:

```
yarn typecheck
yarn lint
```

To fix lint errors:

```
yarn lint --fix
```

## E2E

Install Detox globally

```
npm install -g detox-cli
```

Install utils for Apple simulators

```
brew tap wix/brew
brew install applesimutils
```

Make sure to build the app first for Android and iOS

```
yarn build:ios
```

```
yarn build:android
```

Run tests with

```
yarn e2e:ios
```

```
yarn e2e:android
```

## Improvements

1. use fastlane to build apps and manage signing certificates
2. have multiple .env configs e.g. .env.e2e so that E2E can be tested on E2E environment only, possibly using mock server
3. have multiple iOS scheme, Android flavor so that each build can have it's own .env config
4. run E2E on Bitrise, currently just running lint, typescript and unit tests
5. improve refetching on Restaurants screen where if there is network error there is no way to refresh the page at the moment
6. add debug, release config on Detox for iOS and Android, currently it defaults to debug
7. add storybook to build UI components
