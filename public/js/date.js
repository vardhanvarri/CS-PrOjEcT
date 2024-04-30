// Get the form element
const form = document.querySelector('form');
var profilesDiv = document.getElementById('profiles');
const scoreArray = []; // Array to store the scores of each student profileDiv
var students = []; // Array to store the student profiles from th students.json file
profilesDiv.innerHTML = ''; // Clear the profiles div
const scoreDict = {};// Dictionary to store the score of each student profile

// Fetch the data from students.json
fetch("js/profiles page/students.json")
    .then(response => response.json())
    .then(data => {
        // Store the data in a variable
        students = data;
    }
    
);



  // Custom sorting function for(x,y,z) similar to sorted function in python with custom key
  function customSort(a, b) {
    
    // In this, we sort based on the first element of each tuple and then acc to 2nd and 3rd 
    if (a[1] === b[1]) {
        if(a[2] === b[2]){
            return b[3] - a[3];
        }
      return b[2] - a[2];
    }

    return b[1] - a[1];
  }

 
  
// Add an event listener to the form's submit event
form.addEventListener('submit', (event) => {
    

    event.preventDefault(); // Prevent the form from submitting


    // Get the input values
    // const rollNumber = document.querySelector('#roll_number').value;
    // const name = document.querySelector('#name').value;
    // const email = document.querySelector('#email').value;
    const Age = document.querySelector('#age').value;
    const gender = document.querySelector('.gender-options input[type="radio"]:checked').value;
    const interests = Array.from(document.querySelectorAll('.interests-options input[type="checkbox"]:checked')).map(input => input.value);
    const hobbies = Array.from(document.querySelectorAll('.hobbies-options input[type="checkbox"]:checked')).map(input => input.value);


// Calculate the score for each student profile

for (const profile of students) {
    let score_interests = 0;
    let score=0;
    let score_hobbies = 0;   
    if (gender != profile["Gender"] && Math.abs(Age - profile["Age"]) <= 2) {
        for (const interest of interests) {
            if (profile["Interests"].includes(interest)) {
                score_interests += 1;
            }
        }
        for (const hobby of hobbies) {
            if (profile["Hobbies"].includes(hobby)) {
                score_hobbies += 1;
            }
        }
        score = score_interests + score_hobbies;
    scoreDict[profile["IITB Roll Number"]] = [score, score_hobbies , score_interests];
    
    }
    
}

//sort the scores in descending order
for (const key in scoreDict) {
    console.log(key, scoreDict[key]);
    scoreArray.push([key, scoreDict[key][0], scoreDict[key][1], scoreDict[key][2]]);
    
}
scoreArray.sort(customSort);
console.log(scoreArray);

var roll_highestScore=0


if (scoreArray.length == 0) {
    alert("Oops!! God Wants You to be still Single.(No profiles found)");
    return;
}
else {

console.log(scoreArray[0]);
if (scoreArray[0][1] !== 0){
    highestScore = scoreArray[0][1];
    roll_highestScore= scoreArray[0][0];
    document.getElementById('profiles').style.display = 'block'; // Show the div element
    displayPage(roll_highestScore);


};
}

});
function displayPage(Roll_num) 
 {
     const profile = students.find(profile => profile["IITB Roll Number"] === Roll_num);
     
     var profileDiv = document.createElement('div'); // new div element for the student profile
     
     profileDiv.innerHTML = `
    <div style="text-align: center;">
        <img src="${profile.Photo}" alt="Student Photo" width="200" height="200" style="display: block; margin: 0 auto; border-radius: 50%;">
        <h2>${profile.Name}</h2>
        <p>Age: ${profile.Age}</p>
        <p>IITB Roll Number: ${profile["IITB Roll Number"]}</p>
        <p>Year of Study: ${profile["Year of Study"]}</p>
        <p>Gender: ${profile["Gender"]}</p>
        <p>Interests: ${profile["Interests"]}</p>
        <p>Hobbies: ${profile["Hobbies"]}</p>
        <p>Email: ${profile.Email}</p>
        <a href="mailto:${profile.Email}?subject=Your%20Subject&body=Your%20Message&cc=sender@example.com" style="display: inline-block; padding: 10px 20px; border: 2px solid #007bff; border-radius: 5px; text-decoration: none; color: #007bff; transition: border-color 0.3s ease;">Send Email</a>


    </div>
`;

        profilesDiv.appendChild(profileDiv);
    }






