import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import User from './User';

import { doc, getDoc } from 'firebase/firestore';

const MessageUsers = ({ user1, users, selectUser, chat }) => {
  const [list, setList] = useState([]);

  const verifyMsg = async (id, user) => {
    setList([]);
    getDoc(doc(db, 'messages', id)).then((docSnap) => {
      if (docSnap.data()?.lastMsgAt) {
        setList((old) => [...old, user]);
      }
    });
  };

  useEffect(() => {
    users.forEach((user) => {
      const user2 = user.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      verifyMsg(id, user);
    });
  }, [users]);

  return (
    <div className="users_container">
      {list.map((user) => (
        <User
          key={user.uid}
          user={user}
          selectUser={selectUser}
          user1={user1}
          chat={chat}
        />
      ))}
    </div>
  );
};

export default MessageUsers;
