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

// Handle form submission and redirect to the dashboard view
function handleLogin(event) {
    event.preventDefault(); 
    window.location.href = "student-dashboard.html";
}