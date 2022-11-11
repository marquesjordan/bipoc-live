import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });

    if (!name || !email || !password) {
      setData({ ...data, error: 'All fields are requird.' });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        password,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      const profileRef = collection(db, 'profiles');

      await setDoc(doc(profileRef, result.user.uid), {
        displayName: name,
        email: email,
        title: '',
        pronoun: '',
        location: '',
        about: '',
        lastUpdated: Timestamp.fromDate(new Date()),
      });

      setData({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false,
      });

      navigate('/');
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <section>
      <h3>Create an account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            {loading ? 'Creating....' : 'Register'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
