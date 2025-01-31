document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;

    // Validate form values
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Create a user object
    const user = {
        username,
        email,
        password,
        firstName,
        lastName,
        dob
    };

    // Log the user object to the console (you can replace this with an API call)
    console.log('User signed up:', user);

    // Clear the form
    document.getElementById('signupForm').reset();
});