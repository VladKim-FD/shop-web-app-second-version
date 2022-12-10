
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDe2WY0c9XPlm1jBHJbIVmGLemBHERyQvE",
  authDomain: "shop-web-app-52974.firebaseapp.com",
  projectId: "shop-web-app-52974",
  storageBucket: "shop-web-app-52974.appspot.com",
  messagingSenderId: "632051450377",
  appId: "1:632051450377:web:25a0e26587c0c011e8aed8",
  measurementId: "G-Y2XLPWRSFS"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}
