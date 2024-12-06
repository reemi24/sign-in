function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("welcome-message").style.display = "none";
    clearErrorMessages();
}

function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("welcome-message").style.display = "none";
    clearErrorMessages();
}
function handleLogin() {
   var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("login-error-message"); // Error container
    clearErrorMessages();

    if (!email || !password) {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    var user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert("Login successful!");
        showWelcomeMessage(user.name);
    } else {
        errorMessage.textContent = "Incorrect email or password."; // Show error message
    }
}

function clearErrorMessages() {
    var loginError = document.getElementById("login-error-message");
    if (loginError) loginError.textContent = ""; // Clear login error
}

// Handle the signup operation
function handleSignup() {
    var name = document.getElementById("signup-name").value;
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
    var emailError = document.getElementById("signup-email-error");
    var passwordError = document.getElementById("signup-password-error");
    clearErrorMessages();

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (!validateEmail(email)) {
        emailError.textContent = "Invalid email format.";
        return;
    }

    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        return;
    }

    // Retrieve existing users from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Existing users before signup:", users); // Debugging

    // Check if the email is already registered
    if (users.some(user => user.email === email)) {
        emailError.textContent = "Email is already registered.";
        return;
    }

    // Add the new user to the list and save it back to localStorage
    users.push({ name: name, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Users after signup:", users); // Debugging

    alert("Sign up successful! You can now log in.");
    showLoginForm();
}

function handleLogout() {
    alert("Logging out...");
    showLoginForm();
}

// Show the welcome message
function showWelcomeMessage(username) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("welcome-message").style.display = "block";
    document.getElementById("username").textContent = username;
}

// Validate email format
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
