const express = require("express");
const app = express();
app.use(express.json()); 
const body_parser=require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const uri ="mongodb+srv://Shivam:Hanna-123@cluster0.gqafmx3.mongodb.net/test";
app.use(express.urlencoded({ extended: true })); 
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/css/'));
app.use(express.static(__dirname+'/image/'));
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/Home.html");
});

app.get("/sign", (req, res) => {
    res.sendFile(__dirname+"/Signup.html");
});

app.get("/log", (req, res) => {
    res.sendFile(__dirname+"/Login.html");
});

app.post("/logg", (req, res) => {   
     var email=req.body.email;
     var pass=req.body.pass;
      function connection1(){
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(async(err) => {
          const collection = client.db('Hanna').collection('login');
          await collection.find({"email":req.body.email}).toArray().then((ans) => {
           if(ans){
            console.log("No");}
           else{
            console.log("Yes");
           } 
        });
          client.close();
        });
        }
    connection1();
});

app.post("/signup", (req, res) => {   
    var name=req.body.name;
    var email=req.body.email;
    var pass=req.body.pass;
    var cpass=req.body.cpass;
    var clgname=req.body.clgname;
    var subname=req.body.subname;
    var phone=req.body.phone;
     function connection1(){
       const client = new MongoClient(uri, { useNewUrlParser: true });
       client.connect(async(err) => {
         const collection = client.db('Hanna').collection('signup');
         await collection.insertOne({name:name,email:email,pass:pass,cpass:cpass,clgname:clgname,subname:subname,phone:phone});
         client.close();
       });
       }
   connection1();
});
const PORT = process.env.PORT || 8000; 
app.listen(PORT, console.log(`Server started on port ${PORT}`));