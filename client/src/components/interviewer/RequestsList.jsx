import { useEffect, useState } from "react";
import api from "../../api/api";
import Availability from "./Availability";
import SlotPicker from "./SlotPicker";
import { User, ChevronRight } from "lucide-react";

export default function RequestsList({ onConfirmed }) {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    api.get("/requests").then(res => setRequests(res.data));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-neutral-300 tracking-wide">
        Candidate Requests
      </h3>

      {requests.length === 0 && (
        <p className="text-sm text-neutral-500">
          No pending requests
        </p>
      )}

      {requests.map(r => (
        <div
          key={r._id}
          className="
            flex items-center justify-between
            rounded-xl px-4 py-3
            bg-neutral-900/80
            border border-neutral-800
            hover:bg-neutral-800/70
            hover:border-neutral-700
            transition-colors
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-9 h-9 rounded-full
                bg-neutral-800
                flex items-center justify-center
              "
            >
              <User className="w-4 h-4 text-neutral-400" />
            </div>

            <span className="text-sm font-medium text-neutral-200">
              {r.candidateId.name}
            </span>
          </div>

          <button
            onClick={() => setSelected(r)}
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 rounded-lg
              text-xs font-medium
              bg-neutral-800 text-neutral-100
              hover:bg-neutral-700
              transition-colors
            "
          >
            Respond
            <ChevronRight className="w-3.5 h-3.5" />
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
