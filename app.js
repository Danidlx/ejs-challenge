//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "wikiDB";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "pass";

//mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});
mongoose.connect("mongodb://"+DB_USER+":"+DB_PASSWORD+"@"+DB_HOST+":"+DB_PORT+"/"+DB_NAME, {useNewUrlParser: true});
//mongoose.connect("mongodb://"+DB_HOST+":"+DB_PORT+"/"+DB_NAME, {useNewUrlParser: true});
// function Post(title,text) {
// 	this.title = title;
// 	this.text = text;
// };

const postSchema = new mongoose.Schema ({
	title: String,
	text: String
});

const Post = mongoose.model("Post", postSchema);

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

Post.find(function(err,foundPosts){
	if(!err){
		foundPosts.forEach(function(post){
			posts.push(post);
		});
	}
});

app.get("/", function(req,res){

	res.render("home", {content: homeStartingContent, posts: posts});

});

app.get("/about", function(req,res){

	res.render("about", {content: aboutContent});

});

app.get("/contact", function(req,res){

	res.render("contact", {content: contactContent});

});

app.get("/compose", function(req,res){

	res.render("compose");
});

app.post("/compose", function(req,res){

    //let post = new Post(req.body.titulo,req.body.conteudo);

    let post = new Post({
    	title: req.body.titulo,
    	text: req.body.conteudo
    });

    post.save();

	posts.push(post);

	res.redirect("/");

});

app.get("/post/:numero", function(req, res){

	//console.log(req.params.id);

	res.render("post", {post: posts[req.params.numero]});

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
