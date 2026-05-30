import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ আপনার স্ক্রিনশট থেকে নেওয়া আসল কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyAZhuwjf0V0DEsF21afVN-tf_IkOCaUkds",
    authDomain: "lexa-social.firebaseapp.com",
    projectId: "lexa-social",
    storageBucket: "lexa-social.appspot.com",
    messagingSenderId: "215163026658",
    appId: "1:215163026658:web:58a30c685aa02ae6632bb",
    measurementId: "G-CY82MQG8KW"
};

const app = initializeApp(firebaseConfig);

// নিউজফিড ও চ্যাটের জন্য Firestore NoSQL Database
export const db = getFirestore(app);

// ভারী ভিডিও বা মিডিয়া ফাইল আপলোডের জন্য Cloud Storage
export const storage = getStorage(app);
