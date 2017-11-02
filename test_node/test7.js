/* Object factory */
var user = require('./userT7');
/* Object non shared state*/
var child = user();
console.log(child.gender);