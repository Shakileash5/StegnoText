const StegCloak = require('stegcloak');
const stegcloak = new StegCloak(true, false);  // Initializes with encryption true and hmac false for hiding

var express = require("express");
var app = express(); // create server object

app.get("/",(req,res)=>{
    res.json(["iam","also me","yea yea its me again"]);
});


// create route for hiding the secrete message in text
app.get("/hideSecrete",(req,res)=>{
    let secretMsg; // msg to be hidden
    let password; // password to retrive encrypt and decrypt msg
    let coverMsg; // cover in which secret msg is hidden

    // get args from request
    try{
        secretMsg = req.query.secretMsg;
        password = req.query.password;
        coverMsg = req.query.coverMsg;
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

// create route for retrieving the secrete message from text
app.get("/revealMsg",(req,res)=>{

    let password; // password to retrive encrypt and decrypt msg
    let coverMsg; // cover in which secret msg is hidden

    // get args from request
    try{
        password = req.query.password;
        coverMsg = req.query.coverMsg;
    }
    catch(err){
        res.json({
            status: 406, 
            error: "missing args"
        });
        console.log(err);
        return;
    }

    let secretMsg;
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
    
    res.json({status:200,msg:"the secret msg is retrieved",data:secretMsg});
    console.log("The request to /revealMsg is serverd : ",secretMsg);
    return;

});

// start the server 
app.listen(3000, () => {
 console.log("Server running on port 3000");
});