# Useful libraries / Docs

- https://github.com/mtford90/react-native-watch-connectivity
- https://github.com/react-native-sensors/react-native-sensors
- https://github.com/pwmckenna/react-native-motion-manager
- https://developer.apple.com/documentation/coremotion/cmmotionmanager

# Project Setup

- Download the [Facebook iOS SDKs](https://developers.facebook.com/docs/ios/) and place them in your documents folder at: `~/Documents/FacebookSDK` (the `react-native-fbsdk` npm library references those frameworks at that specific location, otherwise the project won't build properly).
- Run `npm i` to install all project dependencies

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
