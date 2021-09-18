const { filter, test, globaloptions } = require('./index')

/* globaloptions({
    replace: "$",
    replacerepeat: false,
    fontrecognition: false,
    addfilter: [],
    removefilter: [],
})
*/

const string = "shut up you asshole, get a life lol"
const result = filter(string)

console.log(result)