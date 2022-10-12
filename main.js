// 

import compareStrings from './lib/levenshtein.js'
import { clamp, simplify, replaceAtIndex, seive } from './lib/util.js'

import eng from './data/english.js'
import phl from './data/filipino.js'

const langFilters = { 
    ENG: new seive(eng), 
    PHL: new seive(phl), 
    CUSTOM: [] 
}

function Profanity( options = { substitute: '*', addToFilter: { ENG: true, PHL: false, CUSTOM: [] }}) {
    options = { // Formats paramaters correctly
        substitute: options['substitute'] ?? '*',

        addToFilter: {
            ENG: options.addToFilter['ENG'] ? langFilters['ENG'] : [],
            PHL: options.addToFilter['PHL'] ? langFilters['PHL'] : [],
            CUSTOM: []
        } 
    }
    
    // Combines all words
    let combinedProfaneList = []
    for (let lang in options.addToFilter) {
        combinedProfaneList.push(...options.addToFilter[lang])
    }

    this.depth = 2000;  // Search depth [WARNING]: Higher the value, the slower the filter becomes. Minimum value set to 4. (Recommended to be at a high value)
    let threshhold = 0.86; // Match threshhold [FYI] Adjust these settings to change what is filtered. 0 = Everything is filter, >0.9 = Profanity is filtered.
    this.repeatSubstitute = true // If set to false the substitute will not be repeated
    //this.currentFilters = [ list, options['addToFilter'] ].flat()

    this.setThresh = (t = Number) => threshhold = t ?? 0.86

    this.commonLetters = ['u','i','g','a']; // Common letters in profanity used as an anchor when searching
    const commonLettersRegex = new RegExp(`/[${this.commonLetters.join('')}]/gd`);

    function searchFromIndex(string, index, depth, profane) { // Used to get the compress a found letter
        let currentSearch = ''
        let closestMatch = { score: threshhold, start: -1, end: -1 }
        let beforeOffset = 0, afterOffset = 0

        for (let currentDepth = 0; currentDepth < depth; currentDepth++) {
            let min = clamp(index-currentDepth, 0, string.length), max = clamp(index+currentDepth, 0, string.length) // Clamps the values 
            const beforeLetter = string.charAt(min), afterLetter = string.charAt(max) // Get the character before and after the character at the index

            if (afterLetter == string.charAt(max+1)) { continue }; // If the characters match (or repeat) they will be ignored
            currentSearch = currentSearch + afterLetter

            if (beforeLetter == string.charAt(min-1)) { continue }; // If the characters match (or repeat) they will be ignored
            currentSearch = beforeLetter + currentSearch

            const similiratiyScore = compareStrings(simplify(currentSearch), profane)

            //if (similiratiyScore > 0.85 && similiratiyScore < 1.2) console.log(simplify(currentSearch), similiratiyScore);
            if (similiratiyScore < 2 && similiratiyScore > closestMatch['score'])  {  // See if this is the highest and closest match found.
                closestMatch = { score: similiratiyScore, start: min, end: max } // Used to seperate false positives.
            } 
            
        }
        return closestMatch
    }

 
    this.filter = function(string) {
        if (!string) throw new Error('Profanity Filter missing arguement 1: String.'); // Throwing eerrors
        if (typeof string != 'string') throw new Error('Profanity Filter arguement 1 must be a string.');

        const commonLettersMatchedInString = [...string.matchAll(this.commonLettersRegex)]; // Finds all the common letters in the string
        if (!commonLettersMatchedInString) return string;

        commonLettersMatchedInString.forEach(matchedLetter => {
            const { index } = matchedLetter
            combinedProfaneList.forEach( profaneWord => {
                const depth = clamp(this.depth, 1, string.length)
                const { score, start, end } = searchFromIndex(string, index, depth, profaneWord)

                if (end == -1 || start == -1 || end == start) return;

                const sub = this.repeatSubstitute ? options.substitute.repeat(end-start+1) : options.substitute;
                string = replaceAtIndex(string, start-1, end+1, sub);
            })

        })

        return string
    }

}

export default Profanity;