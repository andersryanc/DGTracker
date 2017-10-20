# Useful libraries / Docs

- https://github.com/mtford90/react-native-watch-connectivity
- https://github.com/react-native-sensors/react-native-sensors
- https://github.com/pwmckenna/react-native-motion-manager
- https://developer.apple.com/documentation/coremotion/cmmotionmanager

# Project Setup

- Download the [Facebook iOS SDKs](https://developers.facebook.com/docs/ios/) and place them in your documents folder at: `~/Documents/FacebookSDK` (the `react-native-fbsdk` npm library references those frameworks at that specific location, otherwise the project won't build properly).
- Run `npm i` to install all project dependencies
- Download [Genymotion](https://www.genymotion.com/) or other android emulator for testing

# Development

Start by installing [React-Native-Debugger](https://github.com/jhen0409/react-native-debugger) with:

```bash
brew update && brew cask install react-native-debugger
```

To ensure the project builds properly and uses the correct environment variables, use the npm scripts to build the app: `npm run dev-ios`. See the [package.json](./package.json) for a full list of available scripts.

Then to start the debugger, run:

```bash
npm run debug
```

If you want to run the debugger on your physical device (iOS) you will need to update `jsCodeLocation` in the `AppDelegate.m`. Switch out the commented line and update the IP address of your computer.

# iOS Code Signing

If you make any changes to these settings, ie. team or profiles, etc... make sure to check the "DGTrackerTests" target as well to ensure they match up.

# Android Studio Emulator

First check the name(s) of the emulators you have created with:

```bash
$ANDROID_HOME/tools/bin/avdmanager list
```

Available devices will be output first, followed by a ton of extra definitions. Scroll back to the top to see your devices. You should see somethingn like:

```
Available Android Virtual Devices:
    Name: Nexus_4_API_23
  Device: Nexus 4 (Google)
    Path: /Users/ryan/.android/avd/Nexus_4_API_23.avd
  Target: Google APIs (Google Inc.)
          Based on: Android 6.0 (Marshmallow) Tag/ABI: google_apis/x86
    Skin: nexus_4
  Sdcard: 100M
---------
    Name: Pixel_XL_API_25
  Device: pixel_xl (Google)
    Path: /Users/ryan/.android/avd/Pixel_XL_API_25.avd
  Target: Google APIs (Google Inc.)
          Based on: Android 7.1.1 (Nougat) Tag/ABI: google_apis/x86
    Skin: pixel_xl
  Sdcard: 100M
Available devices definitions:
```

Copy the name (ie. `Pixel_XL_API_25`) and use that in the following command to launch an emulator (by replacing `EMULATOR_NAME` with your device name):

```bash
# $ANDROID_HOME/tools/bin/emulator -avd EMULATOR_NAME
# in this case:
$ANDROID_HOME/tools/emulator -avd Pixel_XL_API_25
```

# Android Emulator + Google Play Services

If you run into any issues with the app saying it won't run unless you install or update google play services, follow this guide: https://medium.com/@dai_shi/installing-google-play-services-on-an-android-studio-emulator-fffceb2c28a1

I installed Platform: x86, Android: 7.1 and Variant: Pico.

# Google API Credentials

In order for the Google Maps API to work properly, you will need to update the `DGTracker Android App API Key` in the [Google Developers Console](https://console.developers.google.com/apis/credentials/) under the "DGTracker Development" and/or "DGTracker Production" projects. We restrict use for android apps based on the package name and SHA-1 certificate fingerprint. Run the following command to check your SHA-1 fingerprint and then copy and add a new line to the developer console.

```
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

# Firebase Documentation

We are currently using v3 of the [react-native-firebase](https://github.com/invertase/react-native-firebase) library so that we can take advantage of the new [Cloud Firestore](https://firebase.google.com/docs/firestore/) offered by Firebase. Both the library and the firestore are in beta but appear to be working smoothly so far. The standard react-native-firebase documentation is not as up to date as the following site (as of writing this 2017-10-11):

https://rnfirebase.io/docs/v3.0.*/firestore/reference/DocumentReference

# Troubleshooting

- Running into issues with `Maximum Call Stack Exceeded` while using hot reloading? You might double check you aren't using an import that includes the current file. Like `app/components/index.js` which loads all the components into a single export object to make importing them in other files easier. But if you try and import components into each other through that index file, it will break things.

- You may encounter issues with Tipsi-Stripe. According to [this post](https://github.com/tipsi/tipsi-stripe/issues/131) you might need to modify the Stripe imports in two of the files referenced in that included xcodeproject. Open up Xcode, run a build, click the error messages and change `#import <Stripe/Stripe.h>` to `#import "Stripe.h"`. you may also need to verify the Header Search Paths for that project as well, to ensure that the one with pods in the path has Stripe on the end of it, like: `${SRCROOT}/../../../ios/Pods/Headers/Public/Stripe` (recursive)
