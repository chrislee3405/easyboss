import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import BossList from '../components/BossList';
import { useAuth } from '../context/AuthContext';

const Bosses = () => {
  const { user } = useAuth();
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const response = await axiosInstance.get('/api/bosses', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBosses(response.data);
      } catch (error) {
        alert('Failed to fetch bosss.');
      }
    };

    fetchBosses();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <BossList bosses={bosses} setBosses={setBosses}  />
    </div>
  );
};

export default Bosses;
