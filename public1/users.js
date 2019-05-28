function SignUp() {
    var user_name = document.getElementById("username_signup").value;
    var email = document.getElementById("email_signup").value;
    var university = document.getElementById("university_signup").value;
    var session = document.getElementById("session_signup").value;
    var password = document.getElementById("password_signup").value;
    var confirmPassword = document.getElementById("confirm_pass_signup").value;

    if (password != confirmPassword) {
        window.alert("Password is not matching.");
        return;
    }
    if (password.length < 6 || confirmPassword.length < 6) {
        window.alert("Password must be at least 6 characters.");
        return;
    }
    if (email.length < 6) {
        window.alert("Invalid Email");
        return;
    }

    var Ref = firebase.database().ref().push();
    var id = Ref.getKey();

    if (user_name != "" && email != "" && password != "") {
        firebase.database().ref('Users/' + id).set({
                User_Name: user_name,
                Email: email,
                University: university,
                Session: session,
                Password: password
            })
            .then(function() {
                window.location = "logged_in.html";
            });
    }

}


function Login() {
    var email = document.getElementById("email_login").value;
    var password = document.getElementById("password_login").value;

    window.alert(email + " " + password);
    window.location = "logged_in.html";

    firebase.auth().signInWithEmailAndPassword(email, password).catch(console.log), {
        code: "auth/wrong-password",
        message: "The password is invalid or the user does not have a password."

    }.then(function() {
        window.location = "logged_in.html";
    });
}