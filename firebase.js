import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4vFjiAwlRR14E5wZPRifTROvyhz-AK2Y",
  authDomain: "rider-25b89.firebaseapp.com",
  projectId: "rider-25b89",
  storageBucket: "rider-25b89.appspot.com",
  messagingSenderId: "139371785173",
  appId: "1:139371785173:web:178b2ba73b21c94fd56b5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
