# CLI Weather and Forecast

This is a node.js command line tool that will print weather and 5-day forecast information for the user's current (or specified) location.

If the user does not provide a ZIP code as a command-line argument, then the script uses [freegeoip](https://freegeoip.net/) to determine the user's location based on their IP address. Location information is then passed to Yahoo's weather [YQL API](https://developer.yahoo.com/weather/) to determine current and future weather.

## Installation
This tool is available on [npm](https://www.npmjs.com/package/cli-weatherman). Use the -g flag to install it globally:
```
npm install -g cli-weatherman
```
## Command Line Interface

Usage:
```
weatherman [options]
```

Options:
```
-h, --help       output usage information
-V, --version    output the version number
-C, --celsius    Show temperatures in celsius
-z, --zip <zip>  Return weather for a specific zip code
```

Examples:
```
weatherman
weatherman -C
weatherman -z 90210
```
