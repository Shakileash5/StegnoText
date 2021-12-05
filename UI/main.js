var ad = document.getElementById("adv1")
ad.addEventListener("click", () => {
    document.getElementById('option').classList.toggle("trans")
})

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
        document.getElementById("status").style.display = "block";
        document.getElementById("status").innerHTML = "The message is hidden successfully";
        document.getElementById("status").style.color = "green";

    })
    .catch(function(res){ 
        console.log(res);
        document.getElementById("status").value = "There is some error in hiding the message";
        document.getElementById("status").style.display = "block";
        document.getElementById("status").style.color = "red";
    })
    .finally(function(){
        document.getElementById("SecretMsgToHide").value = "";
        document.getElementById("passwordToHide").value = "";
    });

    return false;
}


