function logOut() {
    firebase.auth().signOut();
    window.location = "index.html";
}
function countLike(hi) {
    var DatabaseRef = firebase.database().ref('/Posts/' + hi).orderByChild("Posting_time");
    //var DatabaseRef2 = firebase.database().ref('/users');
    DatabaseRef.once('value', function (snapshot) {
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

function countDislike(hi) {
    var DatabaseRef = firebase.database().ref('/Posts/' + hi).orderByChild("Posting_time");
    //var DatabaseRef2 = firebase.database().ref('/users');
    DatabaseRef.once('value', function (snapshot) {
        //  snapshot.forEach(function (childSnapshot) {
        var childData = snapshot.val();
        var postcount = childData.dislike_count;
        postcount++;
        firebase.database().ref('/Posts/' + hi).update({
            dislike_count: postcount
        })
        //});
    });
    window.location(index.html);
}

function saveComment(cmntid) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var cmnttext = document.getElementById("txt_" + cmntid).value;
            window.alert(cmnttext);
            var Ref = firebase.database().ref().push();
            var id = Ref.getKey();

            // firebase.database().ref('/Comments/' + cmntid).set({
            //     comment_count: 0
            // });

            var cmntcount = 0;
            // firebase.database().ref('/Comments/' + cmntid).on('value', function (snapshot) {
            //     snapshot.forEach(function (childSnapshot) {
            //         cmntcount++;
            //     });
            // });
            firebase.database().ref('/Comments/' + cmntid + '/' + id).set({
                comenterid: user.uid,
                commnettext: cmnttext,
                comment_count: cmntcount + 1
            });


            //window.alert(cmntcount);






            //     var DatabaseRef = firebase.database().ref('/Comments/'+cmntid);
            //   //var DatabaseRef2 = firebase.database().ref('/users');
            //   DatabaseRef.once('value', function (snapshot) {
            //   //  snapshot.forEach(function (childSnapshot) {
            //       var childData = snapshot.val();
            //       var cmntcount=childData.comment_count;
            //       cmntcount++;
            //       firebase.database().ref('/Comments/' + cmntid).update({
            //         comment_count:cmntcount;
            //       })
            //     //});
            //   });

        }
        showComment(cmntid);
    });
    window.location(index.html);


}

function showComment(cmntid) {
    var DatabaseRef = firebase.database().ref('/Comments/' + cmntid);
    var DatabaseRef2 = firebase.database().ref('/Users');
    DatabaseRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var cmnt_txt = childData.commnettext;

            DatabaseRef2.once('value', function (snapshot2) {
                snapshot2.forEach(function (childSnapshot2) {
                    var childData2 = childSnapshot2.val();
                    var F_name = childData2.FirstName;
                    // window.alert(F_name);
                    if (childData2.UserID == childData.comenterid) {
                        
                        document.getElementById("div" + cmntid).innerHTML += "<br><p id=\"cmtname" + cmntid + "\" style=\"cursor:pointer;color:blue\"><b> " + F_name + "</b>  </p><pre style=\"font-size:16px\">" + cmnt_txt + "</pre>";
                    }

                });
            });


        });
    });


}




// function showPopularPost(post_id){
//   window.alert("HI!");
//   //document.getElementById("div" + comment_id).innerHTML = "<textarea id=\"box" + comment_id + "\" class=\"combox\" placeholder=\"your comment\"  ></textarea>"
//
// 	var DatabaseRef = firebase.database().ref('/Posts').orderByChild("Posting_time");
// 	//var DatabaseRef2 = firebase.database().ref('/users');
// 	DatabaseRef.on('value', function (snapshot) {
// 		snapshot.forEach(function (childSnapshot) {
// 			var childData = childSnapshot.val();
//       var question=childData.Question_Name;
//       var tag = childData.Tags;
//       var date = childData.Post_Date;
//       var name=childData.User_Name;
//       var description=childData.Description;
//       if (childData.ID == post_id) {
//         document.getElementById("postholder").innerHTML +=//" <br><br> "+
//         "<div class=\"w3-col l8 s12 w3-card-4 w3-margin w3-white\" style=\"width:100%\">"+
//                 "<div class=\"w3-container\">"+
//                     "<h3><b>" +question+"</h5>"+
//                         "<span class=\"w3-tag w3-light-grey w3-small w3-margin-bottom\">"+tag+"</span>"+
//                 "</div>"+
//                 "<div class=\"w3-container\">"+
//                     "<p>"+name+" <span class=\"w3-opacity\">"+date+"</span></b></h3>"+
//                     "<h5>"+description+"</p>"+
//                         "<div class=\"w3-row\">"+
//                             "<div class=\"w3-col m8 s12\">"+
//                                 "<p><button class=\"w3-button w3-padding-large w3-white w3-border\"><b>READ MORE »</b></button></p>"+
//                             "</div>"+
//                             "<div class=\"w3-col m4 w3-hide-small\">"+
//                                 "<p><span class=\"w3-padding-large w3-right\"><b>Comments  </b> <span class=\"w3-tag\">0</span></span>"+
//                                 "</p>"+
//                             "</div>"+
//                             "<textarea id=\"comment_txt\" rows=\"2\" cols=\"40\" name=\"comment\" form=\"usrform\" placeholder=\"Write a comment...\"></textarea>"+
//                             "<button id=\"comment_btn\"  class=\"w3-right button button1\" type=\"submit\">Comment</button>"+
//                         "</div>"+
//                 "</div>"+
//         "</div>"
//       }
// 		});
// 	});
// }

// function Comment(){
//   firebase.database().ref('Comments/' + userId).set({
//       FirstName: name,
//       Password: password,
//       Email: email,
//       UserID: userId
//   })
//       .then(function () {
//           firebase.auth().signOut();
//           window.location = "index.html";
//       })
//       .catch(function (error) {
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           window.alert("Error Code: " + errorCode);
//           window.alert("Error Message: " + errorMessage);
//       });
//   window.location = "index.html";
//}


function SignUp() {
    var name = document.getElementById("username_signup").value;
    var email = document.getElementById("email_signup").value;
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
