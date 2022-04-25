import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    getDoc,
    updateDoc,
  } from 'firebase/firestore';

export const addDocument = async (collectionName, documentData) => {
    await addDoc(collection(firestore, collectionName), documentData);
  };
  
  export const deleteDocument = async (uRef) => {
    await deleteDoc(uRef);
  };



