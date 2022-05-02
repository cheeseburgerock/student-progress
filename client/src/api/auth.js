import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';
  
import { createAccount } from './account';
import { auth, firestore} from './firebase';


export const createAuth = async (email, password) => {
    const newAcc = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newAcc);
    await createAccount(newAcc.user.uid, email);  
};

export const signIn = async (email, password) => {  
      // await setPersistence(auth, browserLocalPersistence);
      const user = await signInWithEmailAndPassword(auth, email, password);
      return { answer: user.user.uid };  
  };

  export const signOutUser = async () => {
    await signOut(auth);
  };