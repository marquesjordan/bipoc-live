import { useState } from 'react';
import { auth, db } from '../firebase';

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';

export const useInit = () => {
  //   const user1 = auth.currentUser.uid;
  //   const [users, setUsers] = useState([]);
  //   const runMessageInit = async () => {
  //     const userRef = collection(db, 'users');
  //     const q = query(userRef, where('uid', 'not-in', [user1]));
  //     const _users = [];
  //     const unsub = onSnapshot(q, (querySnapshot) => {
  //       querySnapshot.forEach(async (_doc) => {
  //         const user2 = _doc.data().uid;
  //         const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  //         const messageRef = doc(db, 'messages', id);
  //         const messageSnap = await getDoc(messageRef);
  //         console.log(messageSnap.exists());
  //         console.log(_doc.data());
  //         if (messageSnap.exists()) {
  //           console.log('added');
  //           _users.push(_doc.data());
  //         }
  //       });
  //       setUsers(_users)
  //       return () => unsub();
  //     });
  //   };
  //   const runProfileInit = async (data) => {
  //     const profileRef = doc(db, 'profiles', data.uid);
  //     const profileSnap = await getDoc(profileRef);
  //     if (!profileSnap.exists()) {
  //       const profileCollectionRef = collection(db, 'profiles');
  //       await setDoc(doc(profileCollectionRef, data.uid), {
  //         displayName: data.name,
  //         email: data.email,
  //         title: '',
  //         pronoun: '',
  //         location: '',
  //         about: '',
  //         lastUpdated: Timestamp.fromDate(new Date()),
  //       });
  //     }
  //   };
  //   const usersRef = collection(db, 'users');
  //   const q = query(usersRef);
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       runInit(doc.data());
  //     });
  //   });
  //   return () => unsub();
  // }, []);
  //   // useEffect(() => {
  //   //   const usersRef = collection(db, 'users');
  //   //   const q = query(usersRef);
  //   //   const unsub = onSnapshot(q, (querySnapshot) => {
  //   //     querySnapshot.forEach((doc) => {
  //   //       runInit(doc.data());
  //   //     });
  //   //   });
  //   //   return () => unsub();
  //   // }, []);
  //   return true;
  // };
  // // const userRef = collection(db, 'users');
  // // const q = query(userRef, where('uid', 'not-in', [user1]));
  // // const _users = [];
  // // const unsub = onSnapshot(q, (querySnapshot) => {
  // //   querySnapshot.forEach(async (_doc) => {
  // //     const user2 = _doc.data().uid;
  // //     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  // //     const messageRef = doc(db, 'messages', id);
  // //     const messageSnap = await getDoc(messageRef);
  // //     console.log(messageSnap.exists());
  // //     console.log(_doc.data());
  // //     if (messageSnap.exists()) {
  // //       console.log('added');
  // //       _users.push(_doc.data());
  // //     }
  // //   });
  // //   return () => unsub();
  // // });
};
