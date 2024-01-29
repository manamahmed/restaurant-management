import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYciZXlz0WLPVre63eUR0SU6ftrm73HIM",
  authDomain: "liefer-platz.firebaseapp.com",
  projectId: "liefer-platz",
  storageBucket: "liefer-platz.appspot.com",
  messagingSenderId: "751499177459",
  appId: "1:751499177459:web:c25b20d199a8d901e97686",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
