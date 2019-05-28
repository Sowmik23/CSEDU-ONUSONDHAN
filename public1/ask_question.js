function Ask_Question() {
    var question = document.getElementById("asking_question").value;
    var tags = document.getElementById("asking_tag").value;
    var description = document.getElementById("asking_description").value;




    	var date = new Date();
    	var y = date.getFullYear();
    	var m = date.getMonth();
    	var d = date.getDate();
    	var h = date.getHours();
    	var mn = date.getMinutes();
    	var s = date.getSeconds();

    	var postDate = d + "/" + m + "/" + y + " at " + h + ":" + mn + ":" + s;

    // var who_ask = document.getElementById("").value;
    // var date = dkf;
    // var comments = document.getElementById("password_signup").value;
    // var who_comments = document.getElementById("confirm_pass_signup").value;


    	var name;
    	var user = firebase.auth().currentUser;
    	var DatabaseRef = firebase.database().ref('/Users');
    	DatabaseRef.on('value', function (snapshot) {
    		snapshot.forEach(function (childSnapshot) {

    			var childData = childSnapshot.val();
    			if (user.uid == childData.UserID) {
    				name = childData.FirstName;
    			}

    		});
    	});
      //window.alert(name);

    // if (question != "" && tags != "" && description != "") {
    //     var txt;
    //     if (confirm("Press a button!")) {
    //         txt = "Question posted successfully!";
    //
    //     } else {
    //         txt = "You pressed Cancel!";
    //     }
    //     window.alert(txt);
    // } else {
    //     window.alert("Please fill all the field.");
    //
    // }


    var Ref = firebase.database().ref().push();
    var id = Ref.getKey();
    var d = new Date();
    var posting_time = 0-d.getTime();
    //var posting_time = new Date().toString();

    if (question != "" && tags != "" && description != "") {
        firebase.database().ref('Posts/' + id).set({
                Question_Name: question,
                Tags: tags,
                Description: description,
                User_Name: name,
                Post_Id: id,
                Post_Date: postDate,
                Posting_time: posting_time,
                like_count: 0,
                dislike_count:0

            })
            .then(function() {
                window.location = "index.html";
            });
    }


}
