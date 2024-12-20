document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch("https://olivia-users.tiiny.io/verify.php");
    const result = await response.json();

    if (result.status === "error") {
      alert("You must be logged in to access this site.");
      window.location.href = "login.html";
    }
});