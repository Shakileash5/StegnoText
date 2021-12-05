const StegCloak = require('./stegcloak/stegcloak.js');
const stegcloak = new StegCloak(true, false);  // Initializes with encryption true and hmac false for hiding

var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express(); // create server object

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json(["This is StegnoText Server"]);
});

// create route for hiding the secrete message in text
app.post("/hideSecret",(req,res)=>{
    let secretMsg; // msg to be hidden
    let password; // password to retrive encrypt and decrypt msg
    let coverMsg; // cover in which secret msg is hidden
    console.log(req.body);
    console.log(req.query);

    // get data from body of request


    try{
        secretMsg = req.body.secretMsg;
        password = req.body.password;
        coverMsg = req.body.coverMsg;
    }
    catch(err){
        res.json({ 
            status: 406, 
            error: "missing args"
        });
        console.log(err);
        return;
    }

    let msg;
    // hide secret msg in cover msg
    try{
        msg = stegcloak.hide(secretMsg, password, coverMsg);
    }
    catch(err){
        res.json({
            status: 406,
            error: err
        });
        console.log(err);
        return;
    }
    
    res.json({status:200,msg:"the secret msg is embedded",data:msg});
    console.log("The request to /hideSecrete is serverd : ",msg);
    return;

});


const revealSecret = (password,coverMsg)=>{
    let secretMsg;
    console.log(password+" "+coverMsg);
    // retrieve secret msg from cover msg
    try{
        secretMsg = stegcloak.reveal(coverMsg, password);
    }
    catch(err){
        
        console.log(err);
        return;
    }
    
    console.log("The request to /revealMsg is serverd : ",secretMsg);
    return secretMsg;
}

// create route for retrieving the secrete message from text
app.get("/revealSecret",(req,res)=>{

    let password; // password to retrive encrypt and decrypt msg
    let coverMsg; // cover in which secret msg is hidden

    // get args from request
    try{
        password = req.query.password;
        coverMsg = req.query.coverMsg;
        //coverMsg = encodeURIComponent(coverMsg);
    }
    catch(err){
        res.json({
            status: 406, 
            error: "missing args"
        });
        console.log("Errors:::" + err);
        return;
    }

    let secretMsg;
    console.log(password+" "+coverMsg);
    // retrieve secret msg from cover msg
    try{
        secretMsg = stegcloak.reveal(coverMsg, password);
    }
    catch(err){
        res.json({
            status: 406,
            error: err
        });
        console.log(err);
        return;
    }
    
    console.log("The request to /revealMsg is serverd : ",secretMsg);
    res.json({status:200,msg:"the secret msg is retrieved",data:secretMsg});
    return;

});

// start the server 
app.listen(3000, () => {
 console.log("Server running on port 3000");
});