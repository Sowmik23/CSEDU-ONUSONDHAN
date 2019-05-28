var currUserId;
function editbio() {
    document.getElementById("bio").style.display = "none";
    document.getElementById("editbio").style.display = "none";
    document.getElementById("editedu").style.display = "none";
    //document.getElementById("editwork").style.display = "none";
    document.getElementById("editpro").style.display = "none";
    document.getElementById("addbio").style.display = "block";
    document.getElementById("savebio").style.display = "block";
}
function editedu() {
    document.getElementById("edu").style.display = "none";
    document.getElementById("editbio").style.display = "none";
    document.getElementById("editedu").style.display = "none";
    //document.getElementById("editwork").style.display = "none";
    document.getElementById("editpro").style.display = "none";
    document.getElementById("addedu").style.display = "block";
    document.getElementById("saveedu").style.display = "block";
}

function editProfile() {
    document.getElementById("name").style.display = "none";
    document.getElementById("editbio").style.display = "none";
    document.getElementById("editedu").style.display = "none";
    //document.getElementById("editwork").style.display = "none";
    document.getElementById("editpro").style.display = "none";
    document.getElementById("pname").style.display = "block";
    document.getElementById("savepic").style.display = "block";
    document.getElementById("propic").style.display = "block";
}

function saveBio() {
    var biotext = document.getElementById("addbio").value;


    firebase.auth().onAuthStateChanged(function (user) {
        firebase.database().ref('Users/' + user.uid).update({
            Session: biotext
        })
        window.location = "profile.html";

    });


}
function savePic() {
    var edutext = document.getElementById("pname").value;


    if (edutext != "") {
        firebase.auth().onAuthStateChanged(function (user) {
            firebase.database().ref('Users/' + user.uid).update({
                FirstName: edutext
            })

            window.location = "profile.html";

        });
    }
    else {

        window.location = "profile.html";
    }


}
function saveEdu() {
    var edutext = document.getElementById("addedu").value;


    firebase.auth().onAuthStateChanged(function (user) {
        firebase.database().ref('Users/' + user.uid).update({
            University: edutext
        })
        window.location = "profile.html";

    });
}


firebase.auth().onAuthStateChanged(function (user) {
    currUserId = user.uid;
});
var fileButton = document.getElementById("propic");
fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    firebase.storage().ref('img/' + currUserId + name).put(file);
    var picname = nowtime.toString() + ".png";

});
var storage = firebase.storage().ref().child('img/' + currUserId + ".png");
storage.getDownloadURL().then(function (url) {
    document.getElementById('pp').src = url;
    window.alert(url);
});










// function showprofile(user_id){


// firebase.database().ref('/Posts/').orderByChild("Posting_time").on('value', function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//         var childData = childSnapshot.val();
//         var question = childData.Question_Name;
//         var tag = childData.Tags;
//         var date = childData.Post_Date;
//         var name = childData.User_Name;
//         var description = childData.Description;
//         var currPostId = childData.Post_Id;
//         //var normal_id=txt_comment+currPostId;
//         //var posterid=question;
//         var count_like = childData.like_count;
//         var count_dislike = childData.dislike_count;
//         if(user_id==childData.UserID){
//         document.getElementById("pro_id").innerHTML +=

//             <div class="topdiv">
//                 <a href="index.html"><img src="image/back.png" class="back" alt="Back" title="Back To Home"></a>
//                     <h3 class="back">Back To Home</h3>
//         </div>
//                 <div class=" row">
//                     <p>.</p>
//                     <div class="column1">
//                         <div class="card">
//                             <img class="profile" id="pp" src="image/pp.jpg" title="profile picture" alt="profile picture">
//                                 <input class="propicchoose" id="propic" type="file" name="pic" accept="image/*"
//                                     style="display:none">
//                                     <h3 align="center" id="name"></h3>
//                                     <textarea class="biotextarea" placeholder="Your Name" id="pname" style="display:none"></textarea>
//                                     <button id="savepic" style="display:none" onclick="savePic()">Save</button>

//                                     <u class="probio" style="cursor:pointer" id="editpro" onclick="editProfile()">Edit</u>
//                 </div>
//                                 <div class="card">
//                                     <div class="probio">
//                                         <p><b>Session: </b></p>
//                                         <p id="bio" class="biop"></p>

//                                         <u style="cursor:pointer" onclick="editbio()" id="editbio">Edit</u>
//                                         <textarea class="biotextarea" placeholder="Add your bio" id="addbio"
//                                             style="display:none"></textarea>
//                                         <br>
//                                             <button id="savebio" style="display:none" onclick="saveBio()">Save</button>
//                     </div>
//                                     </div>
//                                     <div class="card">
//                                         <p><b>Email: </b></p>
//                                         <p id="email" class="probio"></p>
//                                         <hr>
//                                             <P><b>Education:</b></P>
//                                             <p id="edu" class="probio"></p>
//                                             <u style="cursor:pointer" onclick="editedu()" class="probio" id="editedu">Edit</u>
//                                             <textarea class="biotextarea" placeholder="Add Education" id="addedu"
//                                                 style="display:none"></textarea>
//                                             <br>
//                                                 <button id="saveedu" style="display:none" onclick="saveEdu()">Save</button>
//                                                 <hr>
//                 </div>


//             </div>


//         </div>
//         }
//                                         });
// });

// }