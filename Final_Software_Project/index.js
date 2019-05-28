function logOut() {
    firebase.auth().signOut();
    window.location = "index.html";
}

function countLike(hi) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    var DatabaseRef = firebase.database().ref('/Posts/' + hi).orderByChild("Posting_time");
    //var DatabaseRef2 = firebase.database().ref('/users');
    DatabaseRef.once('value', function(snapshot) {
        //  snapshot.forEach(function (childSnapshot) {
        var childData = snapshot.val();
        var postcount = childData.like_count;
        postcount++;
        firebase.database().ref('/Posts/' + hi).update({
                like_count: postcount
            })
            //});
    });
    window.location(index.html);
}
else{
    window.alert("Please Loggin First");
}
    });
}

function countDislike(hi) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    var DatabaseRef = firebase.database().ref('/Posts/' + hi).orderByChild("Posting_time");
    //var DatabaseRef2 = firebase.database().ref('/users');
    DatabaseRef.once('value', function(snapshot) {
        //  snapshot.forEach(function (childSnapshot) {
        var childData = snapshot.val();
        var postcount = childData.dislike_count;
        postcount++;
        firebase.database().ref('/Posts/' + hi).update({
                dislike_count: postcount
            })
            //});
    });
    //window.location(index.html);
}
else{
    window.alert("Please Loggin First");
}
    });
}

function saveComment(cmntid) {
    //window.alert("cmnttext");
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //window.alert("cmnttext");
            document.getElementById("div" + cmntid).style.display = "block";

            //var cmnttext = document.getElementById("txt_" + cmntid).value;

            var cmnttext = document.getElementById("txt_" + cmntid);


            cmnttext.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    var Ref = firebase.database().ref().push();
                    var id = Ref.getKey();
                    firebase.database().ref('/Comments/' + cmntid + '/' + id).set({
                        comenterid: user.uid,
                        commnettext: cmnttext.value
                            //comment_count: cmntcount + 1
                    });
                    cmnttext.value = '';
                    showComment(cmntid);
                    //readComment(cmntid);


                }

            });

        }

        else{
            window.alert("Please Loggin First");
        }
    });
    //window.location(index.html);
}

function showComment(cmntid) {

    document.getElementById("div" + cmntid).innerHTML = "<textarea  id=\"txt_" + cmntid + "\" rows=\"2\" cols=\"40\" name=\"comment\" form=\"usrform\" placeholder=\"Write a comment...\"></textarea>"
    var DatabaseRef = firebase.database().ref('/Comments/' + cmntid);
    var DatabaseRef2 = firebase.database().ref('/Users');
    DatabaseRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var cmnt_txt = childData.commnettext;

            DatabaseRef2.once('value', function(snapshot2) {
                snapshot2.forEach(function(childSnapshot2) {
                    var childData2 = childSnapshot2.val();
                    var F_name = childData2.FirstName;
                    // window.alert(F_name);
                    if (childData2.UserID == childData.comenterid) {

                        document.getElementById("div" + cmntid).innerHTML += "<br><p id=\"cmtname" + cmntid + "\" style=\"cursor:pointer;color:blue\" ><b> " + F_name + "</b>  </p><pre style=\"font-size:16px\">" + cmnt_txt + "</pre>";
                    }

                });
            });


        });
    });
}


//onclick=\"saveUserProfileLink(this.id)\"

// function saveUserProfileLink(clicked_id) {
// 	firebase.auth().onAuthStateChanged(function (user) {
// 		if (user) {
// 			var currentPosterId = document.getElementById("id" + clicked_id).innerText;
// 			firebase.database().ref('UserProfile/' + "id" + user.uid).set({
// 				id: currentPosterId
// 			})

// 			window.location = "profile.html";

// 		} else {

// 			window.alert("Please Login to see others profile.");


// 		}
// 	});


// }showTags

function showTags(q_id) {
    var DatabaseRef = firebase.database().ref('/Posts');
    // window.addEventListener('mouseup', function(event) {
    //     var list = document.getElementById('q_animate');
    //     if (event.target != list)
    //         window.location = "tags.html";
    //     //list.style.display='none';
    // });
    DatabaseRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var ques = childData.Question_Name;
            var tag = childData.Tags;
            var date = childData.Post_Date;
            var name = childData.User_Name;
            var description = childData.Description;
            var currPostId = childData.Post_Id;
            //var normal_id=txt_comment+currPostId;
            //var posterid=question;
            var count_like = childData.like_count;
            var count_dislike = childData.dislike_count;
            // window.alert(F_name); tag_id
            if (tag == q_id) {
                //document.getElementById("questions_list").style.display = "none";
                document.getElementById("t_list").innerHTML +=
                    " <div id=\"q_animate\" class=\" modal-content animate\" style=\"width:100%\" action=\"index.html\">" +

                    "<div class=\"w3-col l8 s12 w3-card-4 w3-margin w3-white\" style=\"width:100%\">" +
                    //"document.getElementById(\"tag_id\").style.display=\"none\""+
                    "<div class=\"w3-container\">" +
                    "<h3><b>" + ques + "</h5>" +
                    "<span class=\"w3-tag w3-light-grey w3-small w3-margin-bottom\">" + tag + "</span>" +
                    "</div>" +
                    "<div class=\"w3-container\">" +
                    "<p>" + name + " <span class=\"w3-opacity\">" + date + "</span></b></h3>" +
                    "<h5>" + description + "</p>" +
                    "<div class=\"w3-row\">" +
                    "<div class=\"w3-col m12 s12\">" +
                    "<p>" + count_like + " Likes,    " + count_dislike + " Dislikes</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"w3-row\">" +
                    "<div class=\"w3-col m2 s12\">" +
                    "<p id=\"" + currPostId + "\" onclick=\"countLike(this.id)\"><button  class=\"w3-padding-large w3-button w3-white w3-left\"><img src=\"image\\like_button.png\" width=\"35\" height=\"35\"><b><a href=\"index.html\">Like</a></b></img></button></p>" +
                    "</div>" +
                    "<div class=\"w3-col m4 s12\">" +
                    "<p id=\"" + currPostId + "\" onclick=\"countDislike(this.id)\"><button class=\"w3-padding-large w3-button w3-white w3-right\"><img src=\"image\\dislike_button.png\" width=\"35\" height=\"35\"><b><a href=\"index.html\">Dislike</a></b></img></button></p>" +
                    //"<p><button class=\"w3-button w3-padding-large w3-white w3-border\"><b>READ MORE »</b></button></p>"+
                    "</div>" +
                    "<div class=\"w3-col m6\">" +
                    "<p id=\"comment" + currPostId + "\" onclick=\"saveComment(this.id)\"><button class=\" w3-button w3-white w3-right\"><img style=\"display:inline\" src=\"image\\comment_button.png\" width=\"35\" height=\"35\"><b>Comment</b></img></button></p>" +
                    //     // "<p><span class=\"w3-padding-large w3-right\"><b>Comments  </b> <span class=\"w3-tag\">0</span></span>"+
                    //     // "</p>"+
                    "</div>" +


                    //"<div id=\"Txt_id\" style=\"display:none\">"+
                    "<div id=\"divcomment" + currPostId + "\" style=\"display:none\" class=\"w3-row\">" +
                    "<textarea  id=\"txt_comment" + currPostId + "\" rows=\"2\" cols=\"40\" name=\"comment\" form=\"usrform\" placeholder=\"Write a comment...\"></textarea>" +
                    //"</div>"+
                    //"<button class=\"w3-right button button1 w3-padding-large w3-button w3-white\" id=\"comment"+currPostId+"\" onclick=\"saveComment(this.id)\" class=\"w3-right button button1\" type=\"submit\">Comment</button>"+

                    // "<div id=\"divcomment"+currPostId+"\" >"+
                    // "</div>"+
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
            }

        });
    });
}












function showQuestions(q_id) {
    var DatabaseRef = firebase.database().ref('/Posts');
    // window.addEventListener('mouseup', function(event) {
    //     var list = document.getElementById('q_animate');
    //     if (event.target != list)
    //         window.location = "top_questions.html";
    //     //list.style.display='none';
    // });
    DatabaseRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var ques = childData.Question_Name;
            var tag = childData.Tags;
            var date = childData.Post_Date;
            var name = childData.User_Name;
            var description = childData.Description;
            var currPostId = childData.Post_Id;
            //var normal_id=txt_comment+currPostId;
            //var posterid=question;
            var count_like = childData.like_count;
            var count_dislike = childData.dislike_count;
            // window.alert(F_name); tag_id
            if (ques == q_id) {
                //document.getElementById("questions_list").style.display = "none";
                document.getElementById("q_list").innerHTML +=
                    " <div id=\"q_animate\" class=\" modal-content animate\" style=\"width:100%\" action=\"index.html\">" +

                    "<div class=\"w3-col l8 s12 w3-card-4 w3-margin w3-white\" style=\"width:100%\">" +
                    //"document.getElementById(\"tag_id\").style.display=\"none\""+
                    "<div class=\"w3-container\">" +
                    "<h3><b>" + ques + "</h5>" +
                    "<span class=\"w3-tag w3-light-grey w3-small w3-margin-bottom\">" + tag + "</span>" +
                    "</div>" +
                    "<div class=\"w3-container\">" +
                    "<p>" + name + " <span class=\"w3-opacity\">" + date + "</span></b></h3>" +
                    "<h5>" + description + "</p>" +
                    "<div class=\"w3-row\">" +
                    "<div class=\"w3-col m12 s12\">" +
                    "<p>" + count_like + " Likes,    " + count_dislike + " Dislikes</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"w3-row\">" +
                    "<div class=\"w3-col m2 s12\">" +
                    "<p id=\"" + currPostId + "\" onclick=\"countLike(this.id)\"><button  class=\"w3-padding-large w3-button w3-white w3-left\"><img src=\"image\\like_button.png\" width=\"35\" height=\"35\"><b><a href=\"index.html\">Like</a></b></img></button></p>" +
                    "</div>" +
                    "<div class=\"w3-col m4 s12\">" +
                    "<p id=\"" + currPostId + "\" onclick=\"countDislike(this.id)\"><button class=\"w3-padding-large w3-button w3-white w3-right\"><img src=\"image\\dislike_button.png\" width=\"35\" height=\"35\"><b><a href=\"index.html\">Dislike</a></b></img></button></p>" +
                    //"<p><button class=\"w3-button w3-padding-large w3-white w3-border\"><b>READ MORE »</b></button></p>"+
                    "</div>" +
                    "<div class=\"w3-col m6\">" +
                    "<p id=\"comment" + currPostId + "\" onclick=\"saveComment(this.id)\"><button class=\" w3-button w3-white w3-right\"><img style=\"display:inline\" src=\"image\\comment_button.png\" width=\"35\" height=\"35\"><b>Comment</b></img></button></p>" +
                    //     // "<p><span class=\"w3-padding-large w3-right\"><b>Comments  </b> <span class=\"w3-tag\">0</span></span>"+
                    //     // "</p>"+
                    "</div>" +


                    //"<div id=\"Txt_id\" style=\"display:none\">"+
                    "<div id=\"divcomment" + currPostId + "\" style=\"display:none\" class=\"w3-row\">" +
                    "<textarea  id=\"txt_comment" + currPostId + "\" rows=\"2\" cols=\"40\" name=\"comment\" form=\"usrform\" placeholder=\"Write a comment...\"></textarea>" +
                    //"</div>"+
                    //"<button class=\"w3-right button button1 w3-padding-large w3-button w3-white\" id=\"comment"+currPostId+"\" onclick=\"saveComment(this.id)\" class=\"w3-right button button1\" type=\"submit\">Comment</button>"+

                    // "<div id=\"divcomment"+currPostId+"\" >"+
                    // "</div>"+
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
            }

        });
    });
}

//   window.location = "index.html";


function SignUp() {
    var name = document.getElementById("username_signup").value;
    var email = document.getElementById("email_signup").value;

    var university = document.getElementById("university_signup").value;
    var session = document.getElementById("session_signup").value;

    var password = document.getElementById("password_signup").value;
    var confirmPassword = document.getElementById("confirm_pass_signup").value;
    var remember = document.getElementById("sremember");
    if (name == "") {
        window.alert("Please enter all the field here.");
        return;
    }
    if (session == "") {
        window.alert("Please enter all the field here.");
        return;
    }
    if (university == "") {
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
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
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
            .then(function() {
                if (remember.checked) {
					window.location = "index.html";

				}
				else {
					firebase.auth().signOut();
					window.location = "index.html";
				}
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Error Code: " + errorCode);
                window.alert("Error Message: " + errorMessage);
            });
    }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error Code: " + errorCode);
        window.alert("Error Message: " + errorMessage);
    });

}