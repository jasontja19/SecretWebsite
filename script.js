// =====================
// Firebase Configuration
// =====================
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

// =====================
// LOGIN PAGE LOGIC
// =====================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "message.html";
      })
      .catch((error) => {
        errorMessage.textContent = "Login failed: " + error.message;
      });
  });
}

// =====================
// MESSAGE PAGE LOGIC
// =====================
const messageTitle = document.querySelector("h1");

if (messageTitle && messageTitle.textContent === "A Message for You") {
  // Protect page (must be logged in)
  auth.onAuthStateChanged((user) => {
    if (!user) {
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

  // =====================
  // SCROLL ANIMATION LOGIC
  // =====================
  const sections = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
