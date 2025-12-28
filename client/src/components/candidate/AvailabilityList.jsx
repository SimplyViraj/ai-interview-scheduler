import { useState } from "react";
import api from "../../api/api";

export default function AvailabilityList({ interviewer, onDone }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      // 1. Create availability
      const availabilityRes = await api.post("/availability", {
        rawText: text
      });

      // 2. Create request
      await api.post("/requests", {
        interviewerId: interviewer._id,
        availabilityId: availabilityRes.data._id
      });

      alert("Request sent");
      setText("");
      onDone();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded mt-4">
      <h4 className="font-semibold mb-2">
        Availability for {interviewer.name}
      </h4>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="e.g. Tomorrow 10am–1pm IST"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
    </div>
  );
}
