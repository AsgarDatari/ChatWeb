document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("logout-button").addEventListener("click", function() {
        localStorage.removeItem("userName");
        window.location.href = "../login/login.html"; // Redirect to login page
    });
});