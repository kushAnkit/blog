//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my tech blog, where I explore the latest trends and developments in the world of technology. From cutting-edge software and hardware innovations to emerging technologies like AI and blockchain, my blog offers a fresh perspective on the constantly evolving tech landscape. Whether you're a tech enthusiast, a professional in the industry, or simply curious about the impact of technology on our daily lives, my blog provides in-depth analysis and insights that will keep you informed and engaged. So join me on this exciting journey as we explore the fascinating world of technology together!";
const aboutContent = "Here at my tech blog, we are passionate about all things tech. Our team of dedicated writers and researchers is committed to bringing you the latest news and insights from the world of technology. Our mission is to provide a platform for tech enthusiasts, industry professionals, and curious readers to engage with each other and stay informed about the latest trends and developments in the tech space. We pride ourselves on our in-depth analysis and objective reporting, and we strive to deliver content that is informative, engaging, and accessible to all. Thank you for visiting our blog, and we hope you enjoy reading our content as much as we enjoy creating it.";
const contactContent = "We would love to hear from our readers and engage with you on the latest topics and trends in the world of technology. If you have any questions, comments, or suggestions about our blog, feel free to get in touch with us through the contact form below. We will do our best to respond to your message as soon as possible. Additionally, you can connect with us on social media to stay up-to-date with our latest content and engage with our community of tech enthusiasts. Thank you for your interest in our blog, and we look forward to hearing from you!";

const app = express();


app.set('view engine', 'ejs');
var arr = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    demo: arr
  });

});

app.get("/about", function (req, res) {
  res.render("about", {
    about: aboutContent
  });
});


app.get("/contact", function (req, res) {
  res.render("contact", {
    contact: contactContent
  });
});

app.get("/compose", function (req, res) {

  res.render("compose");
});


app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  
  arr.push(post);
  res.redirect("/");


});


app.get("/:postName",function(req,res){
  let check = _.lowerCase(req.params.postName);
  

  arr.forEach(function(name){
    let titleCheck = _.lowerCase(name.title)
    if(check===titleCheck){
res.render("post",{
  postPagetitle: name.title,
  postPageContent: name.content
  
});
    }
  });

});




















app.listen(3000, function () {
  console.log("Server started on port 3000");
});