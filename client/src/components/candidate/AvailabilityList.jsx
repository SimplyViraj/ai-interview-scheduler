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
    <div
      className="
        mt-6 rounded-xl p-5
        bg-neutral-900/80
        border border-neutral-800
        shadow-sm
      "
    >
      <h4 className="text-sm font-medium text-neutral-100 mb-3">
        Availability for{" "}
        <span className="text-neutral-300">{interviewer.name}</span>
      </h4>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Tomorrow 10am–1pm IST"
        className="
          w-full min-h-[90px] resize-none
          rounded-lg
          bg-neutral-950
          border border-neutral-800
          px-4 py-3
          text-sm text-neutral-100
          placeholder:text-neutral-500
          focus:outline-none
          focus:ring-1 focus:ring-neutral-700
        "
      />

      <button
        onClick={submit}
        disabled={loading}
        className="
          mt-4 inline-flex items-center justify-center
          rounded-lg px-4 py-2
          text-sm font-medium
          bg-neutral-800 text-neutral-100
          hover:bg-neutral-700
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
      >
        {loading ? "Sending…" : "Send Request"}
      </button>
    </div>
  );
}
