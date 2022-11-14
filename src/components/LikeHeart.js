import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { db, auth, storage } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useLikes } from '../hooks/likes';

const LikeHeart = ({ userId }) => {
  const user1 = auth.currentUser.uid;
  const { handleLike, handleUnlike } = useLikes(userId);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const id = user1 > userId ? `${user1 + userId}` : `${userId + user1}`;

    const likesRef = collection(db, 'likes');
    const q = query(likesRef);

    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setIsLiked(doc.data().liked);
        }
      });
    });

    return () => unsub();
  }, []);

  return (
    <div
      onClick={() => (isLiked ? handleUnlike(userId) : handleLike(userId))}
      style={{
        color: `${isLiked ? 'red' : 'grey'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}>
      <FavoriteIcon color={isLiked ? 'error' : 'disabled'} />{' '}
      <span style={{ marginLeft: 5 }}>Like</span>
    </div>
  );
};

export default LikeHeart;
