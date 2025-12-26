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

  // Prevent redirect loop on login page
  auth.onAuthStateChanged((user) => {
    // Do nothing on login page - let user login or stay
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "message1.html";
      })
      .catch((error) => {
        errorMessage.textContent = "Login failed: " + error.message;
      });
  });
}

// =====================
// SCROLLYTELLING LOGIC FOR MESSAGE PAGES
// =====================
const container = document.querySelector(".container");

if (container && !loginForm) {
  // Only protect message pages (not login page)
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

  // Get all paragraphs and divs for scrollytelling effect
  const elements = container.querySelectorAll("p, div");

  function updateScrollytelling() {
    const viewportHeight = window.innerHeight;
    const centerLine = viewportHeight * 0.5;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;

      // Calculate distance from center
      const distance = Math.abs(centerLine - elementCenter);
      const maxDistance = viewportHeight * 0.5;

      // Normalize visibility (0 = far, 1 = center)
      let visibility = 1 - Math.min(distance / maxDistance, 1);

      // Apply stronger curve for more dramatic effect
      visibility = Math.pow(visibility, 1.5);

      // Set opacity and transform
      element.style.opacity = 0.3 + visibility * 0.7;
      element.style.transform = `translateY(${(1 - visibility) * 20}px)`;

      // Add 'active' class for full visibility
      if (visibility > 0.7) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }

  // Add scroll and load event listeners
  window.addEventListener("scroll", updateScrollytelling);
  window.addEventListener("load", updateScrollytelling);

  // Initial call
  updateScrollytelling();
}

// =====================
// ORIGINAL MESSAGE.HTML SCROLL FADE LOGIC
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
  // SCROLL FADE LOGIC (CENTER FOCUS)
  // =====================
  const sections = document.querySelectorAll(".fade");

  function updateScrollFade() {
    const viewportHeight = window.innerHeight;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const distance = Math.abs(viewportCenter - sectionCenter);
      const maxDistance = viewportHeight / 2;

      // Normalize (0 = center, 1 = far away)
      let visibility = 1 - distance / maxDistance;
      visibility = Math.max(0, Math.min(1, visibility));

      section.style.opacity = visibility;
      section.style.transform = `translateY(${(1 - visibility) * 40}px)`;
    });
  }

  window.addEventListener("scroll", updateScrollFade);
  window.addEventListener("load", updateScrollFade);
}
