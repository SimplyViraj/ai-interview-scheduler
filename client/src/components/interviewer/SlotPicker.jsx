import api from "../../api/api";

export default function SlotPicker({
  slots,
  interviewId,
  onClose,
  onConfirmed
}) {
  const proposedSlots = slots.filter(s => s.score > 0);
  const rejectedSlots = slots.filter(s => s.score === 0);

  const confirmSlot = async (slotIndex) => {
    await api.post("/confirm", {
      interviewId,
      slotIndex
    });
    onConfirmed();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="
          w-full max-w-4xl
          rounded-2xl p-6
          bg-neutral-900/90
          border border-neutral-800
          shadow-2xl
        "
      >
        <h3 className="text-base font-semibold text-neutral-100 mb-6">
          Interview Slot Selection
        </h3>

        <div className="grid grid-cols-2 gap-6">
          {/* PROPOSED SLOTS */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-neutral-200">
              Proposed Slots
            </h4>

            {proposedSlots.length === 0 && (
              <p className="text-sm text-neutral-500">
                No valid overlapping slots
              </p>
            )}

            {proposedSlots.map((s, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-between gap-4
                  rounded-xl px-4 py-3
                  bg-neutral-950
                  border border-neutral-800
                "
              >
                <span className="text-sm text-neutral-300">
                  {new Date(s.start).toLocaleString()} –{" "}
                  {new Date(s.end).toLocaleString()}
                </span>

                <button
                  onClick={() => confirmSlot(i)}
                  className="
                    px-3 py-1.5 rounded-lg
                    text-xs font-medium
                    bg-neutral-800 text-neutral-100
                    hover:bg-neutral-700
                    transition-colors
                  "
                >
                  Confirm
                </button>
              </div>
            ))}
          </div>

          {/* REJECTED SLOTS */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-neutral-400">
              Rejected Slots
            </h4>

            {rejectedSlots.length === 0 && (
              <p className="text-sm text-neutral-500">
                None
              </p>
            )}

            {rejectedSlots.map((s, i) => (
              <div
                key={i}
                className="
                  rounded-xl px-4 py-3
                  bg-neutral-950/60
                  border border-neutral-800
                "
              >
                <p className="text-sm text-neutral-400">
                  {new Date(s.start).toLocaleString()} –{" "}
                  {new Date(s.end).toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  No overlap
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="
            mt-6 text-sm
            text-neutral-400
            hover:text-neutral-200
            transition-colors
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
