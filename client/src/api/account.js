import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const createAccount = async (uid) => {

    await setDoc(doc(firestore, 'user', uid), {name: uid, group: null, role: "student"});    
}

export const getAccount = async (uid) => {

    return await getDoc(doc(firestore, 'user', uid));
};
  