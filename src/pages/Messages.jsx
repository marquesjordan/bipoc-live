import React, { useEffect, useState } from 'react';
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
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import User from '../components/User';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';
import MessageUsers from '../components/MessageUsers';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(db, 'users');

    const q = query(userRef, where('uid', 'not-in', [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let _users = [];
      querySnapshot.forEach((doc) => {
        _users.push(doc.data());
      });
      setUsers(_users);
    });

    return () => unsub();
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let qMsgs = [];
      querySnapshot.forEach((doc) => {
        qMsgs.push(doc.data());
      });
      setMsgs(qMsgs);
    });

    const docSnap = await getDoc(doc(db, 'lastMsg', id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, 'lastMsg', id), {
        unread: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`,
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    const currentTimestamp = Timestamp.fromDate(new Date());

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: currentTimestamp,
      media: url || '',
    });

    await updateDoc(doc(db, 'messages', id), {
      lastMsgAt: currentTimestamp,
    });

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: currentTimestamp,
      media: url || '',
      unread: true,
    });

    setText('');
  };

  return (
    <div className="home_container">
      <MessageUsers
        user1={user1}
        users={users}
        selectUser={selectUser}
        chat={chat}
      />
      {/* <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div> */}
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Messages;
