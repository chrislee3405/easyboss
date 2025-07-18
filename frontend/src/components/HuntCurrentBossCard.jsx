
const HuntCurrentBossCard = ({ boss }) => {
  if (!boss) return null;

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-2">{boss.name}</h2>
      <p className="text-gray-600 mb-1">Area: {boss.area}</p>
      <p className="text-gray-600 mb-1">Level: {boss.level}</p>
      <p className="text-gray-600">ID: {boss._id}</p>
    </div>
  );
};

export default HuntCurrentBossCard;
