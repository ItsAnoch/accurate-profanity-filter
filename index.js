const { censor, ignore } = require('./source.json')
const fonts = require('./fonts.json')

const defaultoptions = {
    replace: "#",
    replacerepeat: true,
    fontrecognition: true,
    addfilter: [],
    removefilter: [],
}

//Converts some fonts into normal strings
const letters = [fonts.a,fonts.b,fonts.c,fonts.d,fonts.e,fonts.f,fonts.g,fonts.h,fonts.i,fonts.j,fonts.k,fonts.l,fonts.m,fonts.n,fonts.o,fonts.p,fonts.q,fonts.r,fonts.s,fonts.t,fonts.u,fonts.v,fonts.w,fonts.x,fonts.y,fonts.z]

function convertFont () {
    let string = this
    letters.some(letter => {
        for(let i = 0; i < letter.length; i++) {
            string = string.replace(letter[i], JSON.stringify(letter).match(/[a-z]/g))
        }
    })
    return string.substring(2)
}


// Creates a custom regex for unfiltered and newly filtered words - As this isn't the main part of the bot it may be inaccurate
function getRegex(string) {
    let newregex = "";
    for(let i = 0; i < string.length; i++) {
        newregex = `${newregex}(${string[i]}+){1,5}( {1,})?`
    }
    return newregex;
}

// Creates a string of replacements to cover words.
function getReplacements(string, replacement) {
    let replacements = "";

    for(let i = 0; i < string.length; i++) {
        replacements = replacements + replacement
    }
    return replacements;
}

// Scans through the string and censors banned words
function filter(string, options = defaultoptions) {
    let customregexblacklist;
    let customregexwhitelist;
    let blacklistregex = "";
    let whitelistregex = "";
    let placeholderstring = string;
    let content = string;

    // Creates custom RegEx for custom filtered words.
    if (options.addfilter && options.addfilter.length) {
        for (let i = 0; i < options.addfilter.length; i++) {
            customregexblacklist = customregexblacklist + getRegex(options.addfilter[i]) + "|"
        }   
        customregexblacklist = customregexblacklist.slice(0, -1)
    }

    // Creates custom RegEx for custom unfiltered words.
    if (options.removefilter && options.removefilter.length) {
        for (let i = 0; i < options.removefilter.length; i++) {
            customregexwhitelist = customregexwhitelist + getRegex(options.removefilter[i]) + "|"
        }   
        customregexwhitelist = customregexwhitelist.slice(0, -1)
    }

    // Creating RegEx
    for (let i = 0; i < censor.length; i++) {
        blacklistregex = blacklistregex + censor[i] + "|";
    }
    for (let i = 0; i < ignore.length; i++) {
        whitelistregex = whitelistregex + ignore[i] + "|";
    }

    blacklistregex = new RegExp(blacklistregex.replace("|(r+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((e|a+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?(t+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((a|e+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?(r+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((d+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?", "") + customregexblacklist, "gi");
    whitelistregex = new RegExp(whitelistregex + customregexwhitelist, "gi");

    // Detecting the words
    placeholderstring = placeholderstring.toLowerCase();
    placeholderstring = placeholderstring.replace(/[^a-zA-Z ]/g, "");
    placeholderstring = placeholderstring.replace(/@/g, "a");
    placeholderstring = placeholderstring.replace(/\|_\|/g, "u");
    placeholderstring = placeholderstring.replace(/\(( {1,5}?)\)/g, "o");
    placeholderstring = placeholderstring.replace(/3/g, "e");
    placeholderstring = placeholderstring.replace(/1/g, "i");
    if (options.fontrecognition && options.fontrecognition === true) {
        placeholderstring = convertFont(placeholderstring)
    }

    placeholderstring = placeholderstring.match(blacklistregex)

    if (placeholderstring) {
        for (let i = 0; i < placeholderstring.length; i++) {
            if (!placeholderstring[i].match(whitelistregex)) {
                const hashes = (options.replace && options.replacerepeat && options.replacerepeat === true) ? getReplacements(placeholderstring[i], options.replace) : ((options.replace) ? options.replace : defaultoptions.replace)

                content = content.toLowerCase().replace(placeholderstring[i], hashes);
            }
        }
    }
    return content;
}


// Returns a boolean value if a word contains a filtered word 
function test(string, options = defaultoptions) {
    let value = false;
    let customregexblacklist;
    let customregexwhitelist;
    let blacklistregex = "";
    let whitelistregex = "";
    let placeholderstring = string;

    // Creates custom RegEx for custom filtered words.
    if (options.addfilter && options.addfilter.length) {
        for (let i = 0; i < options.addfilter.length; i++) {
            customregexblacklist = customregexblacklist + getRegex(options.addfilter[i]) + "|"
        }   
        customregexblacklist = customregexblacklist.slice(0, -1)
    }

    // Creates custom RegEx for custom unfiltered words.
    if (options.removefilter && options.removefilter.length) {
        for (let i = 0; i < options.removefilter.length; i++) {
            customregexwhitelist = customregexwhitelist + getRegex(options.removefilter[i]) + "|"
        }   
        customregexwhitelist = customregexwhitelist.slice(0, -1)
    }

    // Creating RegEx
    for (let i = 0; i < censor.length; i++) {
        blacklistregex = blacklistregex + censor[i] + "|";
    }
    for (let i = 0; i < ignore.length; i++) {
        whitelistregex = whitelistregex + ignore[i] + "|";
    }

    blacklistregex = new RegExp(blacklistregex.replace("|(r+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((e|a+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?(t+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((a|e+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?(r+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((d+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?", "") + customregexblacklist, "gi");
    whitelistregex = new RegExp(whitelistregex + customregexwhitelist, "gi");

    // Detecting the words
    placeholderstring = placeholderstring.toLowerCase();
    placeholderstring = placeholderstring.replace(/[^a-zA-Z ]/g, "");
    placeholderstring = placeholderstring.replace(/@/g, "a");
    placeholderstring = placeholderstring.replace(/\|_\|/g, "u");
    placeholderstring = placeholderstring.replace(/\(( {1,5}?)\)/g, "o");
    placeholderstring = placeholderstring.replace(/3/g, "e");
    placeholderstring = placeholderstring.replace(/1/g, "i");
        if (options.fontrecognition && options.fontrecognition === true) {
        placeholderstring = convertFont(placeholderstring)
    }

    placeholderstring = placeholderstring.match(blacklistregex)

    if (placeholderstring) {
        for (let i = 0; i < placeholderstring.length; i++) {
            if (!placeholderstring[i].match(whitelistregex)) {
                value = true
            }
        }
    }
    
    return value;

}

const clean = String.prototype.clean = function(options = defaultoptions) {
    let customregexblacklist;
    let customregexwhitelist;
    let blacklistregex = "";
    let whitelistregex = "";
    let placeholderstring = this;
    let content = this;

    // Creates custom RegEx for custom filtered words.
    if (options.addfilter && options.addfilter.length) {
        for (let i = 0; i < options.addfilter.length; i++) {
            customregexblacklist = customregexblacklist + getRegex(options.addfilter[i]) + "|"
        }   
        customregexblacklist = customregexblacklist.slice(0, -1)
    }

    // Creates custom RegEx for custom unfiltered words.
    if (options.removefilter && options.removefilter.length) {
        for (let i = 0; i < options.removefilter.length; i++) {
            customregexwhitelist = customregexwhitelist + getRegex(options.removefilter[i]) + "|"
        }   
        customregexwhitelist = customregexwhitelist.slice(0, -1)
    }

    // Creating RegEx
    for (let i = 0; i < censor.length; i++) {
        blacklistregex = blacklistregex + censor[i] + "|";
    }
    for (let i = 0; i < ignore.length; i++) {
        whitelistregex = whitelistregex + ignore[i] + "|";
    }

    blacklistregex = new RegExp(blacklistregex.replace("|(r+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((e|a+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?(t+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((a|e+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?(r+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?((d+){1,5}( {1,})?([a-zA-Z0-9]{1,2})?)?", "") + customregexblacklist, "gi");
    whitelistregex = new RegExp(whitelistregex + customregexwhitelist, "gi");

    // Detecting the words
    placeholderstring = placeholderstring.toLowerCase();
    placeholderstring = placeholderstring.replace(/[^a-zA-Z ]/g, "");
    placeholderstring = placeholderstring.replace(/@/g, "a");
    placeholderstring = placeholderstring.replace(/\|_\|/g, "u");
    placeholderstring = placeholderstring.replace(/\(( {1,5}?)\)/g, "o");
    placeholderstring = placeholderstring.replace(/3/g, "e");
    placeholderstring = placeholderstring.replace(/1/g, "i");
        if (options.fontrecognition && options.fontrecognition === true) {
        placeholderstring = convertFont(placeholderstring)
    }

    placeholderstring = placeholderstring.match(blacklistregex)

    if (placeholderstring) {
        for (let i = 0; i < placeholderstring.length; i++) {
            if (!placeholderstring[i].match(whitelistregex)) {
                const hashes = (options.replace && options.replacerepeat && options.replacerepeat === true) ? getReplacements(placeholderstring[i], options.replace) : ((options.replace) ? options.replace : defaultoptions.replace)

                content = content.toLowerCase().replace(placeholderstring[i], hashes);
            }
        }
    }
    
    return content;
}

module.exports = {
    filter,
    test,
    clean,
}