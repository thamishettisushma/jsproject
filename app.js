// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Hfx42BbY41G17gUTh29JAn1e6EHyBQc",
  authDomain: "signup-login-a59bf.firebaseapp.com",
  projectId: "signup-login-a59bf",
  storageBucket: "signup-login-a59bf.firebasestorage.app",
  messagingSenderId: "483100543979",
  appId: "1:483100543979:web:0113d2bc1db673ab98a7ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const form = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const formTitle = document.getElementById("form-title");
const authButton = document.getElementById("auth-button");
const toggleMessage = document.getElementById("toggle-message");
const toggleLink = document.getElementById("toggle-link");

// Toggle between Login and Signup
let isSignup = true;

// Function to update the form when toggling between login and signup
function updateForm() {
  if (isSignup) {
    formTitle.textContent = "SIGN UP";
    authButton.textContent = "Sign Up";
    toggleMessage.innerHTML = `Already have an account? <a href="#" id="toggle-link">Login</a>`;
  } else {
    formTitle.textContent = "LOGIN";
    authButton.textContent = "Login";
    toggleMessage.innerHTML = `Don't have an account? <a href="#" id="toggle-link">Signup</a>`;
  }

  // Attach event listener to the toggle link
  const toggleLink = document.getElementById("toggle-link");
  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    isSignup = !isSignup; // Toggle between login and signup mode
    updateForm(); // Update form based on the new mode
  });
}

// Initialize the form state
updateForm();

// Handle Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if (isSignup) {
    // Signup user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signup successful! Please login withsame credentials");
        // window.open("addbirthdays.html", "_blank");
        console.log("User:", userCredential.user);
        form.reset();
      })
      .catch((error) => alert("Error: " + error.message));
  } else {
    // Login user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login successful!");
        window.open("addbirthdays.html", "_self");
        console.log("User:", userCredential.user);
        form.reset();
      })
      .catch((error) => alert("Error: " + error.message));
  }
});







