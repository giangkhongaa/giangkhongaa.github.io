function checkUser() {
    var user = document.getElementById("username").value;
    var length_user = user.length;
    if (length_user >= 8) {
        return true;
    } else {
        document.getElementById("username_error").innerHTML = "Username length min 8 letter";
        return false;
    }
}
function checkPassword() {
    var password = document.getElementById("password").value;
    var length_pass = password.length;
    if (length_pass >= 8) {
        return true;
    } else {
        document.getElementById("password_error").innerHTML = "Password length min 8 letter";
        return false;
    }
}
function checkEmail() {
    var email = document.getElementById("email").value;
    var statute = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (statute.test(email)) {
        return true;
    } else {
        document.getElementById("email_error").innerHTML = "Email wrong format";
        return false;
    }
}
function refresh() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
    document.getElementById("date-output").value = "";
    document.getElementById("username_error").innerHTML = "";
    document.getElementById("password_error").innerHTML = "";
    document.getElementById("email_error").innerHTML = "";
}
function checkEmpty() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var date = document.getElementById("date-output").value;
    var user_error = document.getElementById("username_error").innerHTML;
    var pass_error = document.getElementById("password_error").innerHTML;
    var email_error = document.getElementById("email_error").innerHTML;
    if ((user == "") || (pass == "") || (email = "") || (date = "") || (user_error != "") || (pass_error != "") || (email_error != "")) {
        return true;
    } else {
        return false;
    }
}
function submit() {
    var user = document.getElementById("username").value;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "submit.php?user=" + user, true);
    xmlhttp.send();
}
