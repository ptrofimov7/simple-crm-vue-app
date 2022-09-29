
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";


const firebaseConfig = {
   apiKey: "AIzaSyAChewQr719ypjN-GQ2pBCfi7JRt4uUWK8",
   authDomain: "vue-crm-27d04.firebaseapp.com",
   projectId: "vue-crm-27d04",
   storageBucket: "vue-crm-27d04.appspot.com",
   messagingSenderId: "393005773573",
   appId: "1:393005773573:web:87b9dc1617d8234764fd6c",
   measurementId: "G-5TWQG0T07E"
};

export const firebase = initializeApp(firebaseConfig);
export const db = getDatabase();





