import { onAuthStateChanged, auth } from './firebase-init.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("Auth Guard: No user found, redirecting to login.");
    // Redirect to the login page if the user is not authenticated.
    window.location.href = '/login.html';
  }
});
