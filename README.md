# Watchtower

> The most popular Movies and TV Shows of the day, coupled with easy access to trailers and additional content.

## Preview

![Preview](media/preview.gif)

## Development

### Pre-requisites
- [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- [React Native Package Manager](https://github.com/rnpm/rnpm)
- [Xcode](https://itunes.apple.com/app/xcode/id497799835)
- iOS 9
- A [TMDb API key](https://www.themoviedb.org/documentation/api)

### Setup
1. Clone this repository
2. `$ npm install`
3. `$ rnpm link`
4. Rename `utils/secrets.example.json` to `utils/secrets.json` and enter your own TMDb API key
5. Open `ios/Watchtower.xcodeproj` in Xcode
6. Run the app

## Production
1. Uncomment the line in `AppDelegate.m` that starts with `// jsCodeLocation = [[NSBundle`
2. Hit `cmd + <` and switch the Build Configuration to Release
3. Run the app

## License & Credits
MIT © [Daryl Chan](https://darylchan.net)

This app makes use of the following third party components -
- [react-native-safari-view](https://github.com/naoufal/react-native-safari-view)
- [react-native-youtube](https://github.com/paramaggarwal/react-native-youtube)

All rights belong to their original authors.
