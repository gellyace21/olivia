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

async function logout() {
  const response = await fetch("https://oliviaserver.onrender.com/logout", {
    // Replace with your actual Flask app URL
    method: "POST",
  });

  const result = await response.json();

  if (result.status === "success") {
    // Redirect to login or home page
    window.location.href = "index.html"; // Redirect to login page after logout
  } else {
    alert("Logout failed:", result.message);
  }
}
