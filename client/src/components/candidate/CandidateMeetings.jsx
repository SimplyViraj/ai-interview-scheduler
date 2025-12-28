import { useEffect, useState } from "react";
import api from "../../api/api";

export default function CandidateMeetings({ refreshKey }) {
  const [proposed, setProposed] = useState([]);
  const [confirmed, setConfirmed] = useState([]);

  useEffect(() => {
    api.get("/interviews").then((res) => {
      const interviews = res.data;
      setProposed(interviews.filter(i => i.status === "proposed"));
      setConfirmed(interviews.filter(i => i.status === "confirmed"));
    });
  }, [refreshKey]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">My Interviews</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Awaiting Confirmation</h4>
        {proposed.length === 0 && (
          <p className="text-sm text-gray-500">None</p>
        )}
        {proposed.map(i => (
          <div key={i._id} className="border p-2 rounded mb-2">
            <p className="text-sm">
              Interviewer: {i.interviewerId?.name}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-medium mb-2">Confirmed</h4>
        {confirmed.length === 0 && (
          <p className="text-sm text-gray-500">None</p>
        )}
        {confirmed.map(i => (
          <div key={i._id} className="border p-2 rounded mb-2">
            <p className="text-sm">
              {new Date(i.confirmedSlot.start).toLocaleString()} –{" "}
              {new Date(i.confirmedSlot.end).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
