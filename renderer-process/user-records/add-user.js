// const dbUser = require('./controllers').user;

var addUserBtn = document.getElementById("add-user-btn");
addUserBtn.addEventListener("click", (e) => {
    addUser(e);
});

function addUser(event) {
    event.target.classList.add("is-loading");
    var name = document.getElementById("username-input").value;
    var ic = document.getElementById("ic-input").value;

    dbUser.addUser(name, ic);
    
    document.getElementById("username-input").value = "";
    document.getElementById("ic-input").value = "";
    console.log("adding user...")
    event.target.classList.remove("is-loading");
    alert("User added successfully!");
}