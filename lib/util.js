const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const simplify = function(s1) {
    let s = s1.replace(/(s){2,}/g, 'ss').replace(/\s/gi, '').replace(/(.)\1{2,}/g, '$1$1').replace(/[3]/gi, '3').replace(/@/gi, 'a')
    return s
}

const replaceAtIndex = function(string, start, end, replace) {
    return string.substring(0, start) + replace + string.substring(end, string.length)
}

function seive(data) {
    this.data = data

    this.disable = function() { data_ = [] };
    this.enable = () => data_ = data;

    return this.data
}

export { clamp, simplify, replaceAtIndex, seive } ;
