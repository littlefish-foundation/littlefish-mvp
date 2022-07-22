
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjjVXs9my9QnltngBa642-kUmOA7-aLtc",
  authDomain: "uploader-gallery-app.firebaseapp.com",
  databaseURL: "https://uploader-gallery-app.firebaseio.com",
  projectId: "uploader-gallery-app",
  storageBucket: "uploader-gallery-app.appspot.com",
  messagingSenderId: "87472043358",
  appId: "1:87472043358:web:33776c51f542f853770bcf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };