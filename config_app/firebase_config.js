import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAgBbByAt6rIHdGXFLzP4ouAU6v046EjjM",
    authDomain: "orepelasnacoes-7c37a.firebaseapp.com",
    projectId: "orepelasnacoes-7c37a",
    storageBucket: "orepelasnacoes-7c37a.appspot.com",
    messagingSenderId: "1075211973772",
    appId: "1:1075211973772:web:3a142ceb5f3e4a562db7a9"
  };

  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}
