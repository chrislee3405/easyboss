import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const HuntForm = ({ bossId, onHuntAdded, minChannel = 1, maxChannel = 10 }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ channel: '', fullChannel: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bossId) {
      alert('No boss selected.');
      return;
    }

    const currentTime = new Date().toISOString();
    const huntData = {
      bossId,
      channel: formData.channel,
      fullChannel: formData.fullChannel,
      time: currentTime,
    };

    try {
      const response = await axiosInstance.post('/api/hunts', huntData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // ✅ Notify parent with the newly created hunt
      if (onHuntAdded) onHuntAdded(response.data);

      setFormData({ channel: '', fullChannel: false });
    } catch (error) {
      alert('Failed to save hunt.');
    }
  };

  const handleChannelSelect = (channelNum) => {
    setFormData((prev) => ({ ...prev, channel: String(channelNum) }));
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

return (
<form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
  <div className="mb-4">

      {/* ✅ Flex container for checkbox and button */}
  <div className="flex items-center justify-between">
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        name="fullChannel"
        checked={formData.fullChannel}
        onChange={handleChange}
        className="w-6 h-6 accent-blue-600 cursor-pointer" // ✅ Larger checkbox
      />
      <span className="text-lg">Full</span> {/* ✅ Bigger label text */}
    </label>

    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Hunted
    </button>
  </div>
    <span className="block mb-2 font-semibold">Select Channel:</span>
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: maxChannel - minChannel + 1 }, (_, i) => {
        const channelNum = (minChannel + i).toString();
        const isSelected = formData.channel === channelNum;
        return (
          <button
            type="button"
            key={channelNum}
            onClick={() => handleChannelSelect(channelNum)}
            className={`px-4 py-2 rounded border text-center ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {channelNum}
          </button>
        );
      })}
    </div>
  </div>


</form>

  );
};

export default HuntForm;
