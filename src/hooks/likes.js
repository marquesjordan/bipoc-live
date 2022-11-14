import { useCallback, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

export const useLikes = () => {
  const user1 = auth.currentUser.uid;
  const [likes, setLikes] = useState({});

  const handleLike = useCallback(
    async (userId) => {
      const id = user1 > userId ? `${user1 + userId}` : `${userId + user1}`;

      const currentTimestamp = Timestamp.fromDate(new Date());

      await setDoc(doc(db, 'likes', id), {
        liked: true,
        updated: currentTimestamp,
      });
    },
    [user1],
  );

  const handleUnlike = useCallback(
    async (userId) => {
      const id = user1 > userId ? `${user1 + userId}` : `${userId + user1}`;

      const currentTimestamp = Timestamp.fromDate(new Date());

      await setDoc(doc(db, 'likes', id), {
        liked: false,
        updated: currentTimestamp,
      });
    },
    [user1],
  );

  const setLiked = async (user2) => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    getDoc(doc(db, 'users', id)).then((docSnap) => {
      let obj = likes;
      if (!docSnap.exists()) {
        obj[id] = false;
        setLikes(obj);
      } else {
        obj[id] = true;
        setLikes(obj);
      }
    });
  };

  return { handleLike, handleUnlike, setLiked, likes };
};
