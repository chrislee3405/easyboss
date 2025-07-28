// HuntCard.jsx
import React from 'react';

const HuntCard = ({ hunt, bosses, resetHuntTime, onDeleteHunt }) => {
  const getBossRespawnMin = (bossId) => {
    const boss = bosses.find((b) => b._id === bossId);
    return boss ? boss.respawnMin : '0';
  };

  const getBossRespawnMax = (bossId) => {
    const boss = bosses.find((b) => b._id === bossId);
    return boss ? boss.respawnMax : '0';
  };

  const getMinRespawnTime = (hunt) => {
    const respawnMin = parseInt(getBossRespawnMin(hunt.bossId), 10);
    const baseTime = new Date(hunt.time);
    const result = new Date(baseTime.getTime() + respawnMin * 60000);

    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const datePart = result.toLocaleDateString(locale, {
      month: 'short',
      day: '2-digit',
      timeZone,
    });

    const timePart = result.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    });

    return (
      <>
        {datePart}, <strong>{timePart}</strong>{' '}
        {/* <span className="text-sm text-gray-600">{timeZone}</span> */}
      </>
    );
  };

  const baseTime = new Date(hunt.time);
  const respawnMin = parseInt(getBossRespawnMin(hunt.bossId), 10);
  const respawnMax = parseInt(getBossRespawnMax(hunt.bossId), 10);
  const minTime = new Date(baseTime.getTime() + respawnMin * 60000);
  const maxTime = new Date(baseTime.getTime() + respawnMax * 60000);
  const now = new Date();

  const minTimeAdjusted = new Date(minTime.getTime() - 60000); // 1 min before minTime
  const isDisabled = now < minTimeAdjusted;

  let bgColor = 'bg-gray-100';
  if (now >= minTimeAdjusted && now <= maxTime) {
    bgColor = 'bg-green-100';
  } else if (now > maxTime) {
    bgColor = 'bg-red-100';
  }

  return (
<div className="flex items-center justify-between gap-4">
  {/* Channel */}
  <h2 className="font-bold text-2xl w-16 text-center">{hunt.channel}</h2>

  {/* Respawn Time */}
  <p className="whitespace-nowrap flex-1 text-center">{getMinRespawnTime(hunt)}</p>

  {/* Action Buttons */}
  <div className="flex gap-2">
    {now > maxTime ? (
      <button
        onClick={() => resetHuntTime(hunt)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Gone
      </button>
    ) : (
      <button
        onClick={() => resetHuntTime(hunt)}
        disabled={isDisabled}
        className={`px-4 py-2 rounded text-white ${
          isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        Hunt
      </button>
    )}

    {/* Delete Button */}
    <button
      onClick={() => onDeleteHunt(hunt._id)}
      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</div>

  );
};

export default HuntCard;
