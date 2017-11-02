/* If A.js and B.js call module User they will share gender state...
 if some one change that value the other one gonna to notice that */

module.exports = {
	printAge: function(age){
		console.log("My age is: "+ age);
	},
	gender: "NonDefine"
};

/* Export module */
function printName(name){
	console.log("My name is: "+ name);
};

module.exports.pName = printName;