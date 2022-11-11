import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  query,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

export const useInit = () => {
  // const [matches, setMatches] = useState(false);

  const runInit = async (data) => {
    const profileRef = doc(db, 'profiles', data.uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      // doc.data() will be undefined in this case
      const profileCollectionRef = collection(db, 'profiles');

      await setDoc(doc(profileCollectionRef, data.uid), {
        displayName: data.name,
        email: data.email,
        title: '',
        pronoun: '',
        location: '',
        about: '',
        lastUpdated: Timestamp.fromDate(new Date()),
      });
    }
  };

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        runInit(doc.data());
      });
    });

    return () => unsub();
  }, []);

  return true;
};
