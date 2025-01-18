function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

window.onload = function () {
  // When the page is fully loaded, show and load the video
  var video = document.getElementById("myVideo");
  video.load(); // Load the video
};

// Verify if a user is logged in (Restrict access if false)
// async function verify_login() {
//   const response = await fetch("https://olivia-users.tiiny.io/verify.php");
//   const result = await response.json();

//   if (result.status == "success") {

//   }
//   else {
//     alert("Please log in");
//     window.location.href = "login.html";
//   }
// }
// window.onload = verify_login;

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch("https://olivia-users.tiiny.io/verify.php");
    const result = await response.json();

    if (result.status === "error") {
      alert("You must be logged in to access this site.");
      window.location.href = "login.html";
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//   fetch("https://olivia-users.tiiny.io/verify.php")
//       .then(response => response.json())
//       .then(result => {
//           if (result.status === "error") {
//               alert("You must be logged in to access this site.");
//               window.location.href = "login.html";
//           }
//       })
//       .catch(error => {
//           console.error("Error fetching or processing the response:", error);
//           alert("An error occurred while verifying your login status.");
//       });
// });


// Logout function (Deletes the temporarily stored user ID for session)
async function logout() {
  const response = await fetch("https://olivia-users.tiiny.io/logout.php");

  const result = await response.json();

  if (result.status === "success") {
    // Redirect to login or home page
    window.location.href = "index.html"; // Redirect to login page after logout
  } else {
    alert("Logout failed:", result.message);
  }
}


setTimeout(function() {
  const fname = document.getElementById('name');

  fetch('https://olivia-users.tiiny.io/get_session.php')
         .then(response => response.text())
         .then(data => {
             // Iterate over the messages and display them
            if (data) {
               console.log("Username retrieved: " + data);
               fname.innerText = data;
            }
            else {
             console.error("No user")
            }
         })
         .catch(error => console.error('Error fetching messages:', error));
}, 100);

