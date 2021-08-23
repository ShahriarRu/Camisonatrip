import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const app = firebase.initializeApp({
  // apiKey: "AIzaSyDQYVjxhERk3NHqW4LInF7Cm8Xt9WTa9tI",
  // authDomain: "image-stats.firebaseapp.com",
  // projectId: "image-stats",
  // storageBucket: "image-stats.appspot.com",
  // messagingSenderId: "139003026667",
  // appId: "1:139003026667:web:b5540363f227bf934ef2ae",

  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,

  // apiKey: "AIzaSyBnTl7a16elmI_0dwA4rVxqo-h0Vi1RGlw",
  // authDomain: "gwb-group.firebaseapp.com",
  // projectId: "gwb-group",
  // storageBucket: "gwb-group.appspot.com",
  // messagingSenderId: "166706032456",
  // appId: "1:166706032456:web:a701720d8e53017d9c4d7d",
  // measurementId: "G-RKXLYTZQYK",

  apiKey: "AIzaSyDbVrOaNuvq3bmoG_BbGz4P2s78heM9-Mo",
  authDomain: "convpho.firebaseapp.com",
  databaseURL: "https://convpho-default-rtdb.firebaseio.com",
  projectId: "convpho",
  storageBucket: "convpho.appspot.com",
  messagingSenderId: "448502438587",
  appId: "1:448502438587:web:bacf319a9407dc4926279e",
});

export const auth = app.auth();
export default app;
