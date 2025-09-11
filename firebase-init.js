import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, getDocs, onSnapshot, query, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAl97PsR6CztrtcHWY5-fl-xZ0wQanaRuI",
    authDomain: "plus-percent.firebaseapp.com",
    projectId: "plus-percent",
    storageBucket: "plus-percent.firebasestorage.app",
    messagingSenderId: "1088354707719",
    appId: "1:1088354707719:web:7cb3f388fb59b3f48d7da2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export the necessary Firebase services and functions
export {
    auth,
    db,
    googleProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc,
    setDoc,
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    deleteDoc,
    updateDoc
};
