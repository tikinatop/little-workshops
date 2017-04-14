var express       = require("express"),
app               = express(),
bodyParser        = require("body-parser"),
expressSanitizer  = require("express-sanitizer"),
methodOverride    = require("method-override"),
mongoose          = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");

// Demande à app.js de scanner ce dossier pour insérer les fichiers
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// expressSanitizer APRES bodyParser!!!
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var entreeSchema = new mongoose.Schema({
    titre: String,
    image: String,
    body: String,
    creation: {type:Date,default:Date.now}
});

var Entree = mongoose.model("Entree",entreeSchema);

/* Entree.create({
 *   titre: "Test",
 *   image:"http://www.placehold.it/240x280&text=HelloWorld!",
 *   body: "Hello there"
 * }, function(err, entreeCreee) {
 *   var result = (err) ? err : "Entree a été créé" + entreeCreee;
 *   console.log(result);
 * });
 * */

// RESTFUL ROUTES
app.get("/",function(req, res){
    res.redirect("/entrees");
});

// INDEX ROUTE
app.get("/entrees",function(req, res){
    Entree.find({}, function(err, entrees){
        if (err) {
            console.log("Erreur!");
        } else {
            res.render("index",{entrees:entrees});
        }
    });
});

// NOUVELLE ROUTE
app.get("/entrees/nouveau",function(req, res){
    res.render("nouveau");
});

// CREATE ROUTE
app.post("/entrees",function(req, res){
    // create entree
    console.log(req.body);
    req.body.entree.body = req.sanitize(req.body.entree.body);
    console.log("===============");
    console.log(req.body);
    Entree.create(req.body.entree, function(err, nouvelleEntree){
        if(err) {
            res.render("nouveau");
        } else {
            // then, redirect to the index
            // ATTENTION A render vs. redirect
            res.redirect("/entrees");
        }
    });
})


// SHOW ROUTE
app.get("/entrees/:id",function(req, res){
    Entree.findById(req.params.id, function(err, entreeTrouvee){
        if(err){
            res.redirect("/entrees");
        } else {
            res.render("show",{entree:entreeTrouvee});
        }
    })
});

// EDIT ROUTE
app.get("/entrees/:id/edit",function(req, res){
    Entree.findById(req.params.id, function(err, entreeTrouvee){
        if(err){
            res.redirect("/entrees");
        } else {
            res.render("edit", {entree:entreeTrouvee});
        }
    })
});

// UPDATE ROUTE
app.put("/entrees/:id",function(req, res){
    req.body.entree.body = req.sanitize(req.body.entree.body);
    Entree.findByIdAndUpdate(req.params.id, req.body.entree, function(err, entreeMaj){
        if(err){
            res.redirect("/entrees");
        } else {
            res.redirect("/entrees/"+req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/entrees/:id",function(req, res){
    // destroy entree
    Entree.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/entrees");
        } else {
            res.redirect("/entrees");
        }
    });
    // redirect somewhere
});

app.listen(3000,function(){
    console.log("Le serveur est en route!");
});
