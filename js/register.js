let userInfo = document.querySelector("#user-info");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logout");

let firstName = localStorage.getItem("usernameFirst");
let lastName = localStorage.getItem("usernameLast");

if (firstName && lastName) {
  links.remove();
  userInfo.style.display = "flex";
  user.innerHTML = firstName + lastName;
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
      localStorage.clear();
  
      setTimeout(() => {
        window.location = "register.html";
      }, 1500);
    });
  } else {
    console.error("The element with ID 'logout' was not found.");
  }




let usernameFirst = document.querySelector("#usernameFirst");
let usernameLast = document.querySelector("#usernameLast");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#sign_up");


function register(e){
    e.preventDefault()
    if(usernameFirst.value ==="" ||usernameLast.value==="" || email.value==="" || password.value ===""){
        alert("Please Fill Data !!")
    }else{
        localStorage.setItem("usernameFirst",usernameFirst.value)
        localStorage.setItem("usernameLast",usernameLast.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)

        setTimeout(()=>{
            window.location="login.html"
        },1500)
    }
    
}

registerBtn.addEventListener('click',register)