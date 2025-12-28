import api from "../../api/api";
export default function SlotPicker({
  slots,
  interviewId,
  onClose,
  onConfirmed
}) {
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
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-bold mb-3">Select Slot</h3>

        {slots.map((s, i) => (
          <div key={i} className="border p-3 rounded mb-2 flex justify-between">
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

        <button onClick={onClose} className="mt-3 underline text-sm">
          Close
        </button>
      </div>
    </div>
  );
}
