/* Prototype */
function User(){
	this.name = "";
	this.email = "";
	this.age = 0;
	this.life = 100;
	this.giveLife = function(target){
		target.life += 1;
		console.log(this.name + " give 1 life to " + target.name);
	};
}

var child1 = new User();
child1.name = "Elias";
child1.email = "elias.gonzalezma@gmail.com";

var child2 = new User();
child2.name = "Enrique";
child2.email = "enrique.gonzalezpo@gmail.com";

child1.giveLife(child2);
console.log(child2.name + " have " + child2.life + " life");

User.prototype.stealLife = function stealLife(target){
	target.life -= 5;
	console.log(this.name + " stole 5 life to " + target.name);
};

child2.stealLife(child1);
console.log(child1.name + " have " + child1.life + " life");

User.prototype.gender = "NonDefine";
child1.gender = "Male";
console.log(child1.name + " gender is " + child1.gender);
console.log(child2.name + " gender is " + child2.gender);