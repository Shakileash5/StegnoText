var ad = document.getElementById("adv1")
ad.addEventListener("click", () => {
    document.getElementById('option').classList.toggle("trans")
});

/*
 * This function is responsible for hiding and revealing the snackbar message.
 * 
 * @param {string} msg - message to be shown in the snackbar
 * @param {boolean} flag - flag to show success or failure message
 */
function showSnackbar(msg,flag) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.style.display = "block";
    document.getElementById("snackbar").innerHTML = msg;
    if(flag){
        document.getElementById("snackbar").style.color = "green";
    }
    else{
        document.getElementById("snackbar").style.color = "red";
    }
    
    setTimeout(function(){ x.className = x.style.display="none"; }, 3000);
}

/*
 * This function handles sending request to hide data and then reveal the final cover msg with data.
 *
 */
const hideSecret = ()=>{
    console.log("Inside the hide secret function");
    let secretMsg = document.getElementById("SecretMsgToHide").value ; // msg to be hidden
    let password = document.getElementById("passwordToHide").value ; // password to retrive encrypt and decrypt msg 
    let coverMsg = document.getElementById("coverMessage").value ; // cover in which secret msg is hidden

    if(secretMsg.value == "" || password.value == ""){ // if any of the field is empty
        alert("Please enter the message and password");
        return;
    }

    console.log("Inside the hide secret function to sedd" );
    // send request to hide data
    fetch("http://127.0.0.1:3000/hideSecret",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({secretMsg: secretMsg, password: password, coverMsg: coverMsg})
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
        console.log(data);
        document.getElementById("coverMessage").value = data.data;
        showSnackbar("The message is hidden successfully",1);
    })
    .catch(function(res){ 
        console.log(res);
        showSnackbar("There is some error in hiding the message",0);
    })
    .finally(function(){
        document.getElementById("SecretMsgToHide").value = "";
        document.getElementById("passwordToHide").value = "";
    });

    return false;
}


function showSecret(){

    let coverMsg = document.getElementById("coverMessage").value ; // cover in which secret msg is hidden
    let password = document.getElementById("passwordToHide").value ; // password to retrive encrypt and decrypt msg 

    if(coverMsg.value == "" || password.value == ""){ // if any of the field is empty
        alert("Please enter the message and password");
        return;
    }

    // send request to hide data
    fetch("http://127.0.0.1:3000/revealSecret?password="+password+"&coverMsg="+coverMsg)
    .then(function(res){ return res.json(); })
    .then(function(data){
        console.log(data);
        document.getElementById("Secret").innerHTML = data.data;
        showSnackbar("The message is revealed successfully",1);
    })
    .catch(function(res){
        console.log(res);
        showSnackbar("There is some error in revealing the message",0);
    })
    .finally(function(){
        document.getElementById("coverMessage").value = "";
        document.getElementById("passwordToHide").value = "";
    });

}
