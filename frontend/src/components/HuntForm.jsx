import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const HuntForm = ({ }) => {
  const { user } = useAuth();
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [formData, setFormData] = useState({ channel: '', fullChannel: false, });

  useEffect(() => {
    const storedBoss = localStorage.getItem('selectedBoss');
    if (storedBoss) {
      setSelectedBoss(JSON.parse(storedBoss));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date().toISOString(); // You can format this if needed
    const huntData = {
      bossId: selectedBoss._id,
      channel: formData.channel,
      fullChannel: formData.fullChannel,
      time: currentTime,
    };

    try {
      const response = await axiosInstance.post('/api/hunts', huntData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // Reset form after submission
      setFormData({ channel: '', fullChannel: false });
      window.location.reload();
    } catch (error) {
      alert('Failed to save hunt.');
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, fullChannel: e.target.checked });
  };

  return (
<form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
  <div className="flex items-center space-x-4">
    <input
      type="text"
      placeholder="Channel"
      value={formData.channel}
      onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
      className="flex-1 p-2 border rounded"
    />

    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={formData.fullChannel}
        onChange={handleCheckboxChange}
      />
      <span>Full Channel</span>
    </label>

    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
      Record Hunt
    </button>
  </div>
</form>

  );
};

export default HuntForm;
