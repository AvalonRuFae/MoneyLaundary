document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    console.log('Form submitted'); // Log a message to the console

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
         document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
        return;
    }

    // Create a user object
    const signUpUser = {
        username,
        email,
        password,
        firstName,
        lastName,
        dob
    };

    // Log the user object to the console (you can replace this with an API call)
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify that the request body is JSON
        },
        body: JSON.stringify(signUpUser) // Convert the user object to a JSON string
    })
    .then(response => response.json().then(data => ({status: response.status, body: data})))
    .then(result => {
        alert(result.body.message);
        if (result.status === 200) {
            document.getElementById('signupForm').reset();
        }else if (result.status === 401){
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
        }else{
            document.getElementById('signupForm').reset();
        }
        if (result.body.redirectUrl) {
            window.location.href = result.body.redirectUrl;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Sign up failed');
    });
});

