import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';
import{
   getFirestore,
   doc,
   getDoc,
   setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDJCGgrSMb8649uMUGyOhPKQf5tMmgiw5w",
    authDomain: "crwn-clothing-db-d70a0.firebaseapp.com",
    projectId: "crwn-clothing-db-d70a0",
    storageBucket: "crwn-clothing-db-d70a0.appspot.com",
    messagingSenderId: "784360820260",
    appId: "1:784360820260:web:5249110cf4262be8d912b1"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try {
        await setDoc(userDocRef, {
          displayName, 
          email, 
          createdAt
        });
      } catch(error){
        console.log('error creating the user', error.message);
      }
    }

     return userDocRef;

  }