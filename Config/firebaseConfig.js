import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "yoyr-messaging-sender-id",
    appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export {
    firestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
};
