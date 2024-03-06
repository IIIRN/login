const auth = firebase.auth();
const database = firebase.database();
// Check user authentication state on page load
auth.onAuthStateChanged((user) => {
  const userProfile = document.getElementById("userProfile");
  const userName = document.getElementById("userName");
  const userProfilePhoto = document.getElementById("userProfilePhoto");
  const userCaption = document.getElementById("userCaption");
  const userPoints = document.getElementById("userPoints");
  const logoutButton = document.getElementById("logoutButton");

  if (user) {
    // User is logged in
    userProfile.classList.remove("hidden");

    // Retrieve user data from Realtime Database
    database
      .ref("users/" + user.uid)
      .once("value")
      .then((snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          // Display user data on the page
          userName.textContent = userData.name;
          userProfilePhoto.src = userData.profilePhoto;
          userCaption.textContent = userData.caption;
          userPoints.textContent = userData.points;
        } else {
          console.log("User data not found");
        }
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });

    // Show logout button
    logoutButton.classList.remove("hidden");
  } else {
    // User is not logged in
    userProfile.classList.add("hidden");
    // Hide logout button
    logoutButton.classList.add("hidden");
  }
});

// Logout Button
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("User signed out");
    })
    .catch((error) => {
      // An error happened.
      console.error("Logout error:", error);
    });
});

// Check user authentication state on page load
auth.onAuthStateChanged((user) => {
  const userProfile = document.getElementById("userProfile");
  const loginForm = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logoutButton");

  if (user) {
    // User is logged in
    userProfile.classList.remove("hidden");
    loginForm.classList.add("hidden"); // Hide login form

    // Retrieve user data from Realtime Database
    // ... (existing code)

    // Show logout button
    logoutButton.classList.remove("hidden");
  } else {
    // User is not logged in
    userProfile.classList.add("hidden");
    loginForm.classList.remove("hidden"); // Show login form
    // Hide logout button
    logoutButton.classList.add("hidden");
  }
});

// Login Button
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => {
  const emailInput = document.getElementById("emailInput").value;
  const passwordInput = document.getElementById("passwordInput").value;

  // Perform login using Firebase Authentication
  auth
    .signInWithEmailAndPassword(emailInput, passwordInput)
    .then((userCredential) => {
      // Login successful
      console.log("User logged in:", userCredential.user);
    })
    .catch((error) => {
      // Handle login errors
      console.error("Login error:", error);
    });
});


// Fetch latest profile photos from Firebase Realtime Database
const profilePhotosContainer = document.getElementById('profilePhotos');

// Reference to the 'users' node in Firebase Realtime Database
const usersRef = database.ref('users');

// Query the latest 10 user registrations
usersRef.limitToLast(5).once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const userData = childSnapshot.val();
    const userProfilePhoto = userData.profilePhoto;

    // Create image element for profile photo
    const profilePhotoImg = document.createElement('img');
    profilePhotoImg.src = userProfilePhoto;
    profilePhotoImg.alt = 'Profile Photo';
    profilePhotoImg.classList.add('h-10', 'w-10', 'inline-block', 'ring-white', 'ring-2', 'rounded-full');

    // Append profile photo to the container
    profilePhotosContainer.appendChild(profilePhotoImg);
  });
});
