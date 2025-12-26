// script.js

const firebaseConfig = {
  apiKey: "AIzaSyCClNXKAAu4UIF5idNQgTH9Acqbx9KYLEw",
  authDomain: "secretwebsite-d62b0.firebaseapp.com",
  projectId: "secretwebsite-d62b0",
  storageBucket: "secretwebsite-d62b0.firebasestorage.app",
  messagingSenderId: "175310082364",
  appId: "1:175310082364:web:37c689c88da932eae9ce39",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);

// Function to check if we're on the login or message page
if (document.getElementById("loginForm")) {
  // Login page logic
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successful login, redirect to message.html
        window.location.href = "message.html";
      })
      .catch((error) => {
        errorMessage.textContent = "Login failed: " + error.message;
      });
  });
} else if (
  document.querySelector("h1") &&
  document.querySelector("h1").textContent === "A Message for You"
) {
  // Message page logic
  auth.onAuthStateChanged((user) => {
    if (!user) {
      // Not authenticated, redirect to login
      window.location.href = "index.html";
    }
  });

  // Logout button
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      auth.signOut().then(() => {
        window.location.href = "index.html";
      });
    });
  }
}
