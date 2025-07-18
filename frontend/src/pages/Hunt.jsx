import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hunt = () => {
  const { user } = useAuth();
  const [selectedBoss, setSelectedBoss] = useState(null);

    useEffect(() => {
    const storedBoss = localStorage.getItem('selectedBoss');
    if (storedBoss) {
      setSelectedBoss(JSON.parse(storedBoss));
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      {selectedBoss ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Selected Boss: {selectedBoss.name}</h2>
          <p>Area: {selectedBoss.area}</p>
          <p>Level: {selectedBoss.level}</p>
          <p>ID: {selectedBoss._id}</p>
        </div>
      ) : (
        <p>No boss selected.</p>
      )}
    </div>
  );
};

export default Hunt;
