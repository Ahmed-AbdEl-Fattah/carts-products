let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign_in");

let getEmail = localStorage.getItem("email");
let getPass = localStorage.getItem("password");

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (email.value === "" || password.value === "") {
    alert("Please Fill Data !!");
  } else {
    if (
      getEmail &&
      getEmail.trim() === email.value.trim() &&
      getPass &&
      getPass.trim() === password.value.trim()
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      alert("The email or password is incorrect");
    }
  }
});
