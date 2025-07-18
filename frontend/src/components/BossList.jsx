import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const BossList = ({ bosses }) => {
  const { user } = useAuth();



  return (
    <div>
      {bosses.map((boss) => (
        <div key={boss._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{boss.name}</h2>
          <p>{boss.area}</p>
        </div>
      ))}
    </div>
  );
};

export default BossList;
