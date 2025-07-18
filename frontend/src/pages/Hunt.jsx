import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import HuntCurrentBossCard from '../components/HuntCurrentBossCard';
import HuntForm from '../components/HuntForm';
import HuntList from '../components/HuntList';

const Hunt = () => {
  const { user } = useAuth();
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [hunts, setHunts] = useState([]);

    useEffect(() => {
    const storedBoss = localStorage.getItem('selectedBoss');
    if (storedBoss) {
      setSelectedBoss(JSON.parse(storedBoss));
    }
    const fetchHunts = async () => {
      if (!user || !user.token) return; // Wait until user is loaded

      try {
        const response = await axiosInstance.get('/api/hunts', {headers: { Authorization: `Bearer ${user.token}` },});
        setHunts(response.data);
      } catch (error) {
        alert('Failed to fetch hunts.');
      }
    };
    fetchHunts();
  }, [user]);

const handleDeleteAllHunts = async () => {
    if (!user || !user.token) return;

    if (!window.confirm('Are you sure you want to delete all your hunt records?')) {
      return;
    }

    try {
      await axiosInstance.delete('/api/hunts', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setHunts([]); // Clear local state after deletion
    } catch (error) {
      alert('Failed to delete hunts.');
    }
  };



  // Filter hunts to only those matching selectedBoss._id
  const filteredHunts = selectedBoss
    ? hunts.filter((hunt) => hunt.bossId === selectedBoss._id)
    : [];

  return (
    <div className="container mx-auto p-6">
      {selectedBoss ? (
        <HuntCurrentBossCard boss={selectedBoss} />
      ) : (
        <p>No boss selected.</p>
      )}
      <HuntForm />
      <HuntList hunts={filteredHunts} setHunts={setHunts} />

      <div className="mt-6">
        <button
          onClick={handleDeleteAllHunts}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete All Hunt Records
        </button>
      </div>
    </div>
  );
};

export default Hunt;
