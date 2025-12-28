import { useEffect, useState } from "react";
import api from "../../api/api";
import { Calendar, Clock, User } from "lucide-react";

export default function CandidateMeetings({ refreshKey }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [confirmed, setConfirmed] = useState([]);

  useEffect(() => {
    api.get("/requests/my").then(res => {
      setPendingRequests(res.data);
    });

    api.get("/interviews").then(res => {
      const interviews = res.data;
      setConfirmed(interviews.filter(i => i.status === "confirmed"));
    });
  }, [refreshKey]);

  return (
    <div className="space-y-8">
      <h3 className="text-sm font-medium text-neutral-200 tracking-wide">
        My Meetings
      </h3>

      {/* PENDING REQUESTS */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-wider text-neutral-400">
          Awaiting interviewer response
        </h4>

        {pendingRequests.length === 0 && (
          <p className="text-sm text-neutral-500">None</p>
        )}

        {pendingRequests.map(r => (
          <div
            key={r._id}
            className="
              flex items-center gap-4
              rounded-xl px-4 py-3
              bg-neutral-900/80
              border border-neutral-800
            "
          >
            <div
              className="
                w-9 h-9 rounded-full
                bg-neutral-800
                flex items-center justify-center
              "
            >
              <User className="w-4 h-4 text-neutral-400" />
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-200">
                {r.interviewerId.name}
              </p>
              <p className="text-xs text-neutral-500">
                Request sent
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CONFIRMED */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-wider text-neutral-400">
          Confirmed
        </h4>

        {confirmed.length === 0 && (
          <p className="text-sm text-neutral-500">None</p>
        )}

        {confirmed.map(i => (
          <div
            key={i._id}
            className="
              rounded-xl p-4
              bg-neutral-900/80
              border border-neutral-800
              space-y-3
            "
          >
            {/* Header */}
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

              <p className="text-sm font-medium text-neutral-200">
                {i.interviewerId.name}
              </p>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(i.confirmedSlot.start).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {new Date(i.confirmedSlot.start).toLocaleTimeString()} –{" "}
                  {new Date(i.confirmedSlot.end).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
