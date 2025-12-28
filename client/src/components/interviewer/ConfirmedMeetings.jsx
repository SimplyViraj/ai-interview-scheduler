import { useEffect, useState } from "react";
import api from "../../api/api";
import { User, Calendar, Clock } from "lucide-react";

export default function ConfirmedMeetings({ refreshKey }) {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    api.get("/interviews").then(res => {
      setMeetings(res.data.filter(i => i.status === "confirmed"));
    });
  }, [refreshKey]);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-neutral-300 tracking-wide">
        Confirmed Interviews
      </h3>

      {meetings.length === 0 && (
        <p className="text-sm text-neutral-500">
          None
        </p>
      )}

      {meetings.map(m => (
        <div
          key={m._id}
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
              {m.candidateId.name}
            </p>
          </div>

          {/* Time */}
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(m.confirmedSlot.start).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {new Date(m.confirmedSlot.start).toLocaleTimeString()} –{" "}
                {new Date(m.confirmedSlot.end).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
