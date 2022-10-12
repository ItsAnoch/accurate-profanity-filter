import Profanity from './main.js'

console.time()
const Filter = new Profanity({ substitute: '*'})
Filter.repeatSubstitute  = true
const Output = Filter.filter('fuck '.repeat(5));
console.timeEnd()
