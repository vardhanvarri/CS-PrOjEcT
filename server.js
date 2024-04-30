const express=require('express');//to create server
const fs = require('fs') //to read and write files

const app=express(); //creating server

app.use(express.urlencoded({ extended: true })) //to parse the data from the form
app.set('view-engine','ejs') //setting view engine to ejs
app.use(express.static('public')) //to use the public folder

let currentUserName = "Guest" //to store the current user name
let msg;
//                        main pages  

if (typeof msg === 'undefined') {
    msg = ''; // Set it to an empty string
}
app.get('/dating',(req,res)=>{
    console.log(currentUserName)
    res.render('dating.ejs',{user:currentUserName, msg:""});
});

app.get("/forgot-password", (req, res) => {
    res.render("forgot.ejs"); 
});


app.get("/", (req,res) =>{
    currentUserName = "Guest"
    console.log(currentUserName)
    res.render('login.ejs', {msg : ""})
})
app.get("/profile", (req, res) => {
    res.render("profiles.ejs");
});

app.get("/logout", (req,res) =>{
    currentUserName = "Guest"
    res.redirect("/")
})
//-----------------------------verifying user details and valid login ----------------------
//--------------------------login page--------------------------------
app.post('/login', (req, res) => {
    const data = fs.readFileSync('login.json');
    let usersRegistered = JSON.parse(data);
    
    // Check if the username exists
    let usernameExists = false;
    for (let i = 0; i < usersRegistered.length; i++) {
        if (usersRegistered[i].username === req.body.name) {
            
            usernameExists = true;

            
            if (usersRegistered[i].password === req.body.password) {
                currentUserName = req.body.name;
                
                res.redirect("/dating");
            } else {
                res.render('login.ejs', { msg: "Incorrect password" });
               return;
            }
            break;
        }
    }

    if (!usernameExists) {
        res.render('login.ejs', { msg: "Username not found" });
        return;
    }
});


//   ----------------------- register page---------------------


app.post('/register', (req, res) => {
    const data = fs.readFileSync('login.json');
    let usersRegistered = JSON.parse(data);
    console.log(usersRegistered);

    // Check if the username already exists
    let usernameExists = false;
    for (let i = 0; i < usersRegistered.length; i++) {
        if (usersRegistered[i].username === req.body.name) {
            usernameExists = true;
            break;
        }
    }

    if (!usernameExists) {
        const newUser = {
            "username": req.body.name,
            "password": req.body.password,
            "secret_question": req.body.secret_question,
            "secret_answer": req.body.secret_answer
        };

        usersRegistered.push(newUser);
        fs.writeFileSync('login.json', JSON.stringify(usersRegistered));

        currentUserName = req.body.name;
        res.redirect('/dating');
    } else {
        const errorMessage = "Username is already taken. Please choose another one.";
        res.render('login.ejs', { msg: errorMessage });
    }
});

app.listen(1729);