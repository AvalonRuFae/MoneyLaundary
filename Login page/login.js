// Add an event listener to resize the container when the window is resized
window.addEventListener('resize', resizeContainer);

// Function to resize the login container based on window size
function resizeContainer() {
    const container = document.querySelector('.login-container'); // Select the login container
    const width = window.innerWidth; // Get the window width
    const height = window.innerHeight; // Get the window height

    // Adjust the container's width and padding based on the window width
    if (width < 600) {
        container.style.width = '90%';
        container.style.padding = '10px';
    } else if (width < 1024) {
        container.style.width = '70%';
        container.style.padding = '15px';
    } else {
        container.style.width = '50%';
        container.style.padding = '20px';
    }
}

// Initial call to set the container size on page load
resizeContainer();

document.getElementById("loginn").addEventListener('submit', function(event) {
    event.preventDefault();
    //for demonstration only, wait for the database implementation!!!!!
    const username = document.getElementsByName("username").value.trim();
    const password = document.getElementsByName("password").value.trim();
    alert("Username: " + username + " Password: " + password);
    window.location = "main.html";

    
    

});

document.getElementById("signup").addEventListener("click", function(event) {
    window.location = "signup.html";

    
    event.preventDefault();

});

