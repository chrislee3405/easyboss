import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import HuntCard from './HuntCard';

const HuntList = ({ hunts, setHunts }) => {
  const { user } = useAuth();
  const [bosses, setBosses] = useState([]);

  const expiredThresholdMs = 30 * 60000; // 30 minutes in ms

  useEffect(() => {
    const fetchBosses = async () => {
      if (!user || !user.token) return;
      try {
        const response = await axiosInstance.get('/api/bosses', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBosses(response.data);
      } catch (error) {
        alert('Failed to fetch hunts.');
      }
    };
    fetchBosses();
  }, [user]);

  const resetHuntTime = async (hunt) => {
    try {
      const updatedTime = new Date().toISOString();
      await axiosInstance.put(`/api/hunts/${hunt._id}`, { time: updatedTime }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const updatedHunts = hunts.map((h) =>
        h._id === hunt._id ? { ...h, time: updatedTime } : h
      );
      setHunts(updatedHunts);
    } catch (error) {
      alert('Failed to reset hunt time.');
    }
  };

    const handleDeleteHunt = async (huntId) => {
    if (!user || !user.token) return;

    try {
      await axiosInstance.delete(`/api/hunts/${huntId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // ✅ remove the deleted hunt from state
      setHunts((prev) => prev.filter((h) => h._id !== huntId));
    } catch (error) {
      alert('Failed to delete hunt.');
    }
  };



  const getBossRespawnMin = (bossId) => {
    const boss = bosses.find((b) => b._id === bossId);
    return boss ? boss.respawnMin : '0';
  };

  const getBossRespawnMax = (bossId) => {
    const boss = bosses.find((b) => b._id === bossId);
    return boss ? boss.respawnMax : '0';
  };


const renderHuntCard = (hunt) => (
  <HuntCard
    key={hunt._id}
    hunt={hunt}
    bosses={bosses}
    resetHuntTime={resetHuntTime}
    onDeleteHunt={handleDeleteHunt} // ✅ pass delete handler
  />
);

  

  // Helper to split hunts by active/expired and sort
  const splitAndSortHunts = (filterFn) => {
    const filtered = hunts
      .filter(filterFn)
      .sort((a, b) => {
        const getMinTime = (hunt) => {
          const respawnMin = parseInt(getBossRespawnMin(hunt.bossId), 10);
          const baseTime = new Date(hunt.time);
          return baseTime.getTime() + respawnMin * 60000;
        };
        return getMinTime(a) - getMinTime(b);
      });

    const activeHunts = filtered.filter((hunt) => {
      const baseTime = new Date(hunt.time);
      const respawnMax = parseInt(getBossRespawnMax(hunt.bossId), 10);
      const maxTime = new Date(baseTime.getTime() + respawnMax * 60000);
      return new Date() < new Date(maxTime.getTime() + expiredThresholdMs);
    });

    const expiredHunts = filtered.filter((hunt) => {
      const baseTime = new Date(hunt.time);
      const respawnMax = parseInt(getBossRespawnMax(hunt.bossId), 10);
      const maxTime = new Date(baseTime.getTime() + respawnMax * 60000);
      return new Date() >= new Date(maxTime.getTime() + expiredThresholdMs);
    });

    return { activeHunts, expiredHunts };
  };

  // Split hunts into Available and Full channels
  const { activeHunts: activeAvailable, expiredHunts: expiredAvailable } = splitAndSortHunts(h => !h.fullChannel);
  const { activeHunts: activeFull, expiredHunts: expiredFull } = splitAndSortHunts(h => h.fullChannel);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Available Channels */}
      <div>
        <h2 className="text-lg font-bold mb-2">Available Channels</h2>
        {[...activeAvailable, ...expiredAvailable].map(renderHuntCard)}
      </div>

      {/* Full Channels */}
      <div>
        <h2 className="text-lg font-bold mb-2">Full Channels</h2>
        {[...activeFull, ...expiredFull].map(renderHuntCard)}
      </div>
    </div>
  );
};

export default HuntList;
