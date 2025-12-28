import { useEffect, useState } from "react";
import api from "../../api/api";
import Availability from "./Availability";
import SlotPicker from "./SlotPicker";

export default function RequestsList({ onConfirmed }) {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    api.get("/requests").then(res => setRequests(res.data));
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Candidate Requests</h3>

      {requests.map(r => (
        <div key={r._id} className="border p-3 rounded mb-2 flex justify-between">
          <span>{r.candidateId.name}</span>
          <button
            className="bg-black text-white px-3 py-1 rounded"
            onClick={() => setSelected(r)}
          >
            Respond
          </button>
        </div>
      ))}

      {/* STEP 1 — interviewer availability */}
      {selected && !matchData && (
        <Availability
          request={selected}
          onNext={(data) => setMatchData(data)}
          onClose={() => setSelected(null)}
        />
      )}

      {/* STEP 2 — slot picker */}
      {matchData && (
        <SlotPicker
          slots={matchData.proposedSlots}
          interviewId={matchData.interviewId}
          onClose={() => {
            setSelected(null);
            setMatchData(null);
          }}
          onConfirmed={onConfirmed}
        />
      )}
    </div>
  );
}
