var express = require("express"),
app = express();

// Dit à express de servir le dossier 'public'
app.use(express.static("public"));
//Dit à express que les vues par défault son en ejs
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("home");
	// res.send("Welcome to the homepage!");
});

app.get("/loveme/:person",function(req,res){
	var thing = req.params.person;
	res.render("love",{thingVar : thing});
	// res.send("Welcome to the homepage!");
});

app.get("/posts",function(req,res){
	var posts = [
	{title: "Post 1",author:"Susy"},
	{title: "My adorable pet bunny",author:"Charlie"},
	{title: "Can you believe this pomsky",author:"ME"}
	];

	res.render("posts",{posts:posts});
});

app.get("*",function(req,res){
	res.send("Hey buddy I think you got the wrong door, the leather club is two blocks down..");
});


app.listen(3000,function(){
	console.log("Server started!");
});