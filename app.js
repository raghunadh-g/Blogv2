
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");

const homeStartingContent = "Hi! Welcome to Daily Journal.In this site you can simply post anything...like how you spent your day at work, how  to spent your day with friends...In simple words think of it as your online dairy entry.This is one of the first versions and everyone can see what you post here since there is no authentication.Hence this is not your personal diary!We are looking forward to add authentication and make it secure."
const aboutContent = "Post anything in this site that you feel like sharing with the world.The best thing is your identity is not revealed. ";
const contactContent = "Github:     https://github.com/raghunadh-g";

const app = express();


app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://admin-Raghu:Raghu@619@cluster0.ihlbm.mongodb.net/blogDB",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema={
  title:String,
  content:String
}

const Post=mongoose.model("Post",postSchema);


app.get("/",(req,res)=>{
  Post.find({},(err,posts)=>{
    if(!err)
      res.render("home",{startingContent:homeStartingContent,posts:posts});
  });
  
});

app.get("/about",(req,res)=>{
  res.render("about",{AboutContent:aboutContent});
});

app.get("/contact",(req,res)=>{
  res.render("contact",{ContactContent:contactContent});
});


app.get("/compose",(req,res)=>{
  res.render("compose");
});


app.post("/compose",function(req,res){
  const post=new Post({
    title:req.body.titlePost,
    content:req.body.contentPost
  });
  post.save((err)=>{
    if(!err) res.redirect("/");
  });
  
});

app.get("/posts/:postId",(req,res)=>{
  const requestedPostId=(req.params.postId);
  Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});


let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}


app.listen(port,function(){
    console.log("server started succesfully!");
});