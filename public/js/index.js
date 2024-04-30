// this code is for the animation effect of login and signup

const loginsec=document.querySelector('.login-section')
const loginlink=document.querySelector('.login-link')
const registerlink=document.querySelector('.register-link')
registerlink.addEventListener('click',()=>{
    loginsec.classList.add('active') 
})
loginlink.addEventListener('click',()=>{
    loginsec.classList.remove('active')
})

//code for fectching details of user and redirection to dating.html
//no need to use this code as we are using ejs for login and signup
// function login() {
//     // Get the username and password entered by the user
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     if (username === "" || password === "") {
//         // Display an error message if the username or password is empty
//         alert("Please enter a username and password!");
//         return;
//     }
//     // Read the JSON file containing usernames and passwords
//     fetch('login.json')
//         .then(response => response.json())
//         .then(data => {
//             // Check if the entered username exists in the JSON data
//             let userExists = false;
//             for (const userObj of data) {
//                 if (userObj.username === username) {
//                     userExists = true;
                    
//                     // If the username exists, check if the entered password matches
//                     if (userObj.password === password) {
//                         // Redirect to another page ("dating.html")
//                         console.log("Login successful!");
//                         window.location.href = "../../views/dating page/dating.ejs";
//                     } else {
//                         // Display an error message for incorrect password
//                         alert("Incorrect password!");
//                     }
//                     break; // No need to continue checking other users
//                 }
//             }
//             if (!userExists) {
//                 // If username does not exist, display error message
//                 alert("Username not found!");
//             }
//         })
//         .catch(error => console.error('Error:', error));
// }
