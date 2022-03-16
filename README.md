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
