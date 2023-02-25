# Browser Automation Chrome Extension

Chrome extension to inject scripts from local or through an api to the current tab on Chrome browser

## How to use

1. write an IIFE ([what is this?](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)) in the src/assets/scripts directory
2. write config.json to specify the path of the automation script and the name of the automation script
3. Build the extension to use it in Chrome

## Build extension

1. run `npm run build-extension`
2. Go to `chrome://extensions/` and tick developer mode on
3. Click on "Load unpacked" and select the "dist" folder that is generated after building

## Additional info

#### Dev mode

You are able to serve the scripts through an external server, in the "Dev settings" section.

Turn "dev mode" on and you can input an endpoint for the extension to retrieve the scripts (note: you need to create a config.json file with the same format as the examples in the source code).
