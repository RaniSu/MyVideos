import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; 
import 'firebase/compat/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyDjQWmykFd4mCQYJEc4GVek4wX9YtOBWSs",
  authDomain: "myvideos-63d5e.firebaseapp.com",
  projectId: "myvideos-63d5e",
  storageBucket: "myvideos-63d5e.appspot.com",
  messagingSenderId: "155894143488",
  appId: "1:155894143488:web:52b50c3d21cf6c524156e5"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };