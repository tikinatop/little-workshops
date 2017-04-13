var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat",catSchema);


// adding new cat to the DB

// var george = new Cat({name:"Mrs. Norris",
// 		age:7,
// 		temperament:"Evil"
// });

// george.save(function(err,cat){
// 	if (err){
// 		console.log("Something went wrong!");
// 	} else {
// 		console.log(cat, "Saved to DB");
// 	}
// });

// retrieve all cats from the DB and console.log each one

Cat.create({
	name: "Snow White",
	age: 15,
	temperament:"Bland"
},function(err,cat){
	var result = (err) ? "Error "+err : "Cat added! "+cat;
	console.log(result);
});

Cat.find({},function(err,cats){
	var result = (err) ? "Oh no! Error" + err : "All the cats : " + cats;
	console.log(result);
});