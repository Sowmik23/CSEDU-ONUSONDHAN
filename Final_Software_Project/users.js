function logOut() {
    firebase.auth().signOut();
    window.location = "index.html";
}

function SignUp() {
    var name = document.getElementById("username_signup").value;
    var email = document.getElementById("email_signup").value;

    var university = document.getElementById("university_signup").value;
    var session = document.getElementById("session_signup").value;

    var password = document.getElementById("password_signup").value;
    var confirmPassword = document.getElementById("confirm_pass_signup").value;
    if (name == "") {
        window.alert("Please enter all the field here.");
        return;
    }
    if (password != confirmPassword) {
        window.alert("Password is not matching.");
        return;
    }
    if (password.length < 6 || confirmPassword.length < 6) {
        window.alert("Password must be greater than 5 characters.");
        return;
    }
    if (email.length < 6) {
        window.alert("Invalid Email");
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        var user = firebase.auth().currentUser;
        var userId = user.uid;

        firebase.database().ref('Users/' + userId).set({
            FirstName: name,

            University: university,
            Session: session,

            Password: password,
            Email: email,
            UserID: userId
        })
            .then(function () {
                firebase.auth().signOut();
                window.location = "index.html";
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Error Code: " + errorCode);
                window.alert("Error Message: " + errorMessage);
            });
    }, function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error Code: " + errorCode);
        window.alert("Error Message: " + errorMessage);
    });

}


function Login() {
    var email = document.getElementById("email_login").value;
    var password = document.getElementById("password_login").value;


    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        localStorage.setItem('currentUserID', uid);
        localStorage.setItem('currentUser', user);
        console.log(uid);
        var msg = "showWelcome";
        localStorage.setItem('prevoius', msg);
        window.location = "index.html";


    }, function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error Code: " + errorCode);
        window.alert("Error Message: " + errorMessage);
    });

}



















function showprofile(user_id) {

    firebase.database().ref('/Users/').on('value', function (snapshot) {
        // var user = firebase.auth().currentUser;
        // var userId = user.uid;
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var u_id = childData.UserID;

            //window.alert(loggedinuserid+" "+u_id);
            if (user_id == u_id) {
                var mail = childData.Email;
                var name = childData.FirstName;
                var session = childData.Session;

                //var name = childData.User_Name;

                var university = childData.University;
                //window.alert(name+" jn");

                //window.alert(loggedinuserid+" "+u_id);

                document.getElementById("profile_id_bla").innerHTML += //" <br><br> "+

                    "<div  class=\"w3-modal-content w3-animate-zoom w3-top w3-model w3-row-padding\" style=\"width:50%; margin:26px\">" +
                    "<div class=\"w3-half w3-margin-bottom\">" +
                    "<ul class=\"w3-ul w3-white w3-center\">" +

                    "<li class=\"w3-padding-16\">" +
                    "<p><i class=\"fa fa-user-circle fa-fw w3-margin-right w3-large w3-text-teal\"></i>User Name : " + name + "</p>" +
                    "</li>" +

                    "<li class=\"w3-padding-16\">" +
                    "<p><i class=\"fa fa-graduation-cap fa-fw w3-margin-right w3-large w3-text-teal\"></i>School/University : " + university + " </p>" +
                    "</li>" +

                    "<li class=\"w3-padding-16 \">" +
                    "<p><i class=\"fa fa-calendar-o fa-fw w3-margin-right w3-large w3-text-teal\"></i>Session : " + session + " </p>" +
                    "</li>" +

                    "</ul>" +
                    "</div>" +

                    "<div class=\"w3-half\">" +
                    "<ul class=\"w3-ul w3-white w3-center\">" +

                    "<li class=\"w3-padding-16\">" +
                    "<p><i class=\"fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal\"></i>Profession : Student</p>" +
                    "</li>" +
                    "<li class=\"w3 - padding - 16\">" +
                    "<p> <i class=\"fa fa-home fa-fw w3-margin-right w3-large w3-text-teal\"></i>Home Town: Dhaka </p>" +
                    "</li>" +

                    "<li class=\"w3-padding-16\">" +
                    "<p><i class=\"fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal\"></i>Email : " + mail + " </p>" +
                    "</li>" +

                    "</ul>" +
                    "</div>" +
                    "</div>" +

                    "<hr>"
            }
        });
    });

}