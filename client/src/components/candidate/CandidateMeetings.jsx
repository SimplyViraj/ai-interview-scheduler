import { useEffect, useState } from "react";
import api from "../../api/api";

export default function CandidateMeetings() {
  const [confirmed, setConfirmed] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    api.get("/interviews").then((res) => {
      const all = res.data;

      setConfirmed(all.filter(i => i.status === "confirmed"));
      setPending(all.filter(i => i.status !== "confirmed"));
    });
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">My Meetings</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Awaiting Confirmation</h4>
        {pending.length === 0 && (
          <p className="text-sm text-gray-500">No pending meetings</p>
        )}
        {pending.map(m => (
          <div key={m._id} className="border p-2 rounded mb-2">
            <p className="text-sm">
              Interviewer: {m.interviewerId?.name || "—"}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-medium mb-2">Confirmed</h4>
        {confirmed.length === 0 && (
          <p className="text-sm text-gray-500">No confirmed meetings</p>
        )}
        {confirmed.map(m => (
          <div key={m._id} className="border p-2 rounded mb-2">
            <p className="text-sm">
              {new Date(m.confirmedSlot.start).toLocaleString()} –{" "}
              {new Date(m.confirmedSlot.end).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
