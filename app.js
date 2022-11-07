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
    //res.send({redirect: '/blog'});

    res.sendFile(__dirname+"/Login.html");
});

app.post("/logg", (req, res) => {   
     var email=req.body.email;
     var pass=req.body.pass;
      function connection1(){
        var login="";
        let l;
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(async(err) => {
          const collection = client.db('Hanna').collection('login');
          await collection.findOne({"email":req.body.email}, function (err, result) {
            if (err) {
                console.log("Error");
            }
            if (result !== null) {
                
                console.log("Email Sahi he");
                 login="yes";
                 let l=1;
            } else {
              
                console.log("Email Wrong he");           
                login="no" 
                let l=0;              
            }
        });


        if(!l){
            await collection.findOne({"pass":req.body.pass}, function (er,rs) {
                if (er) {
                    console.log("Error");
                }
                if (rs !== null) {
                    client.close();
                    console.log("Email And Pass Sahi he");
                    return res.redirect('/');
                } else {
                    client.close();
                    console.log("Email sahi he lekin Pass wrong he");
                    res.json({msg:`no`});
                }
            });
        }
        if(l){
            client.close();
            return res.redirect('/sign');
            //res.send({redirect: '/sign'});
            //res.sendFile(__dirname+"/Signup.html");
        }
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