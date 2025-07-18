import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const BossList = ({ bosses }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (boss) => {
    localStorage.setItem('selectedBoss', JSON.stringify(boss));
    navigate('/hunt', { state: boss });
  };


  return (
    <div>
      {bosses.map((boss) => (
        <div key={boss._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{boss.name}</h2>
          <p>{boss.area}</p>
            <div className="mt-2">
              <button
                onClick={() => handleSelect(boss)} className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded">
                Select
              </button>
            </div>
        </div>
      ))}

      
    </div>
  );
};

export default BossList;
