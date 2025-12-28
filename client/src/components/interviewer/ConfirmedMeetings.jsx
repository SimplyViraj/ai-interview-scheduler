import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ConfirmedMeetings({ refreshKey }) {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    api.get("/interviews").then(res => {
      setMeetings(res.data.filter(i => i.status === "confirmed"));
    });
  }, [refreshKey]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Confirmed Interviews</h3>

      {meetings.length === 0 && (
        <p className="text-sm text-gray-500">None</p>
      )}

      {meetings.map(m => (
        <div key={m._id} className="border p-3 rounded mb-2">
          <p className="font-medium">{m.candidateId.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(m.confirmedSlot.start).toLocaleString()} –{" "}
            {new Date(m.confirmedSlot.end).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
