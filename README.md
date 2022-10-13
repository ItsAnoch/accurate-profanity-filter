## Overview
v5.0.0 will be a complete overhual of the accurate-profanity-filter. Newer and better algorithem to improve accuracy.

- Complete Overhual
- Improved effenciey of algorithem 
- Support for different languages (Currently supported languages includes: English & Filipino)

## Installation

```
npm install accurate-profanity-filter
```

## Usage

- Basic Usage
```js
import Profanity from 'accurate-profanity-filter'

const Filter = new Profanity({ substitute: '*', addToFilter: { ENG: true, PHL: true } })
const Output = Filter.filter('f uck you!')

console.log(Output)
// Expected output: "***** you!"
```

- Custom Filter
```js
import Profanity from 'accurate-profanity-filter'

const Filter = new Profanity({ substitute: '*', addToFilter: { ENG: false, CUSTOM: ['hello', 'how'] } })
Filter.setThresh(0.85) // If your filter has a word smaller than 4 letters, then the threshold has to be set lower than 0.86
const Output = Filter.filter('hello world, how are you?')

console.log(Output)
// Expected output: "***** world,*** are you?"
```


- Profanity.setThresh() // Default `0.86`
> Changes the threshhold value. Lower the threshold the more sensative the filter, higher the threshold less sensative the threshhold. Default 0.86.
```js
// Low threshold
import Profanity from 'accurate-profanity-filter'

const Filter = new Profanity({ substitute: '*', addToFilter: { ENG: true }})
Filter.setThresh(0.2)
const Output = Filter.filter('hello world!');

console.log(Output)
// Expected Output: "************"

---------------------------------------------------

// High Threshhold
import Profanity from 'accurate-profanity-filter'

const Filter = new Profanity({ substitute: '*', addToFilter: { ENG: true }})
Filter.setThresh(1)
const Output = Filter.filter('hello world!');

console.log(Output)
// Expected Output: "hello world!"
```

- Filter.repeatSubstitute // Default `true`
> If set to false then the substitute won't repeat. If set to true the substitute will repeat.

```js
// repeatSubstitute set to false
import Profanity from 'accurate-profanity-filter'

const Filter = new Profanity({ substitute: '*', addToFilter: { ENG: true }})
Filter.repeatSubstitute  = false
const Output = Filter.filter('fuck you!');

console.log(Output)
// Expected Output: "* you!"


// repeatSubstitute set to true
import Profanity from 'accurate-profanity-filter'

const Filter = new Profanity({ substitute: '*', addToFilter: { ENG: true }})
Filter.repeatSubstitute  = true
const Output = Filter.filter('fuck you!');

console.log(Output)
// Expected Output: "**** you!"
```

## Release Notes
- v5.0.0 - Overhual of Accurate Profanity Filter
    - New algorithem
    - Faster
    - Default support for more languages
    - Open Sourced

- v5.0.1 - Bug Fixes and Patches
    - Default language options were causing problems: Fixed!
    - No additional updates!

- v5.0.2 - Additional Languages added
    - Added support for French language
    - Added support for offensive English words