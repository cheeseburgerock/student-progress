import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const createAccount = async (uid, email) => {

    await setDoc(doc(firestore, 'user', uid), {name: email, group: null, role: "student"});    
}

export const getAccount = async (uid) => {

    return await getDoc(doc(firestore, 'user', uid));
};
  