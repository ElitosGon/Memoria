/*Handle multiple request*/
function placeAndOrder(orderNumber){
	console.log("Costumer Order:" + orderNumber);

	/* Deliver call */
	cookAndDeliverFood(function(){
		console.log("Deliver food order:" + orderNumber);
	});

};


function cookAndDeliverFood(callback){
	setTimeout(callback, 5000);
};

placeAndOrder(1);
placeAndOrder(2);
placeAndOrder(3);
placeAndOrder(4);
placeAndOrder(5);
placeAndOrder(6);
placeAndOrder(7);
placeAndOrder(8);
placeAndOrder(9);
