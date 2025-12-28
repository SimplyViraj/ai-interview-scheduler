import { useEffect, useState } from "react";
import api from "../../api/api";

export default function InterviewerList({ onSelect }) {
  const [interviewers, setInterviewers] = useState([]);

  useEffect(() => {
    api.get("/users?role=interviewer").then((res) => {
      setInterviewers(res.data);
    });
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Available Interviewers</h3>

      <div className="space-y-3">
        {interviewers.map((i) => (
          <div
            key={i._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-sm text-gray-500">{i.email}</p>
            </div>

            <button
              className="px-3 py-1 bg-black text-white rounded"
              onClick={() => onSelect(i)}
            >
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
