# Package Overview

With this npm package you can filter and detect bad words with simple Javascript. With massive customization possibilites you can edit this package to your liking!

# Installation

`npm i accurate-profanity-filter --save`

# Current Functions

Accurate-profanity-filter currently has 3 funtions for your needs.

Settings and configurations allow you to personalise this filter to your liking. (If options not parsed, default presets will be used.)
Sample code:
```js
const options = {
    replace: bad word, // Replacements for detected word.
    replacerepeat: false, // Determins if the replace value is repeated for every character of detected word. 
    fontrecognition: true, // Converts fonts to normal text to avoid bypass (May not support every font)
    addfilter: [], // Adds words to the filter to be detected by the advanced algorithm
    removefilter: [], // Removes words to the filter to be detected by the advanced algorithm
}

const string = "Hello asshole"
const result - APF.filter(string, options)

console.log(result)
//Output: Hello badword
```

.filter() has two arguments, the string and optionally the configurations, it returns the string with censored words.
Sample code:
```js
const string = "Hello asshole"
const result - APF.filter(string)

console.log(result)
//Output: Hello #######
```

.test() has two arguments, the string and optionally the configurations, it returns a boolean value depending if the string has profanity or not.
Sample code:
```js
const string = "Hello asshole"
const result - APF.test(string)

console.log(result)
//Output: true
```

String.prototype.clean() has two arguments, the string and optionally the configurations, it returns the string with censored words.
Sample code:
```js
const string = "Hello asshole"
const result - string.clean()

console.log(result)
//Output: Hello #######
```