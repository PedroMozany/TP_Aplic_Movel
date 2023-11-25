import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKOoGQ1JkLrKCt3r_UvqRe_X-pt7fLGZE",
  authDomain: "posts-42441.firebaseapp.com",
  projectId: "posts-42441",
  storageBucket: "posts-42441.appspot.com",
  messagingSenderId: "540902395539",
  appId: "1:540902395539:web:551a7b90756d855f714766",
  measurementId: "G-C458PSFJMY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };