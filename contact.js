function submitContact() {
    // window.alert("OK");
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var Ref = firebase.database().ref().push();
    var id = Ref.getKey();
    // if (name == "" || email == "" || subject == "" || message == "") {
    //     window.alert("Please fill up the form");
    //     return;
    // }
    if (name != "" && email != "" && message != "") {
        firebase.database().ref('Contact/' + id).set({
                Name: name,
                Email: email,
                Subject: subject,
                Message: message
            })
            .then(function() {
                window.location = "index.html";
            });
    }
    // window.alert("Message Sent Successfully!")

}