/* references to objects */
var Person = {
	name: "NonName",
	email: "NonEmail",
	age: null
}

var Niño = Person;
Niño.name = "Elias";
Niño.email = "elias.gonzalezma@gmail.com";
Niño.age = 24;

console.log(Person);
console.log(Niño);

/* Diference between == === */
console.log('19' == 19);
console.log('19' === 19);