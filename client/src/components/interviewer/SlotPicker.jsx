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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[800px]">
        <h3 className="text-lg font-bold mb-4">
          Interview Slot Selection
        </h3>

        <div className="grid grid-cols-2 gap-6">
          {/* PROPOSED SLOTS */}
          <div>
            <h4 className="font-semibold mb-2">
              Proposed Slots
            </h4>

            {proposedSlots.length === 0 && (
              <p className="text-sm text-gray-500">
                No valid overlapping slots
              </p>
            )}

            {proposedSlots.map((s, i) => (
              <div
                key={i}
                className="border p-3 rounded mb-2 flex justify-between items-center"
              >
                <span className="text-sm">
                  {new Date(s.start).toLocaleString()} –{" "}
                  {new Date(s.end).toLocaleString()}
                </span>

                <button
                  className="bg-black text-white px-3 py-1 rounded"
                  onClick={() => confirmSlot(i)}
                >
                  Confirm
                </button>
              </div>
            ))}
          </div>

          {/* REJECTED SLOTS */}
          <div>
            <h4 className="font-semibold mb-2 text-red-600">
              Rejected Slots
            </h4>

            {rejectedSlots.length === 0 && (
              <p className="text-sm text-gray-500">
                None
              </p>
            )}

            {rejectedSlots.map((s, i) => (
              <div
                key={i}
                className="border border-red-300 bg-red-50 p-3 rounded mb-2"
              >
                <p className="text-sm text-gray-600">
                  {new Date(s.start).toLocaleString()} –{" "}
                  {new Date(s.end).toLocaleString()}
                </p>
                <p className="text-xs text-red-500 mt-1">
                  No overlap
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 underline text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

