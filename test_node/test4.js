/* Using this reference */
/* references to objects */
var Person = {
	printName : function(){
		console.log("My name is: " + this.name);
		console.log(this === Person);
	},
	name: "NonName",
	email: "NonEmail",
	age: null
}

Person.printName();

var Niño = Person;
Niño.printName();

function hw(){
	console.log("Hola mundo");
	console.log(this === global);
};

hw();