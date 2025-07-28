const HuntCurrentBossCard = ({ boss, onRemoveBoss }) => {
  if (!boss) return null;

  return (
    <div className="bg-white shadow rounded p-6 relative">
      {/* ✅ Remove Boss Button positioned top-right */}
      <button
        onClick={onRemoveBoss}
        className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
      >
        Remove selected boss
      </button>

      <h2 className="text-2xl font-bold mb-2">{boss.name}</h2>
      {/* <p className="text-gray-600 mb-1">Area: {boss.area}</p>
      <p className="text-gray-600 mb-1">Level: {boss.level}</p>
      <p className="text-gray-600">ID: {boss._id}</p> */}
    </div>
  );
};

export default HuntCurrentBossCard;
