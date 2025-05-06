import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreCard from '../StoreCard';

function StoreList() {
  const [stores, setStores] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`/api/stores?name=${searchName}&address=${searchAddress}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Example auth
        });
        setStores(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch stores');
        setLoading(false);
      }
    };

    fetchStores();
  }, [searchName, searchAddress]);

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchAddressChange = (e) => {
    setSearchAddress(e.target.value);
  };

  if (loading) return <p>Loading stores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Registered Stores</h2>
      <div>
        <input type="text" placeholder="Search by Name" value={searchName} onChange={handleSearchNameChange} />
        <input type="text" placeholder="Search by Address" value={searchAddress} onChange={handleSearchAddressChange} />
      </div>
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}

export default StoreList;
