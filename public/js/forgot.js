
document.getElementById('usernameForm').addEventListener('submit', function(event) {
    event.preventDefault();// Prevent the form from submitting

    var username = document.getElementById('username').value; 

    // Fetch the data from login.json which is in public folder
    fetch("login.json")
        .then(response => response.json())  // Parse the JSON data
        .then(data => { // Display the secret question if the username exists
            var user = data.find(user => user.username === username);
        
            if (!user) {
                document.getElementById('message').textContent = 'User not found.';
            } else {
                document.getElementById('secretQuestionLabel').textContent = user.secret_question;
                document.getElementById('usernameForm').style.display = 'none'; // Hide the username form and displaying the answer form(below)
                document.getElementById('answerForm').style.display = 'block';  // Display the answer form
            }
        });
});

document.getElementById('answerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var secret_answer = document.getElementById('secretAnswer').value;

    // Fetch the data from login.json 
    fetch('login.json')
        .then(response => response.json())
        .then(data => {
            var user = data.find(user => user.username === username);
            console.log(user.secret_answer);
            console.log(secret_answer);
            if (user.secret_answer !== secret_answer) {
                document.getElementById('message').textContent = 'Incorrect answer.';
            } else {
                document.getElementById('message').textContent = 'Your password is: ' + user.password;
            }
        });
});