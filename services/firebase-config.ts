import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqZ8xK9vJ7X2nY3mW4pQ5rT6sU8vA9wB0",
    authDomain: "gossip-gazette.firebaseapp.com",
    projectId: "gossip-gazette",
    storageBucket: "gossip-gazette.appspot.com",
    messagingSenderId: "100837881191560080637",
    appId: "1:100837881191560080637:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
