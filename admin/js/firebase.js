import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_54eEAvZaXlDtqCnpTSMyDnoZQdO6UoI",
  authDomain: "wabot-466d6.firebaseapp.com",
  databaseURL: "https://wabot-466d6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wabot-466d6",
  storageBucket: "wabot-466d6.firebasestorage.app",
  messagingSenderId: "884937780794",
  appId: "1:884937780794:web:b84a32fbb60ba8c8be4f03"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, onValue, update };
