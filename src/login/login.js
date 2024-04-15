const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

let eyeicon = document.getElementById("eyeicon");
let passwordSin = document.getElementById("passwordSin");

let eyeiconSup = document.getElementById("eyeiconSup");
let passwordSup = document.getElementById("passwordSup");

eyeicon.onclick = function(){
    if(passwordSin.type == "password"){
        passwordSin.type = "text";
        eyeicon.src = "../../assets/eye-open.png"
    }
    else{
        passwordSin.type = "password";
        eyeicon.src = "../../assets/eye-close.png"  
    }
}
eyeiconSup.onclick = function(){
    if(passwordSup.type == "password"){
        passwordSup.type = "text";
        eyeiconSup.src = "../../assets/eye-open.png"
    }
    else{
        passwordSup.type = "password";
        eyeiconSup.src = "../../assets/eye-close.png"  
    }
}