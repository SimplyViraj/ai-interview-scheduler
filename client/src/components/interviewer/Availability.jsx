import { useState } from "react";
import api from "../../api/api";
export default function Availability({ request, onNext, onClose }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    await api.post("/requests/interviewer-availability", {
      requestId: request._id,
      rawText: text
    });

    const res = await api.post("/requests/match-slots", {
      requestId: request._id
    });

    onNext(res.data); // { interviewId, proposedSlots }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="font-bold mb-2">Your Availability</h3>

        <textarea
          className="w-full text-black border p-2 rounded"
          placeholder="e.g. Tomorrow 2pm to 5pm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            disabled={loading}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
