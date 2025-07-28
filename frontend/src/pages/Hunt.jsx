import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import HuntCurrentBossCard from '../components/HuntCurrentBossCard';
import HuntForm from '../components/HuntForm';
import HuntList from '../components/HuntList';

const Hunt = () => {
  const { user } = useAuth();
  const [selectedBosses, setSelectedBosses] = useState([]);
  const [hunts, setHunts] = useState([]);

  // New state for channel range
  const [minChannel, setMinChannel] = useState(1);
  const [maxChannel, setMaxChannel] = useState(10);

  useEffect(() => {
    const stored = localStorage.getItem('selectedBosses');
    if (stored) {
      setSelectedBosses(JSON.parse(stored));
    }

    const fetchHunts = async () => {
      if (!user || !user.token) return;
      try {
        const response = await axiosInstance.get('/api/hunts', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setHunts(response.data);
      } catch (error) {
        alert('Failed to fetch hunts.');
      }
    };
    fetchHunts();
  }, [user]);

  const handleDeleteHuntsForBoss = async (bossId) => {
    if (!user || !user.token) return;

    if (!window.confirm('Delete all hunts for this boss?')) return;

    try {
      await axiosInstance.delete(`/api/hunts?bossId=${bossId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setHunts((prev) => prev.filter((hunt) => hunt.bossId !== bossId));
    } catch (error) {
      alert('Failed to delete hunts for this boss.');
    }
  };

  const handleRemoveSelectedBoss = (bossId) => {
    const updated = selectedBosses.filter((b) => b._id !== bossId);
    setSelectedBosses(updated);
    localStorage.setItem('selectedBosses', JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Channel Range Inputs */}
      <div className="flex items-center space-x-4 mb-6">
  <div>
    <label className="block text-sm font-medium">Min Channel</label>
    <input
      type="number"
      value={minChannel}
      onChange={(e) => setMinChannel(Number(e.target.value))}
      className="border p-2 rounded w-24"
    />
  </div>

  <div>
    <label className="block text-sm font-medium">Max Channel</label>
    <input
      type="number"
      value={maxChannel}
      onChange={(e) => setMaxChannel(Number(e.target.value))}
      className="border p-2 rounded w-24"
    />
  </div>
</div>

      {selectedBosses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedBosses.map((boss) => {
            const filteredHunts = hunts.filter((hunt) => hunt.bossId === boss._id);
            return (
              <div key={boss._id} className="border p-4 rounded shadow bg-white">
                <HuntCurrentBossCard
                  boss={boss}
                  onRemoveBoss={() => handleRemoveSelectedBoss(boss._id)}
                />

                <HuntForm
                  bossId={boss._id}
                  minChannel={minChannel}
                  maxChannel={maxChannel}
                  onHuntAdded={(newHunt) => setHunts((prev) => [...prev, newHunt])}
                />

                <HuntList hunts={filteredHunts} setHunts={setHunts} />

                <div className="mt-4">
                  <button
                    onClick={() => handleDeleteHuntsForBoss(boss._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                  >
                    Delete All Hunts for {boss.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No bosses selected.</p>
      )}
    </div>
  );
};

export default Hunt;
