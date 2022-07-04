# FlashListTV

The brand new [@shopify/flash-list](https://github.com/Shopify/flash-list) high performance list component can be used on TV as well as on phones!

## Quick start:

- Clone this repo
- Change to the repo directory and do

```sh
yarn
npx pod-install
```

- Run the sample:

```sh
yarn ios # to run on iPhone simulator
yarn tvos # to run on Apple TV simulator
yarn android # to run on Android phone or TV emulator
```

## Notes:

- Requires latest react-native-tvos for support of Apple TV and Android TV
- Applies a one line patch to the flash-list podspec to allow Apple TV support
- The app is the same as the sample app provided in the flash-list repo, except
  - No lists performance profiler with Flipper
  - Small navigation changes to support TV (e.g. useBackNavigation hook)
  - Light and dark theming added
