document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    console.log('Form submitted'); // Log a message to the console

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

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
        password
    };

    // Log the user object to the console (you can replace this with an API call)
    try {
        const res = await fetch('signup', {
            method: 'POST', 
            body: JSON.stringify(signUpUser),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors){
            if (data.errors.username){
                alert(data.errors.username);
                document.getElementById('username').value = '';
            }
            if (data.errors.email){
                alert(data.errors.email);
                document.getElementById('email').value = '';
            }
        }
        if (data.user){
            location.assign('/main');
        }
    }
    catch (err) {
        console.log(err);
        alert('Server Error');
    }
});

