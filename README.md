# Browser Automation Chrome Extension

Chrome extension to inject scripts, primarily meant for developers to automate their daily browser tasks.

## How to use

1. write an IIFE script ([what is this?](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)) in the src/public/scripts directory
2. write config.json in the src/public/scripts directory to specify the path and name of the automation script
3. Build the extension to use it in Chrome

## Build extension

1. run `npm run build-extension`
2. Go to `chrome://extensions/` and tick developer mode on
3. Click on "Load unpacked" and select the "dist" folder that is generated after the build process

## Example image of this chrome extension

<img width="321" alt="image" src="https://user-images.githubusercontent.com/45056907/221852604-ccf56883-6895-4197-829b-e26fb8c60ee9.png">
