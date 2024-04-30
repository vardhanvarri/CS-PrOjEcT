var students = [];
var MainStudents = [];
var currentPage = 0; 
var studentsPerPage = 1;
fetch('js/profiles page/students.json')
    .then(response => response.json())
    .then(data => {
        students = data;
        MainStudents = data;
        displayPage(students);
    });

      // Event listeners for dropdown changes
  document.getElementById("gender").addEventListener("change", function() {
    const genderFilter = this.value;
    const ratingSort = document.getElementById("rating").value;
   
    showProfiles(students,genderFilter, ratingSort);
  });
  
  document.getElementById("rating").addEventListener("change", function() {
    const ratingSort = this.value;
    const genderFilter = document.getElementById("gender").value;
    showProfiles(students,genderFilter, ratingSort);
  });
  
    /**
 * Displays the current page of students on the profiles page.
 */
function displayPage(profiles) {
    
    var studentsToDisplay = profiles; // The students to display on the current page

    var profilesDiv = document.querySelector('.card-list');
    profilesDiv.innerHTML = ''; // Clear the profiles div

    for (var i = 0; i < studentsToDisplay.length; i++) {
        var student = studentsToDisplay[i];

        var profileDiv = document.createElement('li'); // new div element for the student profile
        profileDiv.innerHTML = `
            <img src="${student.Photo}" alt="Student Photo">
            <h2>${student.Name}</h2>
            <p>Age: ${student.Age}</p>
            <p>IITB Roll Number: ${student["IITB Roll Number"]}</p>
            <p>Year of Study: ${student["Year of Study"]}</p>
            <p>Gender: ${student["Gender"]}</p>
            <p>Interests: ${student["Interests"]}</p>
            <p>Hobbies: ${student["Hobbies"]}</p>
            <p>Email: ${student.Email}</p>
        `;

        profilesDiv.appendChild(profileDiv);
    }
}


// Function to filter profiles based

function genderFilterChange(profiles, genderFilter) {
    const filteredProfiles = []
    for (const profile of profiles){
       
      if ((genderFilter !== "all" && profile.Gender === genderFilter)){
        filteredProfiles.push(profile);
      }
     
    };
    return filteredProfiles;
  }
  
  // Function to render profiles based on filter options
  function ratingFilter(profiles, ratingSort) {
    console.log(ratingSort,profiles);

    if (ratingSort !== "all") {
      profiles.sort((a, b) => {
        // Convert ratings to floating-point numbers using parseFloat
        const ratingA = parseFloat(a.rating);
        const ratingB = parseFloat(b.rating);
        
        // Compare the ratings
        return ratingB - ratingA;
      });
    }
    console.log(profiles);
    return profiles;
  }
  


function showProfiles(profiles,genderFilter, ratingSort) {
    if(genderFilter === "all" && ratingSort === "all"){

        displayPage(profiles);
      
  
      }
      else if(genderFilter !== "all" && ratingSort === "all"){
        const filteredProfiles = genderFilterChange(profiles, genderFilter);
      
        displayPage(filteredProfiles);
        
  
        }
      else if(genderFilter === "all" && ratingSort !== "all"){
        const sortedProfiles = ratingFilter(profiles, ratingSort);
       console.log(sortedProfiles);
        displayPage(sortedProfiles);
        }
        else{
          const filteredProfiles = genderFilterChange(profiles, genderFilter);
          const sortedProfiles = ratingFilter(filteredProfiles, ratingSort);
         
          displayPage(sortedProfiles);
          }
  ;}
  