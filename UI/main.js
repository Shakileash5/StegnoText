var ad = document.getElementById("adv1")
ad.addEventListener("click", () => {
    document.getElementById('option').classList.toggle("trans")
});

function showSnackbar(flag) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.style.display = "block";
    if(flag){
        document.getElementById("snackbar").innerHTML = "The message is hidden successfully";
        document.getElementById("snackbar").style.color = "green";
    }
    else{
        document.getElementById("snackbar").innerHTML = "There is some error in hiding the message";
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
        showSnackbar(1);
    })
    .catch(function(res){ 
        console.log(res);
        showSnackbar(0);
    })
    .finally(function(){
        document.getElementById("SecretMsgToHide").value = "";
        document.getElementById("passwordToHide").value = "";
    });

    return false;
}


