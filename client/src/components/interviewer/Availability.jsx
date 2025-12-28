import { useState } from "react";
import api from "../../api/api";

export default function Availability({ request, onNext, onClose }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    try {
      await api.post("/requests/interviewer-availability", {
        requestId: request._id,
        rawText: text,
      });

      const res = await api.post("/requests/match-slots", {
        requestId: request._id,
      });

      onNext(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900/90 p-6 shadow-2xl border border-white/5">
        
        <div className="mb-4">
          <h3 className="text-base font-semibold text-neutral-100">
            Share your availability
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Describe the times you’re available for an interview
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Tomorrow between 2:00 PM and 5:00 PM"
          className="
            w-full min-h-[100px] resize-none rounded-xl
            bg-neutral-950 border border-neutral-800
            px-4 py-3 text-sm text-neutral-100
            placeholder:text-neutral-500
            focus:outline-none focus:ring-1 focus:ring-neutral-700
          "
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              text-neutral-400 hover:text-neutral-200
              hover:bg-white/5 transition-colors
            "
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              bg-neutral-800 text-neutral-100
              hover:bg-neutral-700
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            {loading ? "Processing…" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
