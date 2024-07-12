import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyA_mFpsX3aFXtDoe6Id6NuytkjK9xEBK4E",
  authDomain: "adbookify.firebaseapp.com",
  projectId: "adbookify",
  storageBucket: "adbookify.appspot.com",
  messagingSenderId: "1046855240760",
  appId: "1:1046855240760:web:312c5844197e266638eacd",
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    console.log(user);
  }, []);

  const singnupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const singinUserEmailAndPass = (email, pass) => {
    return signInWithEmailAndPassword(firebaseAuth, email, pass);
  };

  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const isLoggedIn = user ? true : false;

  const handleCreateNewListing = async (name, isbn, price, coverPic) => {
    const imageref = ref(
      storage,
      `upload/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageref, coverPic);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageUrl: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getBookById = async (id) => {
    const docref = doc(firestore, "books", id);
    const result = await getDoc(docref);
    return result;
  };

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeOrder = async (bookId, qyt) => {
    const collrctionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collrctionRef, {
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      quantity: Number(qyt),
    });
    return result;
  };

  const bookList = async () => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userId", "==", user.uid));
    const result = await getDocs(q);
    return result;
  };

  const bookOrdersList = async (bookId) => {
    const r = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(r);
    return result;
  };

  return (
    <FirebaseContext.Provider
      value={{
        singnupUserWithEmailAndPassword,
        singinUserEmailAndPass,
        signinWithGoogle,
        user,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageUrl,
        getBookById,
        placeOrder,
        bookList,
        bookOrdersList,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
