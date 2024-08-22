import React from "react";

const Participants = ({ participants, questions }) => {
  const sortedParticipants = participants.sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-4xl mx-auto p-3 min-[500px]:p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Leaderboard</h1>
      {participants.length === 0 ? (
        "No one Participated Yet"
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedParticipants.map((participant, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-indigo-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{participant.name}</td>
                  <td className="px-4 py-2">{participant.email}</td>
                  <td className="px-4 py-2">
                    {participant.score}/{questions.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Participants;
