import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HuntCurrentBossCard from '../components/HuntCurrentBossCard';
import HuntForm from '../components/HuntForm';

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
        <HuntCurrentBossCard boss={selectedBoss} />) : (
        <p>No boss selected.</p>)}
        <HuntForm/>
      
    </div>
  );
};

export default Hunt;
