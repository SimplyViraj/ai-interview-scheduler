import { useEffect, useState } from "react";
import api from "../../api/api";

export default function CandidateMeetings({ refreshKey }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [confirmed, setConfirmed] = useState([]);

  useEffect(() => {
    // pending requests (no interview yet)
    api.get("/requests/my").then(res => {
      setPendingRequests(res.data);
    });

    // interviews (proposed + confirmed)
    api.get("/interviews").then(res => {
      const interviews = res.data;
      setConfirmed(interviews.filter(i => i.status === "confirmed"));
    });
  }, [refreshKey]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        My Meetings
      </h3>

      {/* PENDING REQUESTS */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">
          Awaiting Interviewer Response
        </h4>

        {pendingRequests.length === 0 && (
          <p className="text-sm text-gray-500">None</p>
        )}

        {pendingRequests.map(r => (
          <div key={r._id} className="border p-3 rounded mb-2">
            <p className="text-sm">
              Interviewer:{" "}
              <span className="font-medium">
                {r.interviewerId.name}
              </span>
            </p>
          </div>
        ))}
      </div>

      
      {/* CONFIRMED */}
      <div>
        <h4 className="font-medium mb-2">
          Confirmed
        </h4>

        {confirmed.length === 0 && (
          <p className="text-sm text-gray-500">None</p>
        )}

        {confirmed.map(i => (
          <div key={i._id} className="border p-3 rounded mb-2">
            <p className="text-sm font-medium">
              {i.interviewerId.name}
            </p>
            <p className="text-sm text-gray-600">
              {new Date(i.confirmedSlot.start).toLocaleString()} –{" "}
              {new Date(i.confirmedSlot.end).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
