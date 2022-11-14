import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import CompanyForm from '../components/CompanyForm';
import CompanyList from '../components/CompanyList';
import { auth, db } from '../firebase';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const company = collection(db, 'company');
    const user = auth.currentUser.uid;

    const q = query(company, where('createdBy', '==', user));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let _companies = [];
      querySnapshot.forEach((doc) => {
        let data = {};
        data = doc.data();
        data.id = doc.id;
        _companies.push(data);
      });
      setCompanies(_companies);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      {companies.length > 0 && !loading && (
        <div style={{ marginBottom: 20 }}>
          <CompanyList companies={companies} />
        </div>
      )}

      {!companies.length && !loading && <CompanyForm />}
    </div>
  );
};

export default Company;
