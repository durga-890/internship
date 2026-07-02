// UI Element References
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const btn = document.getElementById("btn");
const modalOverlay = document.getElementById("modalOverlay");

// Handle opening the authentication modal
function openModal(type) {
    modalOverlay.style.display = "flex";
    if (type === 'login') {
        showLogin();
    } else {
        showSignup();
    }
}

// Handle closing the authentication modal
function closeModal() {
    modalOverlay.style.display = "none";
}

// Toggle form view to display signup interface
function showSignup() {
    loginForm.style.left = "-450px";
    signupForm.style.left = "0";
    btn.style.left = "120px";
}

// Toggle form view to display login interface
function showLogin() {
    loginForm.style.left = "0";
    signupForm.style.left = "450px";
    btn.style.left = "0";
}

// Handle User Login via Backend API
async function handleLogin(event) {
    event.preventDefault(); 
    
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
        // Updated Live Render Link for Login
        const response = await fetch('https://scholarhub-backend-d61z.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save user data to browser local storage for dashboard
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.userData));
            
            alert("Login Successful!");
            window.location.href = "student-dashboard.html";
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Server connection failed. Please wait a minute and try again!");
    }
}

// Handle User Registration via Backend API
async function handleSignup(event) {
    event.preventDefault();

    const fullName = event.target[0].value;
    const email = event.target[1].value;
    const suc = event.target[2].value;
    const password = event.target[3].value;
    
    // Get selected role
    let role = 'student';
    const roleRadios = document.getElementsByName('signupRole');
    for (let r of roleRadios) {
        if (r.checked) role = r.value;
    }

    try {
        // Updated Live Render Link for Signup
        const response = await fetch('https://scholarhub-backend-d61z.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, suc, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Account created successfully! Please Log In.");
            showLogin(); // Automatically slide to login form
            event.target.reset(); // Clear the signup form fields
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Server connection failed. Please wait a minute and try again!");
    }
}
