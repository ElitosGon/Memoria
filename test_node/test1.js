/*Example base */
var person = {
	name: "",
	email: "",
	country: "",
	age: 0
};

console.log(person);

/*Funciones como esta siempre retornan undeffined */
function plusTwoNumbers(a, b){
	return a + b;
};

console.log(plusTwoNumbers(1,3));

/*Funcion que no necesita nombre, asignacion de nombres a variables */
var multiply = function (a, b){
	return a * b;
};

console.log(multiply(2,3));

/*Pasar funciones como variables a otro metodos */
var hw = function(){
	console.log("Hola mundo");
};

setTimeout(hw,5000);

