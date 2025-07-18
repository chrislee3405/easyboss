import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BossList = ({ bosses }) => {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState('All');

  const handleSelect = (boss) => {
    localStorage.setItem('selectedBoss', JSON.stringify(boss));
    navigate('/hunt', { state: boss });
  };

  // Get unique area values
  const uniqueAreas = [...new Set(bosses.map(b => b.area))];

  // Filtered and sorted boss list
  const filteredBosses = (
    selectedArea === 'All'
      ? bosses
      : bosses.filter((b) => b.area === selectedArea)
  ).sort((a, b) => a.level - b.level); // Sort by level ascending

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedArea('All')}
          className={`px-4 py-1 rounded ${
            selectedArea === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        {uniqueAreas.map((area) => (
          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`px-4 py-1 rounded ${
              selectedArea === area ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Boss Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBosses.map((boss) => (
          <div
            key={boss._id}
            className="bg-gray-100 p-4 rounded shadow"
          >
            <h2 className="font-bold text-lg">{boss.name}</h2>
            <p className="text-sm text-gray-600">{boss.item}</p>
            <p className="text-sm text-gray-500">{boss.meso}</p>
            <div className="mt-3">
              <button
                onClick={() => handleSelect(boss)}
                className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BossList;
